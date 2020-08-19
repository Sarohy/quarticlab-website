import Link from 'next/link';
import { useEffect, useState } from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    const [scroll, setScroll] = useState(1)

    // useEffect(() => {
    //     document.addEventListener("scroll", () => {
    //       const scrollCheck = window.scrollY < 100
    //       if (scrollCheck !== scroll) {
    //         setScroll(scrollCheck)
    //       }
    //     })
    // })

    return(
        <header className={styles.site_header}>
            <div className={`${styles.header_area} ${styles.header_fixed}`}>
            {scroll == true ? 
                (<div className={styles.fixed_menu} id="sticker">
                    <div className="container">
                        <div className={styles.menu_full_wrap}>
                            <div className={styles.site_branding}>
                                <a className={styles.logo} href="/">
                                    <img src="/logo.png" alt="Zweidevs" />
                                </a>
                            </div>
                            <div className={`d-none d-lg-block ${styles.menu_wrap}`}>
                                <div className={styles.main_navigation}>
                                    <nav>
                                        <ul className={styles.menu}>
                                            <li className={styles.mega_menu}>
                                                <a href="#">Home</a>
                                            </li>
                                            <li className={styles.mega_menu}>
                                                <a href="#">Services</a>
                                            </li>
                                            <li className={styles.mega_menu}>
                                                <a href="#">Portfolio</a>
                                            </li>
                                            <li className={styles.mega_menu}>
                                                <a href="#">Pages</a>
                                            </li>
                                            <li className={styles.mega_menu}>
                                                <a href="#">Blog</a>
                                            </li>
                                            <li className={styles.mega_menu}>
                                                <a href="https://radiustheme.com/demo/wordpress/themes/digeco/contact/">Contact</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className={`${styles.menu_right_wrap} ${styles.header_icon_area}`}>
                                <div className={styles.header_button_wrap}>
                                    <div className={styles.header_button}> 
                                        <a className={styles.button_btn} target="_self" href="#">Get A Quote</a>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className={`d-block d-lg-none ${styles.mini_menu}`}>
                                <span class="navigation__icon">&nbsp;</span>
                            </a>
                        </div>
                    </div>
                </div> ) :
                
                ( <div className={styles.sticky_menu}>
                    <div className="container">
                            <div className={styles.menu_full_wrap}>
                                <div className={styles.site_branding}>
                                    <a className={styles.logo} href="/">
                                        <img src="/logo.png" alt="Zweidevs" />
                                    </a>
                                </div>
                                <div className={styles.menu_wrap}>
                                    <div className={styles.main_navigation}>
                                        <nav>
                                            <ul className={styles.menu}>
                                                <li className={styles.mega_menu}>
                                                    <a href="#">Home</a>
                                                </li>
                                                <li className={styles.mega_menu}>
                                                    <a href="#">Services</a>
                                                </li>
                                                <li className={styles.mega_menu}>
                                                    <a href="#">Portfolio</a>
                                                </li>
                                                <li className={styles.mega_menu}>
                                                    <a href="#">Pages</a>
                                                </li>
                                                <li className={styles.mega_menu}>
                                                    <a href="#">Blog</a>
                                                </li>
                                                <li className={styles.mega_menu}>
                                                    <a href="https://radiustheme.com/demo/wordpress/themes/digeco/contact/">Contact</a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                                <div className={`${styles.menu_right_wrap} ${styles.header_icon_area}`}>
                                    <div className={styles.header_button_wrap}>
                                        <div className={styles.header_button}> 
                                            <a className={styles.button_btn} target="_self" href="#">Get A Quote</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div> ) 
            }
            </div>
        </header>
    );
}

export default Navbar;