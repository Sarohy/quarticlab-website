import Link from "next/link";
import { useRouter } from "next/router";
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
      cardTitle: "AI & Machine Learning",
      href: urls.services.AI.url,
    },
    {
      cardTitle: "DevOps & Cloud",
      href: urls.services.DevOPS.url,
    },
  ];

  return (
    <div
      className={`${styles.footerFadeEl} ${inView ? styles.footerVisible : ""}`}
      ref={observerRef}
      style={{ transitionDelay: "160ms" }}
    >
      <h3 className={styles.footerColumnTitle}>Services</h3>
      <div className={styles.footerLinksList}>
        {cardData.map(({ href, cardTitle }) => (
          <Link
            className={`${styles.footerLinkItem} ${
              router.pathname === href ? styles.colorOrange : ""
            }`}
            href={href}
            key={href}
          >
            <span className={styles.footerLinkArrow}>→</span>
            {cardTitle}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterAllServices;
