import dynamic from "next/dynamic";
import { noBlogBtn } from "../../../Constants/buttonTexts";
const ArrowCircleRightOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/ArrowCircleRightOutlined"),
);
import styles from "./BottomBorderButton.module.css";

function BottomBorderButton({ onClick, text }) {
  return (
    <>
      {text !== noBlogBtn ? (
        <div className={styles.animatedButton} onClick={onClick}>
          <span style={styles.btnTxt}>{text}</span>
          <span className={styles.btnIcon}>
            <ArrowCircleRightOutlinedIcon className={styles.ArrowCircleStyle} />
          </span>
        </div>
      ) : (
        <div
          className={`${styles.animatedButton} ${styles.btnCursor}`}
          onClick={onClick}
        >
          <span style={styles.btnTxt}>{text}</span>
        </div>
      )}
    </>
  );
}

export default BottomBorderButton;
