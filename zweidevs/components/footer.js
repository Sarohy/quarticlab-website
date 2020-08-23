import Link from 'next/link';
import styles from '../styles/Footer.module.css'

const Footer = () => {
    return(
        <footer>
            <div className={styles.footer_area}>
                <div className={styles.footer_top_area}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-sm-6 col-12">
                                <div className={`${styles.widget} ${styles.widget_media_image}`}>
                                    <img className={styles.logo} src="/logo-dark.svg" alt="company logo" />
                                </div>
                                <div className={`${styles.widget} ${styles.widget_digeco_address}`}>
                                    <ul className={styles.corporate_address}>
                                        <li>
                                            <img src="/pin.svg" alt="locattion" className={styles.footer_icon} />
                                            <a href="#">113 Sassnex, White House, USA</a>
                                        </li>
                                        <li>
                                        <img src="/phone.svg" alt="phone number" className={styles.footer_icon} />
                                            <a href="tel:+001-548-159-2491">+001-548-159-2491</a>
                                        </li>
                                        <li>
                                        <img src="/plane.svg" alt="email address" className={styles.footer_icon} />
                                            <a href="mailto:info@yourdomain.com">info@yourdomain.com</a>
                                        </li>
                                    </ul>
                                </div>
                                <div className={`${styles.widget} ${styles.rt_footer_social_widget}`}>
                                    <div>
                                        <ul className={styles.footer_social}>
                                            <li><a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#" target="_blank"><i className="fab fa-twitter"></i></a></li>
                                            <li><a href="#" target="_blank"><i className="fab fa-google-plus-g"></i></a></li>
                                            <li><a href="#" target="_blank"><i className="fab fa-pinterest-p"></i></a></li>
                                            <li><a href="#" target="_blank"><i className="fab fa-youtube"></i></a></li>
                                            <li><a href="#" target="_blank"><i className="fab fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-lg-3 col-sm-6 col-12">
                                <div className={`${styles.widget} ${styles.widget_nav_menu}`}>
                                    <h3 className={styles.widget_title}>Our Services</h3>
                                    <div>
                                        <ul className={styles.menu}>
                                            <li className={styles.menu_item}>
                                                <a href="#">Interface Design</a>
                                            </li>
                                            <li className={styles.menu_item}>
                                                <a href="#">Seo Optimizer</a>
                                            </li>
                                            <li className={styles.menu_item}>
                                                <a href="#">Digital Marketing</a>
                                            </li>
                                            <li className={styles.menu_item}>
                                                <a href="#">Market Monitor</a>
                                            </li>
                                            <li className={styles.menu_item}>
                                                <a href="#">Graphic Design</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div> */}
                            <div className="col-lg-4 col-sm-6 col-12 text-center">
                                <div className={`${styles.widget} ${styles.widget_nav_menu}`}>
                                    <h3 className={styles.widget_title}>Important Link</h3>
                                    <div>
                                        <ul className={styles.menu}>
                                            <li className={styles.menu_item}>
                                                <a href="https://radiustheme.com/demo/wordpress/themes/digeco/about-us/">About Us</a>
                                            </li>
                                            <li className={styles.menu_item}>
                                                <a href="#">How to work</a>
                                            </li>
                                            <li className={styles.menu_item}>
                                                <a href="#">Privacy Policy</a>
                                            </li>
                                            <li className={styles.menu_item}>
                                                <a href="#">Our Media</a>
                                            </li>
                                            <li className={styles.menu_item}>
                                                <a href="#">Contact Us</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-12 col-12 text-center">
                                <div className={`${styles.widget} ${styles.widget_social_links}`}>
                                    <h3 className={styles.widget_title}>Social Links</h3>
                                    <div className={styles.links}>
                                        <a href="#">
                                            <img src="/facebook.svg" alt="Zweidevs-facebook Page" />
                                        </a>
                                        <a href="#">
                                            <img src="/twitter.svg" alt="Zweidevs-twitter Page" />
                                        </a>
                                        <a href="#">
                                            <img src="/instagram.svg" alt="Zweidevs-instagram Page" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footer_bottom_area}>
                    <div className="container">
                        <div className={styles.copyright_wrap}>
                        <div className={styles.copyright}>© 2020 Zweidevs. All Rights Reserved by <a target="_blank" rel="nofollow" href="#">Zweidevs</a></div>
                        <div className={styles.copyright_widget}>
                            <div className={`${styles.widget} ${styles.widget_nav_menu}`}>
                                <div>
                                    <ul className={styles.menu}>
                                        <li className={styles.menu_item}><a className={styles.menu_item_link} href="#">Home</a></li>
                                        <li className={styles.menu_item}><a className={styles.menu_item_link} href="#">About Us</a></li>
                                        <li className={styles.menu_item}><a className={styles.menu_item_link} href="#">Services</a></li>
                                        <li className={styles.menu_item}><a className={styles.menu_item_link} href="#">Portfolios</a></li>
                                        <li className={styles.menu_item}><a className={styles.menu_item_link} href="#/">Blogs</a></li>
                                        <li className={styles.menu_item}><a className={styles.menu_item_link} href="#/">Contact</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;