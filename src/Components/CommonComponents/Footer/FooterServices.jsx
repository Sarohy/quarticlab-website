import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Link = dynamic(() => import("@mui/material/Link"));
import navLinks from "@component/Constants/navLinks";
import { useInView } from "react-intersection-observer";
import styles from "./footer.module.css";

const FooterServices = () => {
  const router = useRouter();
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <div
        className={`${styles.footerFadeEl} ${
          inView ? styles.footerVisible : ""
        }`}
        ref={observerRef}
        style={{ transitionDelay: "80ms" }}
      >
        <h3>What We Do</h3>
        <div className={styles.footerServicesItemsContainer}>
          <Grid container spacing={2.5} xl={10}>
            {navLinks.map(({ href, text }, index) => (
              <Grid item key={index} xs={12}>
                <Link
                  className={`${styles.footerServiceItem} ${
                    router.pathname === href
                      ? styles.colorOrange
                      : styles.colorGrid
                  }`}
                  color={"#596380"}
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
    </>
  );
};

export default FooterServices;
