#!/usr/bin/env node
/**
 * run-probe.mjs - the deterministic RUNTIME scanner for the playwright-ui-test skill.
 *
 * Drives a route in a real Chromium across three device profiles (desktop / ipad /
 * phone) and emits one signals.json of RAW SIGNALS plus a full-page screenshot per
 * profile. These are SEEDS, not findings - the agent confirms each by reading the
 * source before writing the report (mirrors ui-ux-audit/scripts/scan.sh).
 *
 * It never edits app source and never writes the report; it only observes the live
 * app and writes to the --out directory.
 *
 * Usage:
 *   node run-probe.mjs --url <full-url> --out <dir> [--profiles desktp,ipad,phone]
 *                      [--no-screenshots] [--nav-timeout 30000] [--settle 1000]
 * Example:
 *   node run-probe.mjs --url http://localhost:3000/projects \
 *        --out ../../../.claude/audit/runtime/projects
 *
 * Exit codes: 0 = ran (signals written, even if issues found); 2 = bad args;
 * 3 = could not reach the URL on any profile (dev server down?).
 */
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import path from "node:path";

// ---------- arg parsing ----------
function parseArgs(argv) {
  const a = { profiles: "desktop,ipad,phone", screenshots: true, navTimeout: 30000, settle: 1000 };
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    const next = () => argv[++i];
    if (k === "--url") a.url = next();
    else if (k === "--out") a.out = next();
    else if (k === "--profiles") a.profiles = next();
    else if (k === "--no-screenshots") a.screenshots = false;
    else if (k === "--nav-timeout") a.navTimeout = parseInt(next(), 10);
    else if (k === "--settle") a.settle = parseInt(next(), 10);
    else if (k === "--help" || k === "-h") a.help = true;
  }
  return a;
}

const args = parseArgs(process.argv);
if (args.help || !args.url || !args.out) {
  console.error("usage: node run-probe.mjs --url <url> --out <dir> [--profiles desktop,ipad,phone] [--no-screenshots]");
  process.exit(args.help ? 0 : 2);
}

// ---------- device profiles (kept in sync with reference/viewports.md) ----------
const UA_IPAD =
  "Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";
const UA_IPHONE =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

const ALL_PROFILES = {
  desktop: { label: "desktop", viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, isMobile: false, hasTouch: false, userAgent: undefined },
  ipad: { label: "ipad", viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, userAgent: UA_IPAD },
  phone: { label: "phone", viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, userAgent: UA_IPHONE },
};

const requested = args.profiles.split(",").map((s) => s.trim()).filter(Boolean);
const profiles = requested.map((p) => ALL_PROFILES[p]).filter(Boolean);
if (!profiles.length) {
  console.error(`no valid profiles in "${args.profiles}" (valid: desktop, ipad, phone)`);
  process.exit(2);
}

const baseURL = (() => {
  try {
    const u = new URL(args.url);
    return `${u.protocol}//${u.host}`;
  } catch {
    return "";
  }
})();

fs.mkdirSync(args.out, { recursive: true });

