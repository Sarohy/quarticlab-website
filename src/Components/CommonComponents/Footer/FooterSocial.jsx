import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import FBHover from "../../../../public/assets/footerIcons/facebookHover.svg";
import FbLogo from "../../../../public/assets/footerIcons/fbIcon.svg";
import InstaHover from "../../../../public/assets/footerIcons/InstaHover.svg";
import InstaLogo from "../../../../public/assets/footerIcons/instaIcon.svg";
import LinkedInHover from "../../../../public/assets/footerIcons/linkedInHover.svg";
import LinkedInLogo from "../../../../public/assets/footerIcons/linkedInIcon.svg";
import styles from "./footer.module.css";
import YoutubeIcon from "../../../../public/assets/footerIcons/youtubeIcon.svg";
import YoutubeIconHover from "../../../../public/assets/footerIcons/youtubeIconHover.svg";

const FooterSocial = () => {
  const ref = useRef(null);
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [hoverState, setHoverState] = useState(false);
  const [selectImage, setSelectImage] = useState("fb");

  const socialMediaData = [
    {
      name: "fb",
      href: "https://www.facebook.com/zweidevs",
      alt: "zweidevs facebook",
      image: FbLogo,
      hoverImage: FBHover,
    },
    {
      name: "insta",
      href: "https://instagram.com/zweidevs.tech?igshid=OGQ5ZDc2ODk2ZA==",
      alt: "zweidevs instagram",
      image: InstaLogo,
      hoverImage: InstaHover,
    },

    {
      name: "youtube",
      href: "https://youtube.com/@Zweidevs?si=7uR6r0W4GBzelhoo",
      alt: "zweidevs twitter",
      image: YoutubeIcon,
      hoverImage: YoutubeIconHover,
    },
    {
      name: "linkedin",
      href: "https://www.linkedin.com/company/zweidevs/",
      alt: "zweidevs linkedin",
      image: LinkedInLogo,
      hoverImage: LinkedInHover,
    },
  ];

  useEffect(() => {
    if (ref.current && inView) {
      ref.current.classList.add("animate__animated", "animate__zoomIn");
    }
  }, [inView]);

  return (
    <>
      <div ref={observerRef}>
        <div className="animate__delay-1s" ref={ref}>
          <h3>Find Us On</h3>

          <div className={styles.imageSocialMain}>
            {socialMediaData &&
              socialMediaData.map((element, key) => (
                <a
                  className={styles.imageContainer}
                  href={element.href}
                  key={key}
                  target="_blank"
                >
                  <div
                    onMouseEnter={() => {
                      setHoverState(true);
                      setSelectImage(element.name);
                    }}
                    onMouseLeave={() => setHoverState(false)}
                  >
                    <Image
                      alt={element.alt || "social-meida-image"}
                      className={styles.imageContainerIcons}
                      key={element.name}
                      src={
                        hoverState && selectImage === element.name
                          ? element.hoverImage
                          : element.image
                      }
                    />
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterSocial;
