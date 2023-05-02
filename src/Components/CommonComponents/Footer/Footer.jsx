import React, { useEffect, useState } from "react";
import styles from "./footer.module.css";
import Image from "next/image";
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
} from "@component/assets/footerIcons";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { isValidEmail } from "@component/utils/helpers";
import navLinks from "@component/Constants/navLinks";
import Link from "next/link";
import { Grid } from "@mui/material";
import FooterForm from "./FooterForm";
import FooterLinks from "./FooterLinks";

function Footer() {
  const [state, setState] = useState({
    email: "",
    invalidEmail: false,
    mobileView: null,
  });
  const { email, invalidEmail, mobileView } = state;

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

  const displayWeb = () => (
    <>
      <div className={styles.footerContainer}>
        <div className={styles.footerContentContainer}>
          {/* footer sub-section-1 */}
          <div>
            <Image src={ZweidevsLogo} alt="zweidevs" width={200} />
            <div className={styles.footerAboutZweidevs}>
              {`
              Zweidevs provides dedicated \n
              remote teams that work closely with \n
              you to design and build your idea.
              `}
            </div>
            <div className={styles.footerSocialContainer}>
              <a href="https://www.facebook.com/zweidevs">
                <Image
                  src={FbLogo}
                  alt="zweidevs facebook"
                  style={{
                    marginRight: 20,
                  }}
                  width={40}
                  height={40}
                />
              </a>
              <a href="https://www.instagram.com/zweidevs.official">
                <Image
                  src={InstaLogo}
                  alt="zweidevs instagram"
                  style={{
                    marginRight: 20,
                  }}
                  width={40}
                  height={40}
                />
              </a>
              <a href="#">
                <Image
                  src={TwitterLogo}
                  alt="zweidevs twitter"
                  style={{
                    marginRight: 20,
                  }}
                  width={40}
                  height={40}
                />
              </a>
              <a href="https://www.linkedin.com/company/zweidevs/">
                <Image
                  src={LinkedInLogo}
                  alt="zweidevs linkedIn"
                  style={{
                    marginRight: 20,
                  }}
                  width={40}
                  height={40}
                />
              </a>
            </div>
          </div>
          {/* <div className={styles.pages}>
            <div>What we do</div>
            <div>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2 }}
              >
                {navLinks.map(({ href, text }, index) => {
                  if (index === 0) {
                    return null;
                  }
                  return (
                    <Link key={href} href={href} className={styles.pageLabel}>
                      {text}
                    </Link>
                  );
                })}
              </Grid>
            </div>
          </div> */}
          <FooterLinks />
          <FooterForm />
          {/* <div className={styles.contactEmailContainer}>
            <span className={styles.inputLabel}>
              We Will Call You Right Back
            </span>
            <div
              className={`${styles.inputContainer} ${
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
                <ArrowRightAltIcon />
              </button>
            </div>
            {!isValidEmail(email) && email !== "" && (
              <span className={styles.emailErrorMessage}>Invalid Email.</span>
            )}
          </div> */}
        </div>
      </div>
      <footer className={styles.footerTextContainer}>
        <span>© 2023 Zweidevs. All Rights Reserved by Zweidevs</span>
      </footer>
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
                <ArrowRightAltIcon style={{ color: "white" }} />
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
      <footer className={styles.footerTextContainer}>
        <span>© 2023 Zweidevs. All Rights Reserved by Zweidevs</span>
      </footer>
    </>
  );
  return (
    <>
      {mobileView === null ? null : mobileView ? displayMobile() : displayWeb()}
    </>
  );
}

export default Footer;
