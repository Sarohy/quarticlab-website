import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./SmallButton.module.css";
import { useEffect } from "react";

export default function SmallButton(props) {
  const { smallButtonsData, setFilter } = props;
  const [activeTab, setActiveTab] = React.useState(0);
  const [activeMarginTop, setActiveMarginTop] = React.useState(0);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) setActiveMarginTop("10px");
      else setActiveMarginTop("0px");
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
            style={{
              background: index === activeTab ? "#F79D0A" : "#fff",
              color: index === activeTab ? "white" : "#666666",
              borderColor: "#666666",
              fontFamily: "poppins",
              marginTop:
                index === smallButtonsData.length - 1 ? activeMarginTop : "",
            }}
            key={index}
            onClick={() => {
              setActiveTab(index);
              setFilter(element);
            }}
            variant={index === activeTab ? "contained" : "outlined"}
            size="small"
          >
            {element}
          </Button>
        ))}
      </div>
    </Box>
  );
}
