import React from "react";
import { Grid, Link } from "@mui/material";
import navLinks from "@component/Constants/navLinks";
import styles from "./footer.module.css";
import Image from "next/image";

import { DashIcon, DashSmIcon } from "@component/assets";
import { useRouter } from "next/router";
export default function FooterLinks() {
  const router = useRouter();
  return (
    <div>
      <Grid container spacing={1.5} xl={2}>
        <Grid item xs={12}>
          <div className={styles.footerLinkHeading}>What We Do</div>
          <div>
            <span style={{ paddingRight: 8 }}>
              <Image src={DashSmIcon} alt="dash-icon"></Image>
            </span>
            <span>
              <Image src={DashIcon} alt="dash-icon-1"></Image>
            </span>
          </div>
        </Grid>
        {/* empty grid for margin 20 */}
        <Grid item xs={12} style={{ marginTop: 0 }}></Grid>
        {navLinks.map(({ href, text }, index) => {
          // if (index === 0) {
          //   return null;
          // }
          return (
            <Grid key={index} item xs={6}>
              <Link
                underline="none"
                className="footerLink"
                style={{
                  width: "60px",
                  height: "30px",
                  //left: "581px",
                  //top: "4102px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "150%",
                  /* identical to box height, or 30px */

                  /* body */

                  color: router.pathname === href ? "orange" : "#596380",
                }}
                key={href}
                href={href} //className={styles.pageLabel}
              >
                {text}
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
