import { TextField } from "@mui/material";
import React, { useState } from "react";

export const CustomInputField = (props) => {
  const { label, multiline } = props;
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <TextField
      multiline={multiline ? multiline : false}
      size="small"
      className="footerFormInput"
      label={label ? label : "Name"}
      fullWidth
      minRows={8}
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "orange",
            color: "orange",
          },
        },
      }}
      InputLabelProps={{
        style: { color: isFocused ? "orange" : "" },
        // shrink: false,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};
