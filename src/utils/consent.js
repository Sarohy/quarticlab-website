import { useEffect, useState } from "react";

export const CONSENT_STORAGE_KEY = "ql_cookie_consent_v1";
export const CONSENT_EVENT = "ql:consent-change";

// Shape stored in localStorage:
// { status: "accepted" | "rejected", analytics: bool, functional: bool, ts: ISO }
// `null` means the user has not made a choice yet.

export function readConsent() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function writeConsent(consent) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
  } catch {
    /* storage disabled — degrade silently */
  }
}

export function acceptAll() {
  writeConsent({
    analytics: true,
    functional: true,
    status: "accepted",
    ts: new Date().toISOString(),
  });
}

export function rejectAll() {
  writeConsent({
    analytics: false,
    functional: false,
    status: "rejected",
    ts: new Date().toISOString(),
  });
}

export function openPreferences() {
  if (typeof window === "undefined") {
    return;
  }
  window.dispatchEvent(new CustomEvent("ql:consent-open"));
}

export function useConsent() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    setConsent(readConsent());
    const onChange = e => setConsent(e.detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  return consent;
}

export function hasAnalyticsConsent(consent) {
  return Boolean(consent && consent.analytics);
}

export function hasFunctionalConsent(consent) {
  return Boolean(consent && consent.functional);
}
