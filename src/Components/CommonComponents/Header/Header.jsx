import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import navLinks from '@component/Constants/navLinks';
import { ZweidevsLogo } from '@component/assets';
import styles from "./header.module.css"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import Zbutton from '../ZButton';


function Header() {
    const route = useRouter();
    const [state, setState] = useState({
        mobileView: null,
        drawerOpen: false,
    });
    const { mobileView, drawerOpen } = state;

    const toggleDrawer = () => {
        setState((prevState) => ({ ...prevState, drawerOpen: !prevState.drawerOpen }))
    }

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
        const handleScroll = (event) => !drawerOpen &&
            setState((prevState) => ({ ...prevState, drawerOpen: false }))
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const displayWeb = () => (
        <div className={styles.headerContainer} >
            <Image src={ZweidevsLogo} width={180} alt="zweidevs logo" />
            <div className={styles.contentContainer} >
                <div className={styles.pagesContainer} >
                    {navLinks.map(({ href, text }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`${styles.pageLabel} ${route.pathname === href ? styles.activePage : ""}`}
                        >
                            {text}
                        </Link>
                    ))}
                </div>
                <Zbutton
                    text="INSTANT BOOKING"
                    width="170px"
                    color="white"
                    backgroundColor='#ff9700'
                    showIcon={false}
                    whiteShaddow={true}
                />
            </div>
        </div>
    )

    const displayMobile = () => (
        <>
            <div className={styles.headerContainer} style={mobileView && { padding: "3%" }} >
                <Image src={ZweidevsLogo} width={180} alt="zweidevs logo" />
                <Button style={{ color: "white" }} onClick={toggleDrawer} > {drawerOpen ? <CloseIcon /> : <MenuIcon />}</Button>
            </div >
            {drawerOpen &&
                <div className={styles.mobileHeaderMenu} >
                    {navLinks.map(({ href, text }) => (
                        <Link
                            onClick={toggleDrawer}
                            key={href}
                            href={href}
                            className={`${styles.mobileHeaderMenuItem} ${route.pathname === href ? styles.activePage : ''}`}
                            style={{ fontFamily: "Poppins" }}
                        >
                            {text}
                        </Link>
                    ))}
                </div>
            }
        </>

    )
    return (
        <>
            <Head>
                <title>Zweidevs</title>
                {/* <meta name={metaName} content={metaContent} /> */}
                <meta name="description" content="Zweidevs is a service-oriented company providing creative and innovative solutions for your business domain.we create a strategy." />
                <meta name="keywords" content="software development, web design, custom software, startups, businesses, blockchain, block chain, devOps, ui/ux designer, web development, app development, nft, metaverse, defi" />
                <meta name="author" content="Zweidevs" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {
                mobileView === null
                    ? null
                    :
                    mobileView ? displayMobile() : displayWeb()

            }
        </>

    )
}

export default Header;
