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
                            <a href="#home">Home</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#services">Services</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#about_us">About Us</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#projects">Projects</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#feeback">feeback</a>
                        </li>
                        <li className={styles.mobile_mega_menu}>
                            <a href="#clients">Clients</a>
                        </li>
                    </ul>
                </nav>) : null
            }
            
        </header>
    );
}

export default Navbar;