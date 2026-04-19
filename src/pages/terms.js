import Head from "next/head";
import styles from "../styles/legalPage.module.css";

// TODO: Replace placeholder content with actual Terms of Service copy.
export default function TermsPage() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Terms of Service | Quartic Lab</title>
        <meta
          content="Quartic Lab terms of service — the rules and conditions governing use of our services."
          name="description"
        />
      </Head>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.heading}>Terms of Service</h1>
        <p className={styles.updated}>Last updated: April 2026</p>
        <p className={styles.placeholder}>
          This page is being prepared. Please check back soon or contact us at{" "}
          <a href="mailto:hello@quarticlab.com">hello@quarticlab.com</a> with
          any questions about our terms.
        </p>
      </div>
    </div>
  );
}
