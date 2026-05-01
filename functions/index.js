/**
 * Quartic Lab — Firebase Cloud Functions
 *
 * notifyWhatsApp
 * ──────────────
 * Triggers whenever a new document is written to the
 * `contact_submissions` Firestore collection and sends a
 * formatted WhatsApp message via the Twilio API.
 *
 * Required environment variables (set with Firebase Functions config):
 *
 *   firebase functions:secrets:set TWILIO_ACCOUNT_SID
 *   firebase functions:secrets:set TWILIO_AUTH_TOKEN
 *   firebase functions:secrets:set TWILIO_WHATSAPP_FROM   # e.g. whatsapp:+14155238886
 *   firebase functions:secrets:set NOTIFY_WHATSAPP_TO     # e.g. whatsapp:+923001234567
 *
 * Deploy:
 *   cd functions && npm install
 *   firebase deploy --only functions
 */

const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const { logger } = require("firebase-functions");
const twilio = require("twilio");

/* ── secrets (stored encrypted in Firebase / Cloud Secret Manager) ── */
const TWILIO_ACCOUNT_SID = defineSecret("TWILIO_ACCOUNT_SID");
const TWILIO_AUTH_TOKEN = defineSecret("TWILIO_AUTH_TOKEN");
const TWILIO_WHATSAPP_FROM = defineSecret("TWILIO_WHATSAPP_FROM");
const NOTIFY_WHATSAPP_TO = defineSecret("NOTIFY_WHATSAPP_TO");

/* ── helper: build a clean WhatsApp message from submission data ── */
function buildMessage(data, docId) {
  const lines = [
    "🔔 *New Contact Submission — Quartic Lab*",
    "",
    `*Name:* ${data.name || "—"}`,
    `*Email:* ${data.email || "—"}`,
    `*Phone:* ${data.phone || "—"}`,
    `*Country:* ${data.country || "—"}`,
    `*Service:* ${data.service || "—"}`,
    `*Budget:* ${data.budget || "—"}`,
    `*NDA required:* ${data.ndaRequired ? "Yes" : "No"}`,
    "",
    "*Brief:*",
    (data.description || "").slice(0, 500) || "—",
    "",
    `🗂 Doc ID: ${docId}`,
  ];

  if (data.attachmentName) {
    lines.push(`📎 Attachment: ${data.attachmentName}`);
  }

  return lines.join("\n");
}

/* ── Cloud Function ── */
exports.notifyWhatsApp = onDocumentCreated(
  {
    document: "contact_submissions/{docId}",
    secrets: [
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_WHATSAPP_FROM,
      NOTIFY_WHATSAPP_TO,
    ],
    // Run in us-central1 (cheapest / closest to Firebase default region).
    // Change to "europe-west1" if your Firestore is in EUR.
    region: "us-central1",
  },
  async event => {
    const snap = event.data;
    if (!snap) {
      logger.warn("notifyWhatsApp: no snapshot data, skipping.");
      return;
    }

    const docId = event.params.docId;
    const data = snap.data();

    const sid = TWILIO_ACCOUNT_SID.value();
    const token = TWILIO_AUTH_TOKEN.value();
    const from = TWILIO_WHATSAPP_FROM.value();
    const to = NOTIFY_WHATSAPP_TO.value();

    if (!sid || !token || !from || !to) {
      logger.error(
        "notifyWhatsApp: one or more Twilio secrets are missing. " +
          "Run: firebase functions:secrets:set TWILIO_ACCOUNT_SID (etc.)",
      );
      return;
    }

    const client = twilio(sid, token);
    const body = buildMessage(data, docId);

    try {
      const message = await client.messages.create({ body, from, to });
      logger.info(`notifyWhatsApp: sent SID ${message.sid} for doc ${docId}`);
    } catch (err) {
      // Log the error but don't throw — throwing would cause retries and
      // potentially flood WhatsApp if Firestore retries the trigger.
      logger.error(`notifyWhatsApp: Twilio error for doc ${docId}`, err);
    }
  },
);