// ---------- in-page probe (runs in the browser; pure DOM, no Node) ----------
// Returns overflow / overlaps / touch targets / broken images / structure / web-vitals.
function inPageProbe() {
  const vw = window.innerWidth;
  const cssPath = (el) => {
    if (el.id) return "#" + (window.CSS && CSS.escape ? CSS.escape(el.id) : el.id);
    const parts = [];
    let n = el,
      depth = 0;
    while (n && n.nodeType === 1 && depth < 4 && n.tagName !== "BODY" && n.tagName !== "HTML") {
      let part = n.tagName.toLowerCase();
      const cn = typeof n.className === "string" ? n.className.trim() : "";
      const cls = cn.split(/\s+/).filter(Boolean).slice(0, 2);
      if (cls.length) part += "." + cls.map((c) => (window.CSS && CSS.escape ? CSS.escape(c) : c)).join(".");
      const parent = n.parentElement;
      if (parent) {
        const sibs = [...parent.children].filter((c) => c.tagName === n.tagName);
        if (sibs.length > 1) part += `:nth-of-type(${sibs.indexOf(n) + 1})`;
      }
      parts.unshift(part);
      n = n.parentElement;
      depth++;
    }
    return parts.join(" > ");
  };
  const visible = (el, s) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && s.display !== "none" && s.visibility !== "hidden" && s.opacity !== "0";
  };
  const txt = (el) => (el.textContent || el.getAttribute("aria-label") || el.getAttribute("title") || "").trim().replace(/\s+/g, " ").slice(0, 60);

  // --- horizontal overflow: elements that push past the right viewport edge or
  //     scroll internally on the x-axis (the usual mobile "tiny horizontal scroll" bug). ---
  const overflow = [];
  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    if (!visible(el, s)) continue;
    const r = el.getBoundingClientRect();
    const past = Math.round(r.right - vw);
    const selfOverflow = Math.round(el.scrollWidth - el.clientWidth);
    // ignore elements explicitly allowed to scroll on x
    const scrolls = s.overflowX === "auto" || s.overflowX === "scroll";
    if (past > 1 || (selfOverflow > 1 && !scrolls)) {
      overflow.push({
        selector: cssPath(el),
        tag: el.tagName.toLowerCase(),
        pastViewportPx: past > 1 ? past : 0,
        selfOverflowPx: selfOverflow > 1 && !scrolls ? selfOverflow : 0,
        rectX: Math.round(r.x),
        rectWidth: Math.round(r.width),
        position: s.position,
        text: txt(el),
      });
    }
  }
  overflow.sort((a, b) => b.pastViewportPx + b.selfOverflowPx - (a.pastViewportPx + a.selfOverflowPx));

  // --- broken images ---
  const brokenImages = [];
  for (const img of document.querySelectorAll("img")) {
    const src = img.currentSrc || img.getAttribute("src") || "";
    if (img.complete && img.naturalWidth === 0 && src) {
      brokenImages.push({ selector: cssPath(img), src, alt: img.getAttribute("alt") });
    }
  }

  // --- touch / pointer targets below 44x44 (best practice) and 24x24 (WCAG 2.5.8 AA) ---
  const INTERACTIVE =
    'a[href], button, input:not([type="hidden"]), select, textarea, summary, [role="button"], [role="link"], [role="menuitem"], [role="tab"], [role="checkbox"], [role="switch"], [tabindex]:not([tabindex="-1"])';
  const touchTargets = [];
  for (const el of document.querySelectorAll(INTERACTIVE)) {
    const s = getComputedStyle(el);
    if (!visible(el, s) || s.pointerEvents === "none") continue;
    const r = el.getBoundingClientRect();
    const w = Math.round(r.width);
    const h = Math.round(r.height);
    const min = Math.min(w, h);
    if (min >= 44) continue;
    // WCAG inline exception: a link wrapped in flowing text is exempt from 2.5.8
    const inlineLink =
      el.tagName === "A" && /inline/.test(s.display) && !!el.closest("p, li, span, td, dd, dt");
    touchTargets.push({
      selector: cssPath(el),
      tag: el.tagName.toLowerCase(),
      w,
      h,
      belowAA: min < 24,
      inlineLinkException: inlineLink,
      text: txt(el),
    });
  }

  // --- overlapping interactive controls (conservative; >25% of the smaller box) ---
  const overlaps = [];
  const ctrls = [...document.querySelectorAll('a[href], button, input:not([type="hidden"]), select, textarea, [role="button"]')].filter(
    (el) => visible(el, getComputedStyle(el))
  );
  for (let i = 0; i < ctrls.length; i++) {
    for (let j = i + 1; j < ctrls.length; j++) {
      const a = ctrls[i],
        b = ctrls[j];
      if (a.contains(b) || b.contains(a)) continue;
      const ra = a.getBoundingClientRect(),
        rb = b.getBoundingClientRect();
      const ix = Math.max(0, Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left));
      const iy = Math.max(0, Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top));
      const area = ix * iy;
      if (area <= 4) continue;
      const minArea = Math.min(ra.width * ra.height, rb.width * rb.height);
      if (area > 0.25 * minArea) {
        overlaps.push({ a: cssPath(a), b: cssPath(b), overlapPx: Math.round(area), aText: txt(a), bText: txt(b) });
      }
    }
  }

  // --- structural snapshot (cheap signals; most a11y is covered by axe) ---
  const docScrollW = document.documentElement.scrollWidth;
  const structure = {
    title: document.title || null,
    lang: document.documentElement.getAttribute("lang"),
    h1Count: document.querySelectorAll("h1").length,
    hasMainLandmark: !!document.querySelector("main, [role='main']"),
    hasViewportMeta: !!document.querySelector("meta[name='viewport']"),
    docScrollWidth: docScrollW,
    viewportWidth: vw,
    pageHorizontalScroll: docScrollW > vw + 1,
  };

  // --- web vitals accumulated by the init-script observers ---
  const wv = Object.assign({ lcp: 0, cls: 0, inp: 0, fcp: 0, ttfb: 0 }, window.__wv || {});
  try {
    const nav = performance.getEntriesByType("navigation")[0];
    if (nav) wv.ttfb = Math.round(nav.responseStart);
  } catch {}
  for (const k of Object.keys(wv)) wv[k] = Math.round((wv[k] + Number.EPSILON) * 1000) / 1000;

  return {
    overflow: overflow.slice(0, 30),
    brokenImages,
    touchTargets: touchTargets.slice(0, 60),
    overlaps: overlaps.slice(0, 30),
    structure,
    webVitals: wv,
  };
}

