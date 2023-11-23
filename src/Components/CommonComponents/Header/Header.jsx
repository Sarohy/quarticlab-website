import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
const Button = dynamic(() => import("@mui/material/Button"));
import { useRouter } from "next/router";
import navLinks from "@component/Constants/navLinks";
const MenuIcon = dynamic(() => import("@mui/icons-material/Menu"));
const CloseIcon = dynamic(() => import("@mui/icons-material/Close"));
import ZweidevsLogo from "../../../../public/assets/headerIcons/logoWithText.svg";
import styles from "./header.module.css";
function Header() {
  const route = useRouter();
  const pathSegments = route.pathname.split("/");
  const pathInitialSegment = "/" + pathSegments[1];

  const [state, setState] = useState({
    mobileView: null,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  const toggleDrawer = () => {
    setState(prevState => ({
      ...prevState,
      drawerOpen: !prevState.drawerOpen,
    }));
  };

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState(prevState => ({ ...prevState, mobileView: true }))
        : setState(prevState => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  useEffect(() => {
    const handleScroll = () =>
      !drawerOpen &&
      setState(prevState => ({ ...prevState, drawerOpen: false }));
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const displayWeb = () => (
    <>
      <div className={styles.headerContainer}>
        <Link href={"/"}>
          <Image
            alt="Zweidevs | Custome Software Development Services Company"
            className="animate__animated animate__slideInLeft"
            src={ZweidevsLogo}
            title="Zweidevs | Custome Software Development Services Company"
            width={180}
          />
        </Link>
        <div className={styles.contentContainer}>
          <div
            className={`${styles.pagesContainer} animate__animated animate__slideInRight`}
          >
            {navLinks.map(({ href, text }) => (
              <Link
                className={`${styles.pageLabel} ${
                  pathInitialSegment === href ? styles.activePage : ""
                }`}
                href={href}
                key={href}
              >
                {text}
              </Link>
            ))}
          </div>
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
        <Image alt="zweidevsDrawer" src={ZweidevsLogo} width={180} />
        <Button className={styles.ButtonStyle} onClick={toggleDrawer}>
          {" "}
          {drawerOpen ? <CloseIcon /> : <MenuIcon />}
        </Button>
      </div>
      {drawerOpen && (
        <div className={styles.mobileHeaderMenu}>
          {navLinks.map(({ href, text }) => (
            <Link
              className={`${styles.mobileHeaderMenuItem} ${
                styles.LinkFontStyle
              } ${route.pathname === href ? styles.activePage : ""}`}
              href={href}
              key={href}
              onClick={toggleDrawer}
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
          content="Zweidevs is a service-oriented company providing creative and innovative solutions for your business domain.we create a strategy."
          name="description"
        />
        <meta
          content="software development, web design, custom software, startups, businesses, blockchain, block chain, devOps, ui/ux designer, web development, app development, nft, metaverse, defi"
          name="keywords"
        />
        <meta content="Zweidevs" name="author" />
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="index, follow" name="robots" />
        <meta content="index, follow" name="googlebot" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      {mobileView === null ? null : mobileView ? displayMobile() : displayWeb()}
    </>
  );
}

export default Header;
