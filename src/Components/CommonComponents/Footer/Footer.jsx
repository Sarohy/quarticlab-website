import Image from "next/image";
import dynamic from "next/dynamic";
const FooterAbout = dynamic(() => import("./FooterAbout"));
const FooterSocial = dynamic(() => import("./FooterSocial"));
const FooterServices = dynamic(() => import("./FooterServices"));
const FooterAllServices = dynamic(() => import("./FooterAllServices"));
import CopyrightLeftLine from "../../../../public/assets/footerIcons/copyrightLeftLine.svg";
import CopyrightRightLine from "../../../../public/assets/footerIcons/copyrightRightLine.svg";
import styles from "./footer.module.css";

function Footer() {
  return (
    <>
      <div className={styles.footerMainContainer}>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footAboutWidth}>
            <FooterAbout />
          </div>
          <div className={styles.footSocialWidth}>
            <FooterServices />
          </div>
          <div className={styles.footServiceWidth}>
            <FooterAllServices />
          </div>
          <div className={styles.footSocialWidth}>
            <FooterSocial />
          </div>
        </div>

        <div className={styles.footerRightsContainer}>
          <Image
            alt={"copy-right-left-line"}
            className={styles.footerRightsImage}
            src={CopyrightLeftLine}
          />
          <p>© 2023 Zweidevs. All Rights Reserved By Zweidevs</p>
          <Image
            alt={"copy-right-right-line"}
            className={styles.footerRightsImage}
            src={CopyrightRightLine}
          />
        </div>
      </div>
    </>
  );
}

export default Footer;
