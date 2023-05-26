import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "./SmallButton.module.css";

export default function SmallButton(props) {
  const { smallButtonsData, setFilter } = props;
  const [activeTab, setActiveTab] = React.useState(0);

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
              marginTop: index === smallButtonsData.length - 1 ? "10px" : "",
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
