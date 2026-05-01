import Link from "next/link";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { SITE_URL } from "@component/utils/siteUrl";
import styles from "../styles/legalPage.module.css";

export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Seo
        canonical={`${SITE_URL}/privacy`}
        description="Quartic Lab privacy policy — what personal data we collect through our website and services, how we use it, and the rights you have over it."
        title="Privacy Policy | Quartic Lab"
      />
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.heading}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 22, 2026</p>

        <p className={styles.intro}>
          Quartic Lab (&quot;Quartic Lab,&quot; &quot;we,&quot; &quot;us,&quot;
          or &quot;our&quot;) respects your privacy. This Privacy Policy
          explains what personal information we collect when you visit{" "}
          <a href="https://www.quarticlab.com">quarticlab.com</a>, contact us,
          or engage our services, how we use that information, who we share it
          with, and the rights you have over it.
        </p>

        <section className={styles.section}>
          <h2>1. Who we are</h2>
          <p>
            Quartic Lab is a software development agency that builds web,
            mobile, and AI products for startups and enterprises. Our registered
            business address is 6-B, Block B Phase 1 Johar Town, Lahore, Punjab
            54000, Pakistan. For privacy questions you can reach us at{" "}
            <a href="mailto:contact@quarticlab.com">contact@quarticlab.com</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Information we collect</h2>
          <p>
            We collect personal information that you provide to us directly, as
            well as limited technical information collected automatically when
            you use our website.
          </p>

          <h3>Information you provide</h3>
          <ul>
            <li>
              <strong>Contact and inquiry details</strong> — name, email
              address, phone number, company name, and the message or project
              brief you share through our contact form, the Calendly booking
              flow, email, or WhatsApp.
            </li>
            <li>
              <strong>Newsletter subscription</strong> — email address you
              submit on our blog or marketing pages.
            </li>
            <li>
              <strong>Engagement information</strong> — contract, billing, and
              communication records generated while we scope, deliver, and
              support a project for you.
            </li>
          </ul>

          <h3>Information collected automatically</h3>
          <ul>
            <li>
              <strong>Usage and device data</strong> — IP address, approximate
              location (city/country derived from IP), device type, browser,
              operating system, referring URL, pages viewed, and timestamps.
            </li>
            <li>
              <strong>Cookies and similar technologies</strong> — see our{" "}
              <Link href="/cookies">Cookie Policy</Link> for full details.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>3. How we use your information</h2>
          <ul>
            <li>Respond to inquiries, schedule calls, and send proposals.</li>
            <li>
              Deliver, support, and improve the services we provide to our
              clients.
            </li>
            <li>Send service updates, invoices, and administrative notices.</li>
            <li>
              Send newsletters and marketing emails where you have opted in (you
              can unsubscribe at any time).
            </li>
            <li>
              Measure website traffic, identify usability issues, and improve
              content and performance.
            </li>
            <li>
              Prevent fraud and abuse, enforce our{" "}
              <Link href="/terms">Terms of Service</Link>, and comply with legal
              obligations.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Legal bases (EEA / UK visitors)</h2>
          <p>
            If you are in the European Economic Area or the United Kingdom, we
            rely on one or more of the following lawful bases to process your
            personal data under the GDPR and UK GDPR:
          </p>
          <ul>
            <li>
              <strong>Consent</strong> — for optional cookies, marketing emails,
              and any sensitive data you choose to share.
            </li>
            <li>
              <strong>Contract</strong> — to answer your inquiry, prepare a
              proposal, and deliver services you engage us for.
            </li>
            <li>
              <strong>Legitimate interests</strong> — to operate our website
              securely, understand how it is used, and market our services to
              businesses.
            </li>
            <li>
              <strong>Legal obligation</strong> — to meet tax, accounting, and
              other regulatory duties.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>5. Who we share your information with</h2>
          <p>
            We do not sell your personal information. We share it only with
            trusted service providers who help us run our business, and only to
            the extent necessary:
          </p>
          <ul>
            <li>
              <strong>Hosting and infrastructure</strong> — Google Cloud,
              Firebase, and our CDN provider host this website and its form
              submissions.
            </li>
            <li>
              <strong>Analytics</strong> — Google Analytics (GA4) to understand
              traffic and usage patterns.
            </li>
            <li>
              <strong>Scheduling</strong> — Calendly when you book a call
              through our site.
            </li>
            <li>
              <strong>Email and marketing</strong> — providers we use to send
              transactional and newsletter email.
            </li>
            <li>
              <strong>Professional advisors</strong> — lawyers, accountants, and
              auditors when required.
            </li>
            <li>
              <strong>Authorities</strong> — where we are legally required to
              disclose information, for example in response to a valid legal
              request.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. International data transfers</h2>
          <p>
            Quartic Lab is based in Pakistan and works with service providers
            located in the United States, the European Union, and other
            jurisdictions. When we transfer personal data across borders, we
            rely on appropriate safeguards such as Standard Contractual Clauses
            or equivalent mechanisms offered by the provider.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. How long we keep your data</h2>
          <p>
            We keep personal information only for as long as we need it for the
            purposes described in this policy:
          </p>
          <ul>
            <li>
              Inquiry and proposal data: up to 24 months from last contact.
            </li>
            <li>
              Client project records: for the duration of the engagement and up
              to 7 years afterwards to meet tax and contractual obligations.
            </li>
            <li>
              Newsletter subscriptions: until you unsubscribe, plus a short
              suppression record so we do not email you again.
            </li>
            <li>
              Website analytics: retained according to the defaults of our
              analytics provider (currently 14 months for Google Analytics).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>8. Your rights</h2>
          <p>
            Subject to your local law, you may have the right to access,
            correct, delete, restrict, object to, or receive a portable copy of
            your personal data, and to withdraw consent where processing is
            based on consent. To exercise any of these rights, email{" "}
            <a href="mailto:contact@quarticlab.com">contact@quarticlab.com</a>.
            We will respond within the timeframes required by applicable law.
          </p>
          <p>
            If you are in the EEA or UK and believe we have mishandled your
            data, you can also lodge a complaint with your local data protection
            authority.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Security</h2>
          <p>
            We use industry-standard administrative, technical, and physical
            safeguards — including encryption in transit, access controls, and
            the principle of least privilege — to protect personal data. No
            system is completely secure, but we work to reduce the risk of
            unauthorised access, loss, or misuse.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Children&rsquo;s privacy</h2>
          <p>
            Our website and services are not directed to children under 16, and
            we do not knowingly collect personal information from them. If you
            believe a child has provided us with personal data, please contact
            us and we will delete it.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. When we make
            material changes we will update the &quot;Last updated&quot; date at
            the top of this page and, where appropriate, notify you by email or
            a notice on the site.
          </p>
        </section>

        <div className={styles.contactBlock}>
          <h2>Contact us</h2>
          <p>
            Questions about this policy or how we handle your data? Reach us at{" "}
            <a href="mailto:contact@quarticlab.com">contact@quarticlab.com</a>{" "}
            or by post at 6-B, Block B Phase 1 Johar Town, Lahore, Punjab 54000,
            Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
}
