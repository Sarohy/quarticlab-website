import { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import navLinks from "@component/Constants/navLinks";
import ZweidevsLogo from "../../../../public/assets/headerIcons/logoWithText.svg";
import styles from "./header.module.css";

function Header() {
  const route = useRouter();
  const pathSegments = route.pathname.split("/");
  const pathInitialSegment = "/" + pathSegments[1];

  const [scrolled, setScrolled] = useState(false);
  const [state, setState] = useState({
    mobileView: null,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;

  const toggleDrawer = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      drawerOpen: !prevState.drawerOpen,
    }));
  }, []);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState(prevState => ({ ...prevState, mobileView: true }))
        : setState(prevState => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", setResponsiveness);
    return () => {
      window.removeEventListener("resize", setResponsiveness);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const displayWeb = () => (
    <header
      className={`${styles.headerContainer} ${scrolled ? styles.scrolled : ""}`}
    >
      <Link className={styles.logoLink} href={"/"}>
        <Image
          alt="Zweidevs | Custom Software Development Services Company"
          className={styles.headerLogo}
          height={40}
          src={ZweidevsLogo}
          width={160}
        />
      </Link>
      <nav className={`${styles.pagesContainer} ${styles.headerNav}`}>
        {navLinks.map(({ href, text }) => (
          <Link
            className={`${styles.pageLabel} ${
              pathInitialSegment === href ? styles.activePage : ""
            }`}
            href={href}
            key={href}
          >
            <span className={styles.pageLabelText}>{text}</span>
          </Link>
        ))}
      </nav>
      <Link className={styles.ctaButton} href="/contactUs">
        {"Let's Talk"}
      </Link>
    </header>
  );

  const displayMobile = () => (
    <>
      <header
        className={`${styles.headerContainer} ${
          scrolled ? styles.scrolled : ""
        } ${styles.mobileHeader}`}
      >
        <Link className={styles.logoLink} href={"/"}>
          <Image
            alt="zweidevsDrawer"
            height={36}
            src={ZweidevsLogo}
            width={140}
          />
        </Link>
        <button
          aria-label={drawerOpen ? "Close menu" : "Open menu"}
          className={`${styles.hamburger} ${
            drawerOpen ? styles.hamburgerActive : ""
          }`}
          onClick={toggleDrawer}
          type="button"
        >
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
          <span className={styles.hamburgerLine} />
        </button>
      </header>

      <div
        className={`${styles.mobileOverlay} ${
          drawerOpen ? styles.mobileOverlayVisible : ""
        }`}
        onClick={toggleDrawer}
      />

      <nav
        className={`${styles.mobileDrawer} ${
          drawerOpen ? styles.mobileDrawerOpen : ""
        }`}
      >
        <div className={styles.mobileDrawerContent}>
          {navLinks.map(({ href, text }, index) => (
            <Link
              className={`${styles.mobileNavLink} ${
                route.pathname === href ? styles.activePage : ""
              }`}
              href={href}
              key={href}
              onClick={toggleDrawer}
              style={{ animationDelay: `${index * 0.06 + 0.1}s` }}
            >
              <span className={styles.mobileNavIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className={styles.mobileNavText}>{text}</span>
            </Link>
          ))}
          <Link
            className={styles.mobileCtaButton}
            href="/contactUs"
            onClick={toggleDrawer}
          >
            {"Let's Talk"}
          </Link>
        </div>
      </nav>
    </>
  );

  return (
    <>
      <Head>
        <title>Zweidevs</title>
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
