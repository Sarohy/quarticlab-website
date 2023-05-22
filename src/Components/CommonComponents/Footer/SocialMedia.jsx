import Image from "next/image";
import React, { useState } from "react";
import styles from "./footer.module.css";
const SocialMedia = (props) => {
  const { data } = props;

  const [hoverState, setHoverState] = useState(false);
  const [selectImage, setSelectImage] = useState("fb");

  return (
    <>
      <div className={styles.imageSocialContainer}>
        {data &&
          data.map((element, key) => (
            <a
              key={key}
              href={element.href}
              className={styles.image}
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
    </>
  );
};

export default SocialMedia;
