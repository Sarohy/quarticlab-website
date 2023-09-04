import React, { useState } from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styles from "./ZButton.module.css";
import { Button } from "@mui/material";

const Zbutton = ({
  color = "#ff9700",
  width = "200px",
  height = "50px",
  hoverColor = "#ff9700",
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
  const textColor = isHovered ? hoverColor : color;
  return (
    <Button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={mainContainerStyle}
      onClick={onClick}
    >
      <div
        style={{ width, height, background: "none" }}
        className={[styles.btnThree, styles.btn, customClass]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {showIcon && <ArrowRightAltIcon style={{ color: textColor }} />}
        <span className={styles.btnText} style={{ color: textColor }} >{text}</span>
        {icon !== undefined && <span style={{ zIndex: 2, color: textColor }} >{icon}</span>}
      </div >
    </Button>
  );
}

export default Zbutton;
