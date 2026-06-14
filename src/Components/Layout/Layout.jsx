import dynamic from "next/dynamic";
import { Footer, Header } from "../CommonComponents";
import styles from "./layout.module.css";

const CookieConsent = dynamic(
  () => import("../CommonComponents/CookieConsent/CookieConsent"),
  { ssr: false },
);
const ConsentedScripts = dynamic(
  () => import("../CommonComponents/CookieConsent/ConsentedScripts"),
  { ssr: false },
);

function Layout({ children }) {
  return (
    <div className="content">
      <Header />
      <main className={styles.main} id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <CookieConsent />
      <ConsentedScripts />
    </div>
  );
}

export default Layout;
