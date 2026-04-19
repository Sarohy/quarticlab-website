import Head from "next/head";
import styles from "../styles/legalPage.module.css";

// TODO: Replace placeholder content with actual Privacy Policy copy.
export default function PrivacyPage() {
  return (
    <div className={styles.page}>
      <Head>
        <title>Privacy Policy | Quartic Lab</title>
        <meta
          content="Quartic Lab privacy policy — how we collect, use, and protect your data."
          name="description"
        />
      </Head>
      <div className={styles.container}>
        <span className={styles.eyebrow}>Legal</span>
        <h1 className={styles.heading}>Privacy Policy</h1>
        <p className={styles.updated}>Last updated: April 2026</p>
        <p className={styles.placeholder}>
          This page is being prepared. Please check back soon or contact us at{" "}
          <a href="mailto:hello@quarticlab.com">hello@quarticlab.com</a> with
          any privacy-related questions.
        </p>
      </div>
    </div>
  );
}
