import React, { useRef, useEffect } from "react";
import { Grid, Link } from "@mui/material";
import navLinks from "@component/Constants/navLinks";
import styles from "./footer.module.css";
import Image from "next/image";
import { DashIcon, DashSmIcon } from "@component/assets";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

export default function FooterLinks() {
  const router = useRouter();
  const ref = useRef(null);
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (ref.current && inView) {
      ref.current.classList.add("animate__animated", "animate__zoomIn");
    }
  }, [inView]);

  return (
    <div ref={observerRef}>
      <div ref={ref} className="animate__delay-1s">
        <Grid container spacing={1.5} xl={2}>
          <Grid item xs={12}>
            <div className={styles.footerLinkHeading}>What We Do</div>
            <div>
              <span style={{ paddingRight: 8 }}>
                <Image src={DashSmIcon} alt="dash-icon" />
              </span>
              <span>
                <Image src={DashIcon} alt="dash-icon" />
              </span>
            </div>
          </Grid>
          <Grid item xs={12} style={{ marginTop: 0 }}></Grid>
          {navLinks.map(({ href, text }, index) => (
            <Grid key={index} item xs={6}>
              <Link
                underline="none"
                className="footerLink"
                style={{
                  width: "60px",
                  height: "30px",
                  fontFamily: "Poppins",
                  fontStyle: "normal",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "150%",
                  color: router.pathname === href ? "orange" : "#596380",
                }}
                key={href}
                href={href}
              >
                {text}
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
