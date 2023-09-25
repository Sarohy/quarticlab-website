import dynamic from "next/dynamic";
const Header = dynamic(() => import("../CommonComponents/Header"));
const Footer = dynamic(() => import("../CommonComponents/Footer"));
function Layout({ children }) {
  return (
    <div className="content">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
