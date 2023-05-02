import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function SmallButton(props) {
  const { smallButtonsData } = props;
  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        {smallButtonsData.map((element, index) => (
          <Button
            key={index}
            onClick={() => setActiveTab(index)}
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
