import dynamic from "next/dynamic";
import { Footer, Header } from "../CommonComponents";

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
      {children}
      <Footer />
      <CookieConsent />
      <ConsentedScripts />
    </div>
  );
}

export default Layout;
