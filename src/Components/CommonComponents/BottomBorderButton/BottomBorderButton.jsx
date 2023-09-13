import dynamic from "next/dynamic";
const ArrowCircleRightOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/ArrowCircleRightOutlined"),
);
import styles from "./BottomBorderButton.module.css";

function BottomBorderButton({ onClick, text }) {
  return (
    <div className={styles.animatedButton} onClick={onClick}>
      <span style={styles.btnTxt}>{text}</span>
      <span className={styles.btnIcon}>
        <ArrowCircleRightOutlinedIcon className={styles.ArrowCircleStyle} />
      </span>
    </div>
  );
}

export default BottomBorderButton;
