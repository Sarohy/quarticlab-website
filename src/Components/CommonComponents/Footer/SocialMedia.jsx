import Image from "next/image";
import React from "react";
import styles from "./footer.module.css";
const SocialMedia = (props) => {
  const { data } = props;
  return (
    <>
      <div className={styles.imageSocialContainer}>
        {data &&
          data.map((element, key) => (
            <a key={key} href={element.href} className={styles.image}>
              <div className={styles.imageSocial}>
                <Image
                  src={element.image}
                  alt={element.alt || "social-meida-image"}
                />
              </div>
            </a>
          ))}
      </div>
    </>
  );
};

export default SocialMedia;
