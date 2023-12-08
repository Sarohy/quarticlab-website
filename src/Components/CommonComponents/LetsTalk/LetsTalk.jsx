import styles from "./letsTalk.module.css";
import Link from "next/link";

const LetsTalk = ({ cardTitle, cardDesc, buttonTitle }) => {
  return (
    <div className={styles.root}>
      <section
        class={`${styles.section} ${styles.cta} ${styles.ctaBlack}`}
        id="block_b284d8ae62d620602005cc3954197627"
      >
        <div class={`${styles.wrapper} ${styles.cta__wrapper}`}>
          <h2
            class={`${styles.heading} ${styles.heading2} ${styles.cta__heading}`}
          >
            {cardTitle}
          </h2>
          <p class={`${styles.caption} ${styles.cta__caption}`}>{cardDesc}</p>
          <Link
            class={`${styles.button} ${styles.buttonPurple} ${styles.cta__button}`}
            href="https://calendly.com/request-demo-zweidevs/30min"
            target=""
            // title="Schedule a call"
          >
            {buttonTitle}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LetsTalk;
