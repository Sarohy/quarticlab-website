import Image from "next/image";
import React from "react";
import styles from "./footer.module.css";
const SocialMedia = (props) => {
  const { data } = props;
  return (
    <div className={styles.footerSocialContainer}>
      {data &&
        data.map((element, key) => (
          <a key={key} href={element.href} className={styles.image}>
            <Image
              src={element.image}
              alt={element.alt || "social-meida-image"}
              className={styles.imgColor}
              style={{
                marginRight: 20,
                //color: "orange", //isFocused ? "orange" : "",
                // backgroundColor: "red",
              }}
              width={40}
              height={40}
            />
          </a>
        ))}
    </div>
  );
};

export default SocialMedia;
