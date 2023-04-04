import React, { useEffect, useState } from 'react'
import styles from "./footer.module.css"
import Image from 'next/image'
import { ZweidevsLogo, FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@component/assets'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { isValidEmail } from '@component/utils/helpers';
import navLinks from '@component/Constants/navLinks';
import Link from 'next/link';

function Footer() {
    const [state, setState] = useState({
        email: "",
        invalidEmail: false,
        mobileView: null
    })
    const { email, invalidEmail, mobileView } = state;

    const handleOnChangeEmail = (event) => {
        const { value } = event.target
        setState((prevState) => ({ ...prevState, email: value }))
    }

    const handleEmailButton = () => {
        if (isValidEmail(email) && email !== "") {
            alert(`Email : ${email}`)
        } else {
            alert("Email not valid")
        }
    }

    useEffect(() => {
        isValidEmail(email) || email === ""
            ? setState({ ...state, invalidEmail: false })
            : setState({ ...state, invalidEmail: true })
    }, [email])

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

    const displayWeb = () =>
    (
        <>
            <div className={styles.footerContainer} >
                <Image src={ZweidevsLogo} alt="zweidevs-logo" width={200} />
                <div className={styles.footerContentContainer} >
                    <div className={styles.pages} >
                        {navLinks.map(({ href, text }, index) => {
                            if (index === 0) {
                                return null;
                            }
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={styles.pageLabel}
                                >
                                    {text}
                                </Link>
                            );
                        })}

                    </div>
                    <div className={styles.socialIconContainer} >
                        <a href='https://www.facebook.com/zweidevs'>
                            <Image src={FacebookIcon} alt="zweidevs facebook" width={30} />
                        </a>
                        <a href='https://www.instagram.com/zweidevs.official'>
                            <Image src={InstagramIcon} alt="zweidevs instagram" width={30} />
                        </a>
                        <a href='#'>
                            <Image src={TwitterIcon} alt="zweidevs twitter" width={30} />
                        </a>
                        <a href='https://www.linkedin.com/company/zweidevs/'>
                            <Image src={LinkedInIcon} alt="zweidevs linkedIn" width={30} />
                        </a>
                    </div>
                    <div className={styles.contactEmailContainer} >
                        <span className={styles.inputLabel} >LET'S WORK TOGETHER</span>
                        <div className={`${styles.inputContainer} ${invalidEmail ? styles.emailError : ""}`} >
                            <input placeholder='Enter Email' className={styles.inputField} value={email} onChange={handleOnChangeEmail} />
                            <button className={styles.emailButton} onClick={handleEmailButton} ><ArrowRightAltIcon /></button>
                        </div>
                        {!isValidEmail(email) && email !== "" &&
                            <span className={styles.emailErrorMessage} >
                                Invalid Email.
                            </span>
                        }
                    </div>
                </div>
            </div>
            <footer className={styles.footerTextContainer} >
                <span>© 2023 Zweidevs. All Rights Reserved by Zweidevs</span>
            </footer>
        </>
    )

    const displayMobile = () =>
    (
        <>
            <div className={styles.footerContainer} >
                <Image src={ZweidevsLogo} alt="zweidevs-logo" width={200} />
                <div className={styles.footerContentContainerMobile} >
                    <div className={styles.socialIconContainerMobile} >
                        <a href='https://www.facebook.com/zweidevs' title="Follow us on Facebook." >
                            <Image src={FacebookIcon} alt="zweidevs facebook" width={30} />
                        </a>
                        <a href='https://www.instagram.com/zweidevs.official' title="Follow us on Instagram." >
                            <Image src={InstagramIcon} alt="zweidevs instagram" width={30} />
                        </a>
                        <a href='#' title="Follow us on Twitter." >
                            <Image src={TwitterIcon} alt="zweidevs twitter" width={30} />
                        </a>
                        <a href='https://www.linkedin.com/company/zweidevs/' title='Connect with us on LinkedIn.'>
                            <Image src={LinkedInIcon} alt="zweidevs linkedIn" width={30} />
                        </a>
                    </div>
                    <div className={styles.pagesMobile} >
                        {navLinks.map(({ href, text }, index) => {
                            if (index === 0) {
                                return null;
                            }
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={styles.pageLabelMobile}
                                    style={{textAlign: index % 2 === 0 ? "right" : "left"}}
                                >
                                    {text}
                                </Link>
                            );
                        })}

                    </div>
                    <div className={styles.contactEmailContainerMobile} >
                        <span className={styles.inputLabelMobile} >LET'S WORK TOGETHER</span>
                        <div className={`${styles.inputContainerMobile} ${invalidEmail ? styles.emailError : ""}`} >
                            <input placeholder='Enter Email' className={styles.inputField} value={email} onChange={handleOnChangeEmail} />
                            <button className={styles.emailButton} onClick={handleEmailButton} ><ArrowRightAltIcon /></button>
                        </div>
                        {!isValidEmail(email) && email !== "" &&
                            <span className={styles.emailErrorMessage} >
                                Invalid Email.
                            </span>
                        }
                    </div>
                </div>
            </div>
            <footer className={styles.footerTextContainer} >
                <span>© 2023 Zweidevs. All Rights Reserved by Zweidevs</span>
            </footer>
        </>
    )
    return (
        <>
            {
                mobileView === null
                    ? null
                    :
                    mobileView ? displayMobile() : displayWeb()

            }
        </>
    )
}

export default Footer