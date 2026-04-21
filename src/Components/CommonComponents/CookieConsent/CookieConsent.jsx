import { useEffect, useState } from "react";
import Link from "next/link";
import { acceptAll, readConsent, rejectAll } from "@component/utils/consent";
import styles from "./cookieConsent.module.css";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if the visitor has not made a choice yet.
    setVisible(readConsent() === null);
    const onOpen = () => setVisible(true);
    window.addEventListener("ql:consent-open", onOpen);
    return () => window.removeEventListener("ql:consent-open", onOpen);
  }, []);

  if (!visible) {
    return null;
  }

  const onAccept = () => {
    acceptAll();
    setVisible(false);
  };

  const onReject = () => {
    rejectAll();
    setVisible(false);
  };

  return (
    <div
      aria-describedby="ql-cookie-copy"
      aria-labelledby="ql-cookie-title"
      className={styles.banner}
      role="dialog"
    >
      <div className={styles.content}>
        <p className={styles.eyebrow}>Cookies</p>
        <h2 className={styles.title} id="ql-cookie-title">
          We use cookies to improve your visit.
        </h2>
        <p className={styles.copy} id="ql-cookie-copy">
          Strictly necessary cookies always run. With your consent we also use
          analytics (Google Analytics) and functional cookies (Calendly, Clutch)
          to understand usage and power embeds. See our{" "}
          <Link href="/cookies">Cookie Policy</Link> for details.
        </p>
      </div>
      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.btnSecondary}`}
          onClick={onReject}
          type="button"
        >
          Reject non-essential
        </button>
        <button
          className={`${styles.btn} ${styles.btnPrimary}`}
          onClick={onAccept}
          type="button"
        >
          Accept all
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
