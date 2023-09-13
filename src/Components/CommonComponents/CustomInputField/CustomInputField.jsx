import { useState } from "react";
import TextField from "@mui/material/TextField";

export const CustomInputField = props => {
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
      className="footerFormInput"
      fullWidth
      InputLabelProps={{
        style: { color: isFocused ? "orange" : "" },
      }}
      label={label ? label : "Name"}
      minRows={4}
      multiline={multiline ? multiline : false}
      onBlur={handleBlur}
      onFocus={handleFocus}
      size="small"
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "orange",
            color: "orange",
            fontFamily: "poppins",
          },
        },
      }}
    />
  );
};
