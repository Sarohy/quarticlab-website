import React, { useState } from 'react'
import styles from "./BottomBorderButton.module.css"
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

function BottomBorderButton({
    onClick,
    text,
}) {
    return (
        <div
            onClick={onClick}
            className={styles.animatedButton}
        >
            <span style={styles.btnTxt}>
                {text}
            </span>
            <span className={styles.btnIcon} >
                <ArrowCircleRightOutlinedIcon style={{ color: "#ff9700" }} />
            </span>
        </div>
    )
}

export default BottomBorderButton