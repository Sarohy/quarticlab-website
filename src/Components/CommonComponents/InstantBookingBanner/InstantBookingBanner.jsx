import Zbutton from "../ZButton";
import styles from "./InstantBookingBanner.module.css";

function InstantBookingBanner(props) {
  const { label, buttonText, buttonOnClick } = props;
  return (
    <div className={styles.iBBContainer}>
      <div className={styles.iBBContentContainer}>
        <h2 className={styles.LabelColor}>
          {label ? label : "Are you ready for meaningful results? We can help."}
        </h2>
        <Zbutton
          onClick={buttonOnClick}
          text={buttonText ? buttonText : "INSTANT BOOKING"}
        />
      </div>
    </div>
  );
}

export default InstantBookingBanner;
