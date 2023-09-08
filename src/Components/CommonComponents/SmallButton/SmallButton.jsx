/* eslint-disable prettier/prettier */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./SmallButton.module.css";
import { useEffect } from "react";

export default function SmallButton(props) {
  const { smallButtonsData, setFilter } = props;
  const [activeTab, setActiveTab] = React.useState(0);
  // eslint-disable-next-line no-unused-vars
  const [activeMarginTop, setActiveMarginTop] = React.useState(0);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {setActiveMarginTop("10px");}
      else {setActiveMarginTop("0px");}
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Box sx={{ "& button": { ml: 1 } }}>
      <div>
        {smallButtonsData.map((element, index) => (
          <Button
            className={`
            ${index === activeTab ? styles.BtnBgOrange : styles.BtnBgWhite}
            ${index === activeTab ? styles.BtnColorWhite : styles.BtnColorSlate}
            ${styles.BtnBdSlate}
            ${styles.BtnFont}
            ${
              index === smallButtonsData.length - 1
                ? styles.BtnMTop
                : styles.BtnMTop0
            }
         `}
            key={index}
            onClick={() => {
              setActiveTab(index);
              setFilter(element);
            }}
            size="small"
            variant={index === activeTab ? "contained" : "outlined"}
          >
            {element}
          </Button>
        ))}
      </div>
    </Box>
  );
}
