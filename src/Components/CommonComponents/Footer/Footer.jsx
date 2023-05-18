import React, { useEffect, useState, useRef } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import "animate.css";
// import {
//ZweidevsLogo,
//   FacebookIcon,
//   InstagramIcon,
//   LinkedInIcon,
//   TwitterIcon,
// } from "@component/assets";
import {
  ZweidevsLogo,
  InstaLogo,
  FbLogo,
  LinkedInLogo,
  TwitterLogo,
  CopyrightLeftLine,
  CopyrightRightLine,
} from "@component/assets/footerIcons";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { isValidEmail } from "@component/utils/helpers";
import navLinks from "@component/Constants/navLinks";
import Link from "next/link";
import { Grid } from "@mui/material";
import FooterForm from "./FooterForm";
import FooterLinks from "./FooterLinks.jsx";
import SocialMedia from "./SocialMedia";

function Footer() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const [state, setState] = useState({
    email: "",
    invalidEmail: false,
    mobileView: null,
  });
  const { email, invalidEmail, mobileView } = state;

  const socialMediaData = [
    {
      href: "https://www.facebook.com/zweidevs",
      alt: "zweidevs facebook",
      image: FbLogo,
    },
    {
      href: "https://www.instagram.com/zweidevs.official",
      alt: "zweidevs instagram",
      image: InstaLogo,
    },

    {
      href: "#",
      alt: "zweidevs twitter",
      image: TwitterLogo,
    },
    {
      href: "https://www.linkedin.com/company/zweidevs/",
      alt: "zweidevs linkedin",
      image: LinkedInLogo,
    },
  ];

  const handleOnChangeEmail = (event) => {
    const { value } = event.target;
    setState((prevState) => ({ ...prevState, email: value }));
  };

  const handleEmailButton = () => {
    if (isValidEmail(email) && email !== "") {
      alert(`Email : ${email}`);
    } else {
      alert("Email not valid");
    }
  };

  useEffect(() => {
    isValidEmail(email) || email === ""
      ? setState({ ...state, invalidEmail: false })
      : setState({ ...state, invalidEmail: true });
  }, [email]);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  useEffect(() => {
    const refClass1 = document.querySelectorAll("ref1");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target;

            // Code to handle animation
            // target.classList.remove("hidden");
            //target.style.opacity = 1;
            target.classList.add(
              // "animate__animated",
              "animate__slideInLeft"
              // ,"animate__delay-2s"
            );

            observer.unobserve(target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    // document.addEventListener("DOMContentLoaded", function () {
    // your instersectionobserver code here
    if (refClass1) {
      refClass1.forEach((section) => {
        observer.observe(section);
      });
    }
    // });

    return () => {
      observer.disconnect();
    };
  }, []);

  const displayWeb = () => (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerContentContainer}>
          {/* footer sub-section-1 */}
          <div
            className="ref1 animate__animated" //ref={ref1}
          >
            <Image src={ZweidevsLogo} alt="zweidevs" width={200} />
            <div className={styles.footerAboutZweidevs}>
              {`
              Zweidevs provides dedicated \n
              remote teams that work closely with \n
              you to design and build your idea.
              `}
            </div>
            <SocialMedia data={socialMediaData} />
          </div>
          <div
            ref={ref2}
            style={{ width: "40%", padding: "12px 20px 0px 30px" }}
          >
            <FooterLinks />
          </div>
          <div
            ref={ref3}
            style={{ width: "40%", padding: "12px 20px 0px 12px" }}
          >
            <FooterForm />
          </div>
        </div>
        <Grid
          sx={{ display: { xs: "none", sm: "none", md: "none", lg: "flex" } }}
          container
          spacing={0}
          style={{ marginBottom: 30, marginTop: 30 }}
        >
          <Grid
            style={{
              justifyContent: "start",
              display: "flex",
            }}
            item
            md={2}
          >
            <Image src={CopyrightLeftLine} alt={"copy-right-left-line"}></Image>
          </Grid>

          <Grid
            style={{ justifyContent: "center", display: "flex" }}
            item
            //xs={8}
            md={8}
          >
            © 2023 Zweidevs. All Rights Reserved.
          </Grid>

          <Grid style={{ justifyContent: "end", display: "flex" }} item md={2}>
            <Image
              src={CopyrightRightLine}
              alt={"copyright-right-line"}
            ></Image>
          </Grid>
        </Grid>

        {/* mobile view */}
        <Grid
          sx={{
            display: {
              xs: "flex",
              sm: "flex",
              md: "flex",
              lg: "none",
              xl: "none",
            },
          }}
          container
          spacing={0}
          style={{ marginBottom: 30, marginTop: 30 }}
        >
          <Grid
            style={{
              justifyContent: "start",
              display: "flex",
              paddingInline: 20,
            }}
            item
            xs={1}
          >
            <Image
              style={{ objectFit: "contain", maxWidth: 200 }}
              src={CopyrightLeftLine}
              alt={"copy-right-left-line"}
            ></Image>
          </Grid>

          <Grid
            style={{ justifyContent: "center", display: "flex" }}
            item
            //xs={8}
            md={10}
          >
            © 2023 Zweidevs. All Rights Reserved.
          </Grid>

          <Grid style={{ justifyContent: "end", display: "flex" }} item xs={1}>
            <Image
              style={{ objectFit: "contain", maxWidth: 200 }}
              src={CopyrightRightLine}
              alt={"copyright-right-line"}
            ></Image>
          </Grid>
        </Grid>
      </div>
    </>
  );

  const displayMobile = () => (
    <>
      <div className={styles.footerContainer}>
        <Image src={ZweidevsLogo} alt="zweidevs" width={200} />
        <div className={styles.footerContentContainerMobile}>
          <div className={styles.socialIconContainerMobile}>
            <a
              href="https://www.facebook.com/zweidevs"
              title="Follow us on Facebook."
            >
              <Image src={FbLogo} alt="zweidevs facebook" width={30} />
            </a>
            <a
              href="https://www.instagram.com/zweidevs.official"
              title="Follow us on Instagram."
            >
              <Image src={InstaLogo} alt="zweidevs instagram" width={30} />
            </a>
            <a href="#" title="Follow us on Twitter.">
              <Image src={TwitterLogo} alt="zweidevs twitter" width={30} />
            </a>
            <a
              href="https://www.linkedin.com/company/zweidevs/"
              title="Connect with us on LinkedIn."
            >
              <Image src={LinkedInLogo} alt="zweidevs linkedIn" width={30} />
            </a>
          </div>
          <div className={styles.pagesMobile}>
            {navLinks.map(({ href, text }, index) => {
              if (index === 0) {
                return null;
              }
              return (
                <Link
                  key={href}
                  href={href}
                  className={styles.pageLabelMobile}
                  style={{ textAlign: index % 2 === 0 ? "right" : "left" }}
                >
                  {text}
                </Link>
              );
            })}
          </div>
          <div className={styles.contactEmailContainerMobile}>
            <span className={styles.inputLabelMobile}>LET'S WORK TOGETHER</span>
            <div
              className={`${styles.inputContainerMobile} ${
                invalidEmail ? styles.emailError : ""
              }`}
            >
              <input
                placeholder="Enter Email"
                className={styles.inputField}
                value={email}
                onChange={handleOnChangeEmail}
              />
              <button
                className={styles.emailButton}
                onClick={handleEmailButton}
              >
                <ArrowRightAltIcon style={{ color: "#2b2a35" }} />
              </button>
            </div>
            {!isValidEmail(email) && email !== "" && (
              <span className={styles.emailErrorMessageMobile}>
                Invalid Email.
              </span>
            )}
          </div>
        </div>
      </div>
      {/* mobile view */}
      {/* <Grid
        sx={{
          display: {
            xs: "flex",
            sm: "flex",
            md: "flex",
            lg: "none",
            xl: "none",
          },
        }}
        container
        spacing={0}
        style={{ marginBottom: 30, marginTop: 30 }}
      >
        <Grid
          style={{
            justifyContent: "start",
            display: "flex",
            paddingInline: 20,
          }}
          item
          xs={1}
        >
          <Image
            style={{ objectFit: "contain", maxWidth: 200 }}
            src={CopyrightLeftLine}
          ></Image>
        </Grid>

        <Grid
          style={{ justifyContent: "center", display: "flex" }}
          item
          //xs={8}
          md={10}
        >
          © 2023 Zweidevs. All Rights Reserved.
        </Grid>

        <Grid style={{ justifyContent: "end", display: "flex" }} item xs={1}>
          <Image
            style={{ objectFit: "contain", maxWidth: 200 }}
            src={CopyrightRightLine}
          ></Image>
        </Grid>
      </Grid> */}
    </>
  );
  return (
    <>
      {mobileView === null ? null : mobileView ? displayMobile() : displayWeb()}
    </>
  );
}

export default Footer;
