import React, { useEffect, useState, useRef } from "react";
import styles from "./footer.module.css";
import { Grid, Link } from "@mui/material";
import navLinks from "@component/Constants/navLinks";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";

const FooterServices = () => {
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
    <>
      <div ref={observerRef}>
        <div ref={ref} className="animate__delay-1s">
          <h3>What We Do</h3>
          {/* <div className={styles.footerLinesContainerService}>
            <hr className={styles.footerLine1} />
            <hr className={styles.footerLine2} />
          </div> */}
          <div className={styles.footerServicesItemsContainer}>
            <Grid container spacing={2.5} xl={10}>
              {navLinks.map(({ href, text }, index) => (
                <Grid key={index} item xs={6}>
                  <Link
                    underline="none"
                    className={styles.footerServiceItem}
                    style={{
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
      </div>
    </>
  );
};

export default FooterServices;
