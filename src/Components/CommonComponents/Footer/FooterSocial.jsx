import React, { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";
import styles from "./footer.module.css";
import {
  InstaLogo,
  FbLogo,
  LinkedInLogo,
  TwitterLogo,
  LinkedInHover,
  FBHover,
  InstaHover,
  TwitterHover,
} from "@component/assets/footerIcons";
import Image from "next/image";

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
      href: "https://www.instagram.com/zweidevs.official",
      alt: "zweidevs instagram",
      image: InstaLogo,
      hoverImage: InstaHover,
    },

    {
      name: "twitter",
      href: "#",
      alt: "zweidevs twitter",
      image: TwitterLogo,
      hoverImage: TwitterHover,
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
        <div ref={ref} className="animate__delay-1s">
          <h3>Social Media links</h3>

          <div className={styles.footerLinesContainerSocial}>
            <hr className={styles.footerLine1} />
            <hr className={styles.footerLine2} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={styles.imageSocialContainer}>
              {socialMediaData &&
                socialMediaData.map((element, key) => (
                  <a
                    key={key}
                    href={element.href}
                    className={styles.imageContainer}
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
                        src={
                          hoverState && selectImage === element.name
                            ? element.hoverImage
                            : element.image
                        }
                        alt={element.alt || "social-meida-image"}
                        key={element.name}
                      />
                    </div>
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterSocial;
