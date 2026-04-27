import Link from "next/link";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { SITE_URL } from "@component/utils/siteUrl";
import styles from "../styles/legalPage.module.css";

export default function TermsPage() {
  return (
    <div className={styles.page}>
      <Seo
        canonical={`${SITE_URL}/terms`}
        description="Quartic Lab terms of service — the rules and conditions that govern your use of our website and the professional services we provide."
        title="Terms of Service | Quartic Lab"
      />
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.heading}>Terms of Service</h1>
        <p className={styles.updated}>Last updated: April 22, 2026</p>

        <p className={styles.intro}>
          These Terms of Service (&quot;Terms&quot;) govern your access to and
          use of the Quartic Lab website at{" "}
          <a href="https://www.quarticlab.com">quarticlab.com</a> and any
          content, functionality, or marketing information we make available
          here. By using the site you agree to these Terms. If you do not agree,
          please do not use the site.
        </p>

        <section className={styles.section}>
          <h2>1. Who we are</h2>
          <p>
            &quot;Quartic Lab,&quot; &quot;we,&quot; &quot;us,&quot; and
            &quot;our&quot; refer to Quartic Lab, a software development agency
            with its registered address at 6-B, Block B Phase 1 Johar Town,
            Lahore, Punjab 54000, Pakistan.
          </p>
        </section>

        <section className={styles.section}>
          <h2>2. Scope of these Terms</h2>
          <p>
            These Terms apply to your use of our website and to any information
            you submit through it — for example, using the contact form, booking
            a call, subscribing to the blog, or corresponding with us by email.
          </p>
          <p>
            Paid engagements (custom software development, design, consulting,
            and related services) are governed by a separate written contract —
            typically a Master Services Agreement and Statement of Work — signed
            between you and Quartic Lab. Where these Terms and your signed
            contract conflict, the signed contract controls for that engagement.
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Use of the website</h2>
          <p>
            You agree to use the site only for lawful purposes. You will not:
          </p>
          <ul>
            <li>
              Attempt to gain unauthorised access to any part of the site, its
              servers, or any connected system.
            </li>
            <li>
              Upload or transmit viruses, malware, or any code designed to
              disrupt or damage the site.
            </li>
            <li>
              Scrape, harvest, or automatically extract content or personal data
              from the site without our written permission.
            </li>
            <li>
              Use the site to harass, defame, or infringe the rights of any
              person.
            </li>
            <li>
              Misrepresent your identity or submit false information through our
              forms.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Intellectual property</h2>
          <p>
            The website, including its text, graphics, logos, code, and design
            (collectively, the &quot;Content&quot;) is owned by Quartic Lab or
            its licensors and is protected by copyright, trademark, and other
            applicable laws.
          </p>
          <p>
            You may view and print individual pages for your own personal,
            non-commercial reference. You may not copy, modify, republish,
            distribute, or create derivative works from the Content without our
            prior written consent.
          </p>
          <p>
            &quot;Quartic Lab&quot; and our logo are trademarks of Quartic Lab.
            Other names and marks referenced on the site are the property of
            their respective owners and are used for identification purposes
            only.
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Submissions and feedback</h2>
          <p>
            If you send us project briefs, suggestions, ideas, or feedback
            through the site or by email, you grant Quartic Lab a non-exclusive,
            worldwide, royalty-free licence to use that submission to respond to
            your inquiry and to improve our services. We will not treat any
            submission as confidential unless we have a signed non-disclosure or
            services agreement with you that says otherwise.
          </p>
        </section>

        <section className={styles.section}>
          <h2>6. Portfolio, case studies, and testimonials</h2>
          <p>
            The project summaries, metrics, and client testimonials shown on our
            website are shared with the permission of the relevant clients or
            under the terms of our engagement contracts. Specific commercial
            terms, source code, and confidential materials of those engagements
            are not disclosed.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Third-party links and services</h2>
          <p>
            The site may link to third-party websites, widgets, or services (for
            example Calendly for scheduling and Clutch for client reviews). We
            do not control these third parties and are not responsible for their
            content, privacy practices, or availability. Your use of any
            third-party service is subject to the terms and privacy policies of
            that provider.
          </p>
        </section>

        <section className={styles.section}>
          <h2>8. No professional or project advice</h2>
          <p>
            Content on the website — including blog posts, case studies, and
            marketing pages — is provided for general information only and does
            not constitute professional, technical, legal, or financial advice
            for your specific situation. Do not act on any such information
            without engaging Quartic Lab under a signed contract or consulting a
            qualified professional.
          </p>
        </section>

        <section className={styles.section}>
          <h2>9. Disclaimers</h2>
          <p>
            To the maximum extent permitted by law, the site and its Content are
            provided &quot;as is&quot; and &quot;as available,&quot; without
            warranties of any kind, whether express, implied, or statutory,
            including warranties of merchantability, fitness for a particular
            purpose, non-infringement, accuracy, or availability.
          </p>
          <p>
            We do not warrant that the site will be uninterrupted or error-free,
            that defects will be corrected, or that the site or its server are
            free from viruses or other harmful components.
          </p>
        </section>

        <section className={styles.section}>
          <h2>10. Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, Quartic Lab and its
            directors, employees, and contractors will not be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            or for any loss of profits, revenue, data, or goodwill, arising out
            of or related to your use of the website, even if we have been
            advised of the possibility of such damages.
          </p>
          <p>
            Nothing in these Terms excludes or limits liability that cannot be
            excluded or limited under applicable law.
          </p>
        </section>

        <section className={styles.section}>
          <h2>11. Indemnification</h2>
          <p>
            You agree to indemnify and hold Quartic Lab harmless from any claim,
            liability, damage, or expense (including reasonable legal fees)
            arising from your misuse of the site, your violation of these Terms,
            or your infringement of any rights of a third party.
          </p>
        </section>

        <section className={styles.section}>
          <h2>12. Termination</h2>
          <p>
            We may suspend or terminate your access to the site at any time,
            without notice, if we reasonably believe you have violated these
            Terms or applicable law. Sections of these Terms that by their
            nature should survive termination — including intellectual property,
            disclaimers, limitation of liability, indemnification, and governing
            law — will continue to apply.
          </p>
        </section>

        <section className={styles.section}>
          <h2>13. Governing law and disputes</h2>
          <p>
            These Terms are governed by the laws of the Islamic Republic of
            Pakistan, without regard to its conflict-of-laws rules. You agree
            that the courts located in Lahore, Pakistan will have exclusive
            jurisdiction over any dispute arising from or related to these Terms
            or the website, unless a mandatory consumer protection law in your
            country of residence says otherwise.
          </p>
        </section>

        <section className={styles.section}>
          <h2>14. Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. When we make material
            changes we will update the &quot;Last updated&quot; date above.
            Continued use of the site after changes take effect means you accept
            the revised Terms.
          </p>
        </section>

        <section className={styles.section}>
          <h2>15. Privacy and cookies</h2>
          <p>
            Your use of the site is also governed by our{" "}
            <Link href="/privacy">Privacy Policy</Link> and{" "}
            <Link href="/cookies">Cookie Policy</Link>, which describe how we
            collect and use your information.
          </p>
        </section>

        <div className={styles.contactBlock}>
          <h2>Contact us</h2>
          <p>
            Questions about these Terms? Reach us at{" "}
            <a href="mailto:contact@quarticlab.com">contact@quarticlab.com</a>{" "}
            or by post at 6-B, Block B Phase 1 Johar Town, Lahore, Punjab 54000,
            Pakistan.
          </p>
        </div>
      </div>
    </div>
  );
}
