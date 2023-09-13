import Image from "next/image";
import FooterAbout from "./FooterAbout";
import FooterServices from "./FooterServices";
import FooterSocial from "./FooterSocial";
import {
  CopyrightLeftLine,
  CopyrightRightLine,
} from "@component/assets/footerIcons";
import "animate.css";
import styles from "./footer.module.css";

function Footer() {
  return (
    <>
      <div className={styles.footerMainContainer}>
        <div className={styles.footerSectionContainer}>
          <div className={styles.footAboutWidth}>
            <FooterAbout />
          </div>
          <div className={styles.footServiceWidth}>
            <FooterServices />
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
