import styles from '../styles/NavbarItems.module.css'

const NavbarItems = (props) => {
    return(
        <div className="container">
            <div className={`${styles.menu_full_wrap} ${props.sticky_nav ? styles.sticky_nav_list : ""}`}>
                <div className={styles.site_branding}>
                    <a className={styles.logo} href="/">
                        <img src="/logo.png" alt="Zweidevs" />
                    </a>
                </div>
                <div className={`d-none d-lg-block ${styles.menu_wrap}`}>
                    <div className={styles.main_navigation}>
                        <nav className={styles.nav_list}>
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
                {
                    props.nav_toggle == false ? (<div  className={`d-block d-lg-none ${styles.nav_toggler}`}>
                            <a className={styles.mini_menu} onClick={()=>{props.click_toggle(true)}}>
                                <span className="navigation__icon">&nbsp;</span>
                            </a>
                        </div>) : (<div  className={`d-block d-lg-none ${styles.nav_toggler} ${styles.cross}`}>
                            <a className={styles.mini_menu} onClick={()=>{props.click_toggle(false)}}>
                                <span className="navigation__icon">&nbsp;</span>
                            </a>
                        </div>)
                }

            </div>
        </div>
    );
}

export default NavbarItems;