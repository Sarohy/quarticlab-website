import React, { useRef, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import styles from "./footer.module.css";
import { DashIcon, DashSmIcon } from "@component/assets";
import Image from "next/image";
import CustomInputField from "../CustomInputField";
import { useInView } from "react-intersection-observer";

export default function FooterForm() {
  const ref = useRef(null);
  const [observerRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (ref.current && inView) {
      ref.current.classList.add("animate__animated", "animate__slideInRight");
    }
  }, [inView]);

  return (
    <div ref={observerRef}>
      <div ref={ref}>
        <Grid container spacing={2}>
          <Grid className={styles.footerLinkHeading} item xs={12}>
            <div>
              We will call you right Back
              <div>
                <span style={{ paddingRight: 8 }}>
                  <Image src={DashSmIcon} alt={"dashicon"}></Image>
                </span>
                <span>
                  <Image src={DashIcon} alt={"dashicon"}></Image>
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
            <CustomInputField label={"-Select A Service-"} />
          </Grid>
          <Grid item xs={12}>
            <CustomInputField multiline={true} label={"Message"} />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
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
    </div>
  );
}
