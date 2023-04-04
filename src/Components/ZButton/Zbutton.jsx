import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import styles from "./ZButton.module.css";
import { Button } from '@mui/material';

function Zbutton({
    backgroundColor = "white",
    color = "#ff9700",
    width = "200px",
    height = "50px",
    padding = "0px",
    showIcon = true,
    text,
    onClick,
}) {
    const buttonStyle = {
        backgroundColor,
        color,
        width,
        height,
        padding
    }
    return (
        <Button
            onClick={onClick}
            style={buttonStyle}
            className={styles.zButton}>
            {showIcon && <ArrowRightAltIcon />}
            <span>
                {text}
            </span>
        </Button>
    )
}

export default Zbutton