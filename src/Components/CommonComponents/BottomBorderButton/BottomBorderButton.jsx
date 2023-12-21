import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { noBlogBtn } from "../../../Constants/buttonTexts";
const ArrowCircleRightOutlinedIcon = dynamic(() =>
  import("@mui/icons-material/ArrowCircleRightOutlined"),
);
import styles from "./BottomBorderButton.module.css";

function BottomBorderButton({ onClick, text }) {
  const [isTouchScreen, setIsTouchScreen] = useState(false);

  useEffect(() => {
    const checkTouchScreen = () => {
      // Check if the 'ontouchstart' property is available on the window
      setIsTouchScreen("ontouchstart" in window);
    };

    // Check initially
    checkTouchScreen();

    // Add a resize event listener to re-check when the window is resized
    window.addEventListener("resize", checkTouchScreen);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkTouchScreen);
    };
  }, []);
  return (
    <>
      {text !== noBlogBtn ? (
        <div className={styles.animatedButton} onClick={onClick}>
          <span style={styles.btnTxt}>{text}</span>
          {isTouchScreen ? (
            <ArrowCircleRightOutlinedIcon className={styles.ArrowCircleStyle} />
          ) : (
            <span className={styles.btnIcon}>
              <ArrowCircleRightOutlinedIcon
                className={styles.ArrowCircleStyle}
              />
            </span>
          )}
        </div>
      ) : (
        <div
          className={`${styles.animatedButton} ${styles.btnCursor}`}
          onClick={onClick}
          // className={`${styles.btnCursor}`}
        >
          <span style={styles.btnTxt}>{text}</span>
        </div>
      )}
    </>
  );
}

export default BottomBorderButton;
