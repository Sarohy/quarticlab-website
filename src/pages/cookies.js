import Link from "next/link";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { SITE_URL } from "@component/utils/siteUrl";
import styles from "../styles/legalPage.module.css";

export default function CookiesPage() {
  return (
    <div className={styles.page}>
      <Seo
        canonical={`${SITE_URL}/cookies`}
        description="Quartic Lab cookie policy — what cookies and similar technologies we use on our website, why we use them, and how you can control them."
        title="Cookie Policy | Quartic Lab"
      />
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.heading}>Cookie Policy</h1>
        <p className={styles.updated}>Last updated: April 22, 2026</p>

        <p className={styles.intro}>
          This Cookie Policy explains what cookies and similar technologies
          Quartic Lab uses on{" "}
          <a href="https://www.quarticlab.com">quarticlab.com</a>, why we use
          them, and the choices you have. It should be read alongside our{" "}
          <Link href="/privacy">Privacy Policy</Link>.
        </p>

        <section className={styles.section}>
          <h2>1. What cookies are</h2>
          <p>
            Cookies are small text files that a website places on your browser
            or device when you visit it. They are widely used to make websites
            work or work more efficiently, as well as to provide information to
            the site owners. We also use similar technologies such as local
            storage, pixel tags, and SDKs — referred to collectively as
            &quot;cookies&quot; in this policy.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Categories of cookies we use</h2>

          <h3>Strictly necessary</h3>
          <p>
            Required for the site to function — for example, to remember your
            cookie preferences, keep form submissions secure, and load balance
            traffic. These cookies are always active.
          </p>

          <h3>Analytics</h3>
          <p>
            Help us understand how visitors use the site so we can improve
            content, layout, and performance. We use Google Analytics 4 for this
            purpose. IP addresses are truncated and we do not use analytics to
            identify individuals.
          </p>

          <h3>Functional</h3>
          <p>
            Enable extra features such as our scheduling widget and the
            third-party client-review widget. Without these, certain parts of
            the site may not work as intended.
          </p>

          <h3>Marketing</h3>
          <p>
            We do not currently run retargeting or advertising pixels. If this
            changes, we will update this policy and ask for your consent before
            such cookies are set.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Cookies set by this website</h2>
          <p>
            The specific cookies and similar technologies in use can change over
            time as we update our tooling. The main ones at the time of writing
            are:
          </p>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name / Provider</th>
                <th>Purpose</th>
                <th>Category</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>_ga, _ga_&lt;ID&gt; (Google Analytics)</td>
                <td>
                  Measures site usage, distinguishes unique visitors, and
                  aggregates session statistics.
                </td>
                <td>Analytics</td>
                <td>Up to 2 years</td>
              </tr>
              <tr>
                <td>_gid (Google Analytics)</td>
                <td>Distinguishes users for a 24-hour window.</td>
                <td>Analytics</td>
                <td>24 hours</td>
              </tr>
              <tr>
                <td>Calendly</td>
                <td>
                  Loaded when you interact with our booking link; supports the
                  scheduling widget and session integrity.
                </td>
                <td>Functional</td>
                <td>Session / up to 1 year</td>
              </tr>
              <tr>
                <td>Clutch widget (widget.clutch.co)</td>
                <td>Displays our verified Clutch reviews on the homepage.</td>
                <td>Functional</td>
                <td>Session / up to 1 year</td>
              </tr>
              <tr>
                <td>cookie-consent (Quartic Lab)</td>
                <td>Stores your cookie consent choice for this site.</td>
                <td>Strictly necessary</td>
                <td>Up to 12 months</td>
              </tr>
            </tbody>
          </table>
          <p>
            Cookies set by third-party providers are governed by their own
            privacy and cookie policies. You can review them at{" "}
            <a
              href="https://policies.google.com/technologies/cookies"
              rel="noopener"
              target="_blank"
            >
              Google
            </a>
            ,{" "}
            <a
              href="https://calendly.com/pages/cookies"
              rel="noopener"
              target="_blank"
            >
              Calendly
            </a>
            , and{" "}
            <a
              href="https://clutch.co/privacy-policy"
              rel="noopener"
              target="_blank"
            >
              Clutch
            </a>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2>4. How to manage cookies</h2>
          <p>
            When required by law, we show a consent banner on your first visit
            so you can accept or decline non-essential cookies. You can change
            your choice at any time by clearing this site&rsquo;s cookies in
            your browser and reloading the page.
          </p>
          <p>
            Most browsers also let you control cookies through their settings —
            blocking all cookies, allowing only first-party cookies, or deleting
            cookies when you close the browser. Instructions for common
            browsers:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                rel="noopener"
                target="_blank"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/kb/cookies-information-websites-store-on-your-computer"
                rel="noopener"
                target="_blank"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac"
                rel="noopener"
                target="_blank"
              >
                Apple Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                rel="noopener"
                target="_blank"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
          <p>
            Please note that blocking strictly necessary cookies may stop parts
            of the site from working correctly.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Do-not-track</h2>
          <p>
            Some browsers send a &quot;do-not-track&quot; signal. There is no
            industry standard for how sites should respond to this signal, so we
            currently do not change our behaviour based on it. You can still
            control cookies using the methods described above.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Changes to this policy</h2>
          <p>
            As our tooling and analytics evolve, the cookies we use may change.
            When we update this policy we will revise the &quot;Last
            updated&quot; date above. Material changes will also be highlighted
            on the site.
          </p>
        </section>

        <div className={styles.contactBlock}>
          <h2>Contact us</h2>
          <p>
            Questions about how we use cookies? Reach us at{" "}
            <a href="mailto:hello@quarticlab.com">hello@quarticlab.com</a> or by
            post at 6-B, Block B Phase 1 Johar Town, Lahore, Punjab 54000,
            Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
}
