import React, { useState } from "react";
import { Grid, TextField, Button, TextareaAutosize } from "@mui/material";

export default function FooterForm() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        We will call you right Back
      </Grid>
      <Grid item xs={12}>
        <TextField className="footerFormInput" label="Name" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField label="Phone" fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField label="-Select A Service-" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextareaAutosize
          // as={TextField}
          onFocus={handleFocus}
          onBlur={handleBlur}
          rowsMin={8}
          fullWidth
          placeholder="Message"
          style={{
            width: "100%",
            border: `${isFocused ? "1px solid #89CFF0" : "1px solid #ccc"}`,
            borderRadius: "5px",
            padding: "20px 15px",
            resize: "none",
            height: 150,
          }}
          // sx={{}}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          // color="primary"
          style={{
            background: "#FF9700",
            boxShadow: "0px 4.12579px 10.3145px rgba(255, 151, 0, 0.12)",
            borderRadius: "5px",
          }}
        >
          Submit Now
        </Button>
      </Grid>
    </Grid>
  );
}
