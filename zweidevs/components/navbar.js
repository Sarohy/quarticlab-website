import Link from 'next/link';
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    return(
        <header className={styles.site_header}>
            <div className={`${styles.header_area} ${styles.header_fixed}`}>
                <div className="masthead-container header-controll stickp" id="sticker">
                    <div className="container">
                        <div className={styles.menu_full_wrap}>
                            <div className={styles.site_branding}>
                                <a className={styles.logo} href="/">
                                    <img src="/logo.png" alt="Zweidevs" />
                                </a>
                            </div>
                            <div className={styles.menu_wrap}>
                                <div className={styles.main_navigation}>
                                <nav className="navbar navbar-expand-lg">>
                                    <div className="collapse navbar-collapse">
                                    <ul className={styles.menu}>
                                        <li className={styles.mega_menu}>
                                            <a href="#">Home</a>
                                            {/* <ul className={styles.sub_menu}>
                                                <li id="menu-item-2845" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-2845">
                                                    <a href="#">Column 02</a>
                                                    <ul className={styles.sub_menu}>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-140"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/">Technology</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-139"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/home-2/">Digital Marketing</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-130 current_page_item menu-item-138"><a href="index.html" aria-current="page">Startup Agency</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-137"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/home-4/">App Landing</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2850"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/home-5/">Digital Studio</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2915"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/home-6/">Digital Agency</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3004"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/home-7/">Saas Landing</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3172"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/home-8/">Social Marketing</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3171"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/home-9/">Software Landing</a></li>
                                                        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3170"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/home-10/">CRM Software</a></li>
                                                    </ul>
                                                </li>
                                            </ul> */}
                                        </li>
                                        <li className={styles.mega_menu}>
                                            <a href="#">Services</a>
                                            {/* <ul className="sub-menu">
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-343"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/service-grid-1/">Service – 01</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-342"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/service-grid-2/">Service – 02</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-341"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/service-grid-3/">Service – 03</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1591"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/services-01/">Services – 4 (info box)</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1590"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/services-02/">Services – 5 (info box)</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2916"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/info-box-6/">Services – 6 (info box)</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3015"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/info-box-7/">Services – 7 (info box)</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3165"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/info-box-8/">Services – 8 (info box)</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3164"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/info-box-9/">Services – 9 (info box)</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1638"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/service-details/">Service Details</a></li>
                                            </ul> */}
                                        </li>
                                        <li className={styles.mega_menu}>
                                            <a href="#">Portfolio</a>
                                            {/* <ul className="sub-menu">
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-267"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio-grid-2-column/">Grid 2 Column</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-266"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio-grid-3-column/">Grid 3 Column</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2911"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio-grid-3-col-layout-2/">Grid 3 Col Layout 2</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-265"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio-full-width-3-column/">Full Width 3 Column</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-264"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio-full-width-4-column/">Full Width 4 Column</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-263"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio-masonry-2-column/">Masonry 2 Column</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-262"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio-masonry-3-column/">Masonry 3 Column</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-261"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio-masonry-full-width-3-column/">Masonry Full Width 3 Column</a></li>
                                                <li className="menu-item menu-item-type-post_type menu-item-object-digeco_portfolio menu-item-273"><a href="https://radiustheme.com/demo/wordpress/themes/digeco/portfolio/from-print-to-platform-7/">Portfolio Details</a></li>
                                            </ul> */}
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
                                    </div>
                                </nav>
                                </div>
                            </div>
                            <div className={`${styles.menu_right_wrap} ${styles.header_icon_area}`}>
                                {/* <div className="header-search-box"> <a href="#header-search" title="Search"> <i className="flaticon-search"></i> </a></div> */}
                                <div className={styles.header_button_wrap}>
                                    <div className={styles.header_button}> 
                                        <a className={styles.button_btn} target="_self" href="#">Get A Quote</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;