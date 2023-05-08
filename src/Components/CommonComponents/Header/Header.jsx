import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
// import Zbutton from "../ZButton";
import navLinks from "@component/Constants/navLinks";
// import { ZweidevsLogo } from "@component/assets";
import styles from "./header.module.css";
import {
  ZweidevsLogo,
  CalanderIcon,
  LocationIcon,
  InstantBooking,
  PhoneContainer,
} from "@component/assets/headerIcons";
function Header() {
  const route = useRouter();
  const [state, setState] = useState({
    mobileView: null,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  const toggleDrawer = () => {
    setState((prevState) => ({
      ...prevState,
      drawerOpen: !prevState.drawerOpen,
    }));
  };

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
    const handleScroll = (event) =>
      !drawerOpen &&
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const displayWeb = () => (
    <>
      <div
        style={{
          display: "flex",
          flexDiretion: "row",
          backgroundColor: "white",
          justifyContent: "space-between",
        }}
      >
        <div
          className="headerCenterRow"
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            height={20}
            width={20}
            src={LocationIcon}
            alt={"location-icon"}
          ></Image>
          <span style={{ paddingLeft: "11px" }}>
            6-B phase 1 Johar Town Lahore
          </span>
        </div>
        <div
          className={"headerCenterRow"}
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Image
            height={20}
            width={20}
            src={LocationIcon}
            alt={"location-icon"}
          ></Image>
          <span style={{ paddingLeft: "11px" }}>contact@zweidevs.com</span>
          <Image src={PhoneContainer}></Image>
          <Image src={InstantBooking}></Image>
        </div>
      </div>
      <hr style={{ border: "1px solid #E5E5E5" }}></hr>
      <div className={styles.headerContainer}>
        <Image src={ZweidevsLogo} width={180} alt="zweidevs" />
        <div className={styles.contentContainer}>
          <div className={styles.pagesContainer}>
            {navLinks.map(({ href, text }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.pageLabel} ${
                  route.pathname === href ? styles.activePage : ""
                }`}
              >
                {text}
              </Link>
            ))}
          </div>
          {/* <Zbutton
                    text="INSTANT BOOKING"
                    width="170px"
                    color="white"
                    backgroundColor='#ff9700'
                    showIcon={false}
                    whiteShaddow={true}
                /> */}
        </div>
      </div>
    </>
  );

  const displayMobile = () => (
    <>
      <div
        className={styles.headerContainer}
        style={mobileView && { padding: "3%" }}
      >
        <Image src={ZweidevsLogo} width={180} alt="zweidevs" />
        <Button style={{ color: "#ff9700" }} onClick={toggleDrawer}>
          {" "}
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
      </div>
      {drawerOpen && (
        <div className={styles.mobileHeaderMenu}>
          {navLinks.map(({ href, text }) => (
            <Link
              onClick={toggleDrawer}
              key={href}
              href={href}
              className={`${styles.mobileHeaderMenuItem} ${
                route.pathname === href ? styles.activePage : ""
              }`}
              style={{ fontFamily: "Poppins" }}
            >
              {text}
            </Link>
          ))}
        </div>
      )}
    </>
  );
  return (
    <>
      <Head>
        <title>Zweidevs</title>
        {/* <meta name={metaName} content={metaContent} /> */}
        <meta
          name="description"
          content="Zweidevs is a service-oriented company providing creative and innovative solutions for your business domain.we create a strategy."
        />
        <meta
          name="keywords"
          content="software development, web design, custom software, startups, businesses, blockchain, block chain, devOps, ui/ux designer, web development, app development, nft, metaverse, defi"
        />
        <meta name="author" content="Zweidevs" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {mobileView === null ? null : mobileView ? displayMobile() : displayWeb()}
    </>
  );
}

export default Header;
