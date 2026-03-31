import Image from "next/image";
import { useInView } from "react-intersection-observer";
import FBHover from "../../../../public/assets/footerIcons/facebookHover.svg";
import FbLogo from "../../../../public/assets/footerIcons/fbIcon.svg";
import InstaHover from "../../../../public/assets/footerIcons/InstaHover.svg";
import InstaLogo from "../../../../public/assets/footerIcons/instaIcon.svg";
import LinkedInHover from "../../../../public/assets/footerIcons/linkedInHover.svg";
import LinkedInLogo from "../../../../public/assets/footerIcons/linkedInIcon.svg";
import YoutubeIcon from "../../../../public/assets/footerIcons/youtubeIcon.svg";
import YoutubeIconHover from "../../../../public/assets/footerIcons/youtubeIconHover.svg";
import styles from "./footer.module.css";

const FooterSocial = () => {
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const socialMediaData = [
    {
      alt: "zweidevs facebook",
      href: "https://www.facebook.com/zweidevs",
      hoverImage: FBHover,
      image: FbLogo,
      name: "fb",
    },
    {
      alt: "zweidevs instagram",
      href: "https://instagram.com/zweidevs.tech?igshid=OGQ5ZDc2ODk2ZA==",
      hoverImage: InstaHover,
      image: InstaLogo,
      name: "insta",
    },
    {
      alt: "zweidevs youtube",
      href: "https://youtube.com/@Zweidevs?si=7uR6r0W4GBzelhoo",
      hoverImage: YoutubeIconHover,
      image: YoutubeIcon,
      name: "youtube",
    },
    {
      alt: "zweidevs linkedin",
      href: "https://www.linkedin.com/company/zweidevs/",
      hoverImage: LinkedInHover,
      image: LinkedInLogo,
      name: "linkedin",
    },
  ];

  return (
    <div
      className={`${styles.footerFadeEl} ${inView ? styles.footerVisible : ""}`}
      ref={observerRef}
      style={{ transitionDelay: "240ms" }}
    >
      <h3 className={styles.footerColumnTitle}>Connect</h3>
      <p className={styles.footerSocialSubtext}>
        Follow us for the latest updates, case studies & insights.
      </p>
      <div className={styles.socialIconsGrid}>
        {socialMediaData.map(element => (
          <a
            className={styles.socialIconCard}
            href={element.href}
            key={element.name}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Image
              alt={element.alt || "social-media-image"}
              className={styles.socialIcon}
              height={22}
              src={element.image}
              width={22}
            />
            <Image
              alt={element.alt || "social-media-image"}
              className={styles.socialIconHover}
              height={22}
              src={element.hoverImage}
              width={22}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default FooterSocial;
