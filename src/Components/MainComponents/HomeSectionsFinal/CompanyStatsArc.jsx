// YourComponent.js
import Image from "next/image";
import styles from "./temp.module.css";
const Temp = () => {
  return (
    <div className={styles.container}>
      <div className={styles.arcWrapper}>
        <Image
          //   fill
          alt="Arc Image"
          className={styles.img}
          height={400} // Set the height of your image
          src="/assets/HomeIcons/arc.png"
          width={1200} // Set the width of your image
        />
        <div className={`${styles.textBox} ${styles.box1}`}>1</div>
        <div className={`${styles.textBox} ${styles.box2}`}>2</div>
        <div className={`${styles.textBox} ${styles.box3}`}>3</div>
        <div className={`${styles.textBox} ${styles.box4}`}>4</div>
        <div className={`${styles.textBox} ${styles.box5}`}>5</div>
        {/* Add more text boxes as needed */}
      </div>
    </div>
  );
};

export default Temp;
