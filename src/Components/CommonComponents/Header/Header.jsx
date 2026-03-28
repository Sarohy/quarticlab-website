import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import navLinks, {
  HEADER_CTA,
  SERVICE_DROPDOWN,
} from "@component/Constants/navLinks";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownTimeout = useRef(null);
  const dropdownRef = useRef(null);

  const { mobileView, drawerOpen } = state;

  const toggleDrawer = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      drawerOpen: !prevState.drawerOpen,
    }));
    setMobileServicesOpen(false);
  }, []);

  const openDropdown = useCallback(() => {
    if (dropdownTimeout.current) {
      clearTimeout(dropdownTimeout.current);
    }
    setDropdownOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    dropdownTimeout.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 200);
  }, []);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState(prevState => ({
            ...prevState,
            mobileView: true,
          }))
        : setState(prevState => ({
            ...prevState,
            mobileView: false,
          }));
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

  /* close dropdown on route change */
  useEffect(() => {
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  }, [route.asPath]);

  const isServicesActive =
    pathInitialSegment === "/services" || pathInitialSegment === "/ai-services";

  const displayWeb = () => (
    <header
      className={`${styles.headerContainer} ${scrolled ? styles.scrolled : ""}`}
    >
      <Link className={styles.logoLink} href={"/"}>
        <Image
          alt="Zweidevs | Custom Software Development"
          className={styles.headerLogo}
          height={40}
          src={ZweidevsLogo}
          width={160}
        />
      </Link>
      <nav className={`${styles.pagesContainer} ${styles.headerNav}`}>
        {navLinks.map(({ href, text, hasDropdown }) =>
          hasDropdown ? (
            <div
              className={styles.dropdownTrigger}
              key={href}
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
              ref={dropdownRef}
            >
              <Link
                className={`${styles.pageLabel} ${
                  isServicesActive ? styles.activePage : ""
                }`}
                href={href}
              >
                <span className={styles.pageLabelText}>{text}</span>
                <span
                  className={`${styles.chevron} ${
                    dropdownOpen ? styles.chevronUp : ""
                  }`}
                >
                  ▾
                </span>
              </Link>

              {/* ── Mega Dropdown ─── */}
              <div
                className={`${styles.megaDropdown} ${
                  dropdownOpen ? styles.megaDropdownOpen : ""
                }`}
              >
                <div className={styles.megaDropdownInner}>
                  {SERVICE_DROPDOWN.map(group => (
                    <div
                      className={styles.megaDropdownColumn}
                      key={group.label}
                    >
                      <span className={styles.megaGroupLabel}>
                        {group.label}
                      </span>
                      {group.items.map(item => (
                        <Link
                          className={`${styles.megaDropdownItem} ${
                            route.asPath === item.href
                              ? styles.megaItemActive
                              : ""
                          }`}
                          href={item.href}
                          key={item.href}
                        >
                          <span className={styles.megaItemEmoji}>
                            {item.emoji}
                          </span>
                          <div className={styles.megaItemContent}>
                            <span className={styles.megaItemTitle}>
                              {item.text}
                            </span>
                            <span className={styles.megaItemDesc}>
                              {item.desc}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}

                  {/* ── Dropdown footer ── */}
                  <div className={styles.megaDropdownFooter}>
                    <span className={styles.megaFooterText}>
                      Not sure which service fits?
                    </span>
                    <Link className={styles.megaFooterLink} href="/services">
                      View all services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              className={`${styles.pageLabel} ${
                pathInitialSegment === href ? styles.activePage : ""
              }`}
              href={href}
              key={href}
            >
              <span className={styles.pageLabelText}>{text}</span>
            </Link>
          ),
        )}
      </nav>

      {/* ── CTA with urgency pulse ── */}
      <a
        className={styles.ctaButton}
        href={HEADER_CTA.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className={styles.ctaPulse} />
        <span className={styles.ctaIcon}>⚡</span>
        <span className={styles.ctaLabel}>{HEADER_CTA.label}</span>
      </a>
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
          {navLinks.map(({ href, text, hasDropdown }, index) =>
            hasDropdown ? (
              <div className={styles.mobileAccordion} key={href}>
                <button
                  className={`${styles.mobileNavLink} ${
                    isServicesActive ? styles.activePage : ""
                  }`}
                  onClick={() => setMobileServicesOpen(prev => !prev)}
                  style={{
                    animationDelay: `${index * 0.06 + 0.1}s`,
                  }}
                  type="button"
                >
                  <span className={styles.mobileNavIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.mobileNavText}>{text}</span>
                  <span
                    className={`${styles.mobileChevron} ${
                      mobileServicesOpen ? styles.mobileChevronUp : ""
                    }`}
                  >
                    ▾
                  </span>
                </button>

                <div
                  className={`${styles.mobileAccordionPanel} ${
                    mobileServicesOpen ? styles.mobileAccordionOpen : ""
                  }`}
                >
                  <Link
                    className={styles.mobileSubLink}
                    href="/services"
                    onClick={toggleDrawer}
                  >
                    All Services
                  </Link>
                  {SERVICE_DROPDOWN.flatMap(group =>
                    group.items.map(item => (
                      <Link
                        className={`${styles.mobileSubLink} ${
                          route.asPath === item.href
                            ? styles.mobileSubLinkActive
                            : ""
                        }`}
                        href={item.href}
                        key={item.href}
                        onClick={toggleDrawer}
                      >
                        <span className={styles.mobileSubEmoji}>
                          {item.emoji}
                        </span>
                        {item.text}
                      </Link>
                    )),
                  )}
                </div>
              </div>
            ) : (
              <Link
                className={`${styles.mobileNavLink} ${
                  route.pathname === href ? styles.activePage : ""
                }`}
                href={href}
                key={href}
                onClick={toggleDrawer}
                style={{
                  animationDelay: `${index * 0.06 + 0.1}s`,
                }}
              >
                <span className={styles.mobileNavIndex}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.mobileNavText}>{text}</span>
              </Link>
            ),
          )}

          {/* ── Mobile CTA ── */}
          <a
            className={styles.mobileCtaButton}
            href={HEADER_CTA.href}
            onClick={toggleDrawer}
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className={styles.ctaIcon}>⚡</span>
            {HEADER_CTA.label}
          </a>
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
