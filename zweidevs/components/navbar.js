import Link from 'next/link';
import NavbarItems from './navbarItems';
import { useEffect, useState } from 'react'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
    const [scroll, setScroll] = useState(1);
    const [navlist_toggle, setNavlist_toogle] = useState(false);

    useEffect(() => {
        document.addEventListener("scroll", () => {
          const scrollCheck = window.scrollY < 100
          if (scrollCheck !== scroll) {
            setScroll(scrollCheck)
          }
        })
    })


    return(
        <header className={styles.site_header}>
            <div className={`${styles.header_area} ${styles.header_fixed}`}>
            {scroll == true ? 
                (<div className={styles.fixed_menu} id="sticker">
                    <NavbarItems click_toggle={(display)=>setNavlist_toogle(display)} nav_toggle={navlist_toggle} />
                </div> ) :
                
                ( <div className={styles.sticky_menu}>
                    <NavbarItems sticky_nav={true} click_toggle={(display)=>setNavlist_toogle(display)} nav_toggle={navlist_toggle} />
                </div> ) 
            }
            </div>
            { navlist_toggle ? (<nav className={styles.mobile_nav_list} id="mobile_nav">
                    <ul className={styles.mobile_menu}>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#">Home</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#">Services</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#">Portfolio</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#">Pages</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#">Blog</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="https://radiustheme.com/demo/wordpress/themes/digeco/contact/">Contact</a>
                        </li>
                    </ul>
                </nav>) : null
            }
            
        </header>
    );
}

export default Navbar;