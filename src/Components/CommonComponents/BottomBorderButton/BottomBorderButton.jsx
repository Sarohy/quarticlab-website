import styles from "./BottomBorderButton.module.css";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

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
