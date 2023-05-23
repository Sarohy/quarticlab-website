import React, { useState } from "react";
import { Grid, TextField, Button, TextareaAutosize } from "@mui/material";
import styles from "./footer.module.css";
import { DashIcon, DashSmIcon } from "@component/assets";
import Image from "next/image";
import CustomInputField from "../CustomInputField";

export default function FooterForm() {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="">
      <Grid container spacing={2}>
        <Grid className={styles.footerLinkHeading} item xs={12}>
          <div>
            We will call you right Back
            <div>
              <span style={{ paddingRight: 8 }}>
                <Image src={DashSmIcon} alt={"dashicon"}></Image>
              </span>
              <span>
                <Image src={DashIcon} alt={"dashicon1"}></Image>
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <CustomInputField label={"Name"} />
        </Grid>
        <Grid item xs={6}>
          <CustomInputField label={"Phone"} />
        </Grid>
        <Grid item xs={6}>
          <CustomInputField label={"Select A Service"} />
        </Grid>
        <Grid item xs={12}>
          <CustomInputField multiline={true} label={"Message"} />
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
    </div>
  );
}
