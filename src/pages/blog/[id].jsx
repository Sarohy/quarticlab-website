import PageBanner from "@component/Components/CommonComponents/PageBanner";
import Image from "next/image";
import React from "react";
import styles from "./blog.module.css";
const Id = (props) => {
  const { data } = props;
  return (
    <div>
      {" "}
      <PageBanner />
      <div
        style={{
          padding: 40,
        }}
      >
        {" "}
        <Image
          //src={`https://media.istockphoto.com/id/1281804798/photo/very-closeup-view-of-amazing-domestic-pet-in-mirror-round-fashion-sunglasses-is-isolated-on.jpg?s=612x612&w=0&k=20&c=oMoz9rUr-rDhMGNmEepCkr7F1g3AXs9416hvVnT_4CI=`}
          //src={"https://wallpaperaccess.com/full/5131575.jpg"}
          src={
            "https://cdn.dribbble.com/users/732850/screenshots/8832927/lucifer_neon3_dribble_4x.jpg"
          }
          height={50}
          width={1600}
          style={{
            width: "100%",
            height: 500,
            borderRadius: 5,
            border: "2px solid orange",
            objectFit: "cover",
          }}
          alt={"page-banner"}
        />
        <div className={styles.blogDetails}>
          {"New mobile apps to keep an eye on"}
        </div>
      </div>
    </div>
  );
};

export default Id;