// web-vitals observers, injected before any navigation so buffered entries are caught
function initWebVitals() {
  window.__wv = { lcp: 0, cls: 0, inp: 0, fcp: 0, ttfb: 0 };
  const obs = (type, cb, extra) => {
    try {
      new PerformanceObserver((list) => list.getEntries().forEach(cb)).observe(Object.assign({ type, buffered: true }, extra));
    } catch {}
  };
  obs("largest-contentful-paint", (e) => (window.__wv.lcp = e.startTime));
  obs("layout-shift", (e) => {
    if (!e.hadRecentInput) window.__wv.cls += e.value;
  });
  obs("event", (e) => {
    if (e.duration > window.__wv.inp) window.__wv.inp = e.duration;
  }, { durationThreshold: 40 });
  obs("paint", (e) => {
    if (e.name === "first-contentful-paint") window.__wv.fcp = e.startTime;
  });
}

async function autoScroll(page) {
  // trigger lazy images, IntersectionObserver reveals, react-intersection-observer, etc.
  try {
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = Math.max(200, Math.floor(window.innerHeight * 0.8));
        const timer = setInterval(() => {
          window.scrollBy(0, step);
          y += step;
          if (y >= document.body.scrollHeight - window.innerHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 120);
      });
    });
  } catch {}
}

const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

async function runProfile(browser, profile) {
  const result = {
    profile: profile.label,
    viewport: profile.viewport,
    deviceScaleFactor: profile.deviceScaleFactor,
    isMobile: profile.isMobile,
    reachable: false,
    httpStatus: null,
    console: { errors: [], warnings: [] },
    pageErrors: [],
    failedRequests: [],
    badResponses: [],
    hydration: [],
    axe: { violations: [], error: null },
    overflow: [],
    brokenImages: [],
    touchTargets: [],
    overlaps: [],
    structure: null,
    webVitals: null,
    screenshot: null,
    error: null,
  };

  const ctx = await browser.newContext({
    viewport: profile.viewport,
    deviceScaleFactor: profile.deviceScaleFactor,
    isMobile: profile.isMobile,
    hasTouch: profile.hasTouch,
    userAgent: profile.userAgent,
    ignoreHTTPSErrors: true,
  });
  await ctx.addInitScript(initWebVitals);
  const page = await ctx.newPage();

  const HYDRATION_RE = /hydrat|did not match|server[- ]rendered HTML|text content does not match|server HTML/i;

  page.on("console", (msg) => {
    const type = msg.type();
    if (type !== "error" && type !== "warning") return;
    const loc = msg.location();
    const entry = { text: msg.text(), location: loc ? `${loc.url}:${loc.lineNumber}:${loc.columnNumber}` : null };
    if (HYDRATION_RE.test(entry.text)) result.hydration.push(entry);
    if (type === "error") result.console.errors.push(entry);
    else result.console.warnings.push(entry);
  });
  page.on("pageerror", (err) => {
    result.pageErrors.push({ message: err.message, stack: (err.stack || "").split("\n").slice(0, 6).join("\n") });
    if (HYDRATION_RE.test(err.message)) result.hydration.push({ text: err.message, location: null });
  });
  page.on("requestfailed", (req) => {
    const f = req.failure();
    // navigations aborted on context close are not interesting
    result.failedRequests.push({
      url: req.url(),
      method: req.method(),
      resourceType: req.resourceType(),
      errorText: f ? f.errorText : null,
      firstParty: baseURL && req.url().startsWith(baseURL),
    });
  });
  page.on("response", (res) => {
    const status = res.status();
    if (status >= 400) {
      const req = res.request();
      result.badResponses.push({
        url: res.url(),
        status,
        resourceType: req.resourceType(),
        firstParty: baseURL && res.url().startsWith(baseURL),
      });
    }
  });

  try {
    const resp = await page.goto(args.url, { waitUntil: "domcontentloaded", timeout: args.navTimeout });
    result.reachable = true;
    result.httpStatus = resp ? resp.status() : null;
    try {
      await page.waitForLoadState("load", { timeout: 15000 });
    } catch {}
    await autoScroll(page);
    try {
      await page.waitForLoadState("networkidle", { timeout: 8000 });
    } catch {}
    await page.waitForTimeout(args.settle);

    // accessibility scan (axe injects inline -> compatible with this app's CSP)
    try {
      const axeRes = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
      result.axe.violations = axeRes.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        helpUrl: v.helpUrl,
        description: v.description,
        tags: v.tags,
        nodeCount: v.nodes.length,
        nodes: v.nodes.slice(0, 8).map((n) => ({
          target: n.target,
          html: (n.html || "").slice(0, 240),
          failureSummary: n.failureSummary,
        })),
      }));
    } catch (e) {
      result.axe.error = String(e && e.message ? e.message : e);
    }

    // DOM probes
    const probe = await page.evaluate(inPageProbe);
    result.overflow = probe.overflow;
    result.brokenImages = probe.brokenImages;
    result.touchTargets = probe.touchTargets;
    result.overlaps = probe.overlaps;
    result.structure = probe.structure;
    result.webVitals = probe.webVitals;

    if (args.screenshots) {
      const file = path.join(args.out, `${profile.label}.png`);
      await page.screenshot({ path: file, fullPage: true });
      result.screenshot = path.relative(process.cwd(), file);
    }
  } catch (e) {
    result.error = String(e && e.message ? e.message : e);
  } finally {
    await ctx.close();
  }
  return result;
}

