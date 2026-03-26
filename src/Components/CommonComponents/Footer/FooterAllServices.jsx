import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Grid = dynamic(() => import("@mui/material/Grid"));
const Link = dynamic(() => import("@mui/material/Link"));
import { useInView } from "react-intersection-observer";
import styles from "./footer.module.css";
import { urls } from "@component/utils/urls";

const FooterAllServices = () => {
  const router = useRouter();
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardData = [
    {
      cardTitle: "Web Development",
      href: urls.services.WebApp.url,
    },
    {
      cardTitle: "Blockchain Development",
      href: urls.services.BC.url,
    },
    {
      cardTitle: "Mobile App Development",
      href: urls.services.MobileApp.url,
    },
    {
      cardTitle: "UI/UX Development",
      href: urls.services.UIUX.url,
    },
    {
      cardTitle: "Game Development",
      href: urls.services.GD.url,
    },
    {
      cardTitle: "IOT Devices",
      href: urls.services.IoT.url,
    },
    {
      cardTitle: "Artificial Intelligence & Machine Learning",
      href: urls.services.AI.url,
    },
    {
      cardTitle: "DevOps & Cloud Services",
      href: urls.services.DevOPS.url,
    },
  ];
  return (
    <>
      <div
        className={`${styles.footerFadeEl} ${
          inView ? styles.footerVisible : ""
        }`}
        ref={observerRef}
        style={{ transitionDelay: "160ms" }}
      >
        <h3>Services</h3>
        <div className={styles.footerServicesItemsContainer}>
          <Grid container spacing={2.5} xl={10}>
            {cardData.map(({ href, cardTitle }, index) => (
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
                  {cardTitle}
                </Link>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </>
  );
};

export default FooterAllServices;
