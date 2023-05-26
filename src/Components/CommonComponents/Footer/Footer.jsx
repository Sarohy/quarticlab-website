import React, { useEffect, useState, useRef } from "react";
import styles from "./footer.module.css";
import Image from "next/image";

import "animate.css";
import {
  InstaLogo,
  FbLogo,
  LinkedInLogo,
  TwitterLogo,
  CopyrightLeftLine,
  CopyrightRightLine,
  LinkedInHover,
  FBHover,
  InstaHover,
  TwitterHover,
} from "@component/assets/footerIcons";
import FooterAbout from "./FooterAbout";
import FooterServices from "./FooterServices";
import FooterSocial from "./FooterSocial";

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
            className={styles.footerRightsImage}
            src={CopyrightLeftLine}
            alt={"copy-right-left-line"}
          />
          <p>© 2023 Zweidevs. All Rights Reserved by Zweidevs</p>
          <Image
            className={styles.footerRightsImage}
            src={CopyrightRightLine}
            alt={"copy-right-right-line"}
          />
        </div>
      </div>
    </>
  );
}

export default Footer;
