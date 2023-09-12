import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Grid, Link } from "@mui/material";
import navLinks from "@component/Constants/navLinks";
import { useInView } from "react-intersection-observer";
import styles from "./footer.module.css";

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
        <div className="animate__delay-1s" ref={ref}>
          <h3>What We Do</h3>
          <div className={styles.footerServicesItemsContainer}>
            <Grid container spacing={2.5} xl={10}>
              {navLinks.map(({ href, text }, index) => (
                <Grid item key={index} xs={6}>
                  <Link
                    className={`${styles.footerServiceItem} ${
                      router.pathname === href
                        ? styles.colorOrange
                        : styles.colorGrid
                    }`}
                    href={href}
                    key={href}
                    underline="none"
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
