import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styles from "./ZButton.module.css";
import { Button } from "@mui/material";

const Zbutton = ({
  onMouseEnter,
  onMouseLeave,
  customClass,
  mainContainerStyle,
  showIcon = true,
  text,
  onClick,
  icon,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <Button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={mainContainerStyle}
      onClick={onClick}
    >
      <div
        className={[styles.btnThree, styles.btn, styles.BtnStyle, customClass]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showIcon && <ArrowRightAltIcon
          className={isHovered ? styles.ZBtnHoverColor : styles.ZBtnColor}
        />
        }
        <span className={`${styles.btnText} ${isHovered ? styles.ZBtnHoverColor : styles.ZBtnColor}`}
        >{text}</span>
        {icon !== undefined && <span
          className={`${styles.ZBtnZIndex} ${isHovered ? styles.ZBtnHoverColor : styles.ZBtnColor}`}
        >{icon}</span>}
      </div>
    </Button>
  );
}

export default Zbutton;
