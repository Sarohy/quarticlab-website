import React from "react";
import { Grid, Link } from "@mui/material";
import navLinks from "@component/Constants/navLinks";
import styles from "./footer.module.css";

export default function FooterLinks() {
  return (
    <Grid container style={{ height: 50 }} spacing={2}>
      <Grid item xs={12}>
        <div className={styles.footerLinkHeading}>What We Do</div>
      </Grid>
      {navLinks.map(({ href, text }, index) => {
        // if (index === 0) {
        //   return null;
        // }
        return (
          <Grid item xs={6}>
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

                color: "#596380",
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
  );
}
