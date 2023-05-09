import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import styles from "./ZButton.module.css";
import { Button } from "@mui/material";

function Zbutton({
  backgroundColor = "white",
  color = "#ff9700",
  width = "200px",
  height = "50px",
  padding = "0px",
  margin = "0px",
  showIcon = true,
  whiteShaddow = false,
  orangeShaddow = false,
  className,
  text,
  onClick,
  icon,
}) {
  const buttonStyle = {
    backgroundColor,
    color,
    width,
    height,
    padding,
    margin,
  };
  return (
    <Button
      onClick={onClick}
      style={buttonStyle}
      className={`${className} ${
        whiteShaddow
          ? styles.whiteShaddow
          : orangeShaddow
          ? styles.orangeShaddow
          : styles.zButton
      }`}
    >
      {showIcon && <ArrowRightAltIcon />}
      <span>{text}</span>
      <span>{icon}</span>
    </Button>
  );
}

export default Zbutton;