// ---------- main ----------
const browser = await chromium.launch({ headless: true });
const profileResults = [];
try {
  for (const p of profiles) {
    process.stderr.write(`[probe] ${p.label} ${p.viewport.width}x${p.viewport.height} ...\n`);
    profileResults.push(await runProfile(browser, p));
  }
} finally {
  await browser.close();
}

const anyReachable = profileResults.some((r) => r.reachable);

const signals = {
  schema: "runtime-signals/1.0",
  note: "RAW SIGNALS (seeds), not findings. Confirm each by reading source before reporting.",
  url: args.url,
  baseURL,
  profilesRun: profiles.map((p) => p.label),
  generatedNote: "timestamp/commit are stamped by the agent, not the runner",
  profiles: profileResults,
};

const outFile = path.join(args.out, "signals.json");
fs.writeFileSync(outFile, JSON.stringify(signals, null, 2));

// ---------- human summary to stdout ----------
const sum = (n) => (n ? String(n) : "-");
console.log(`\nRuntime probe: ${args.url}`);
console.log(`signals -> ${path.relative(process.cwd(), outFile)}`);
console.log("profile  | reach | con.err | pageerr | hydr | net-fail | http>=400 | axe-viol | overflow | touch<44 | brokenImg | overlap");
console.log("---------+-------+---------+---------+------+----------+-----------+----------+----------+----------+-----------+--------");
for (const r of profileResults) {
  const cells = [
    r.profile.padEnd(8),
    (r.reachable ? "yes" : "NO").padStart(5),
    sum(r.console.errors.length).padStart(7),
    sum(r.pageErrors.length).padStart(7),
    sum(r.hydration.length).padStart(4),
    sum(r.failedRequests.length).padStart(8),
    sum(r.badResponses.length).padStart(9),
    sum(r.axe.violations.length).padStart(8),
    sum(r.overflow.length).padStart(8),
    sum(r.touchTargets.length).padStart(8),
    sum(r.brokenImages.length).padStart(9),
    sum(r.overlaps.length).padStart(7),
  ];
  console.log(cells.join(" | "));
}
if (profileResults.some((r) => r.error)) {
  console.log("\nprofile errors:");
  for (const r of profileResults) if (r.error) console.log(`  ${r.profile}: ${r.error}`);
}

if (!anyReachable) {
  console.error(`\nERROR: ${args.url} was not reachable on any profile. Is the dev server running? (npm run dev)`);
  process.exit(3);
}
process.exit(0);
