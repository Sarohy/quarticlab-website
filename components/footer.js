import Link from "next/link";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer_area}>
        <div className={styles.footer_top_area}>
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-sm-12 col-12 align-self-center">
                <div
                  className={`${styles.widget} ${styles.widget_media_image}`}
                >
                  <img
                    className={styles.logo}
                    src="/logo-dark.png"
                    alt="company logo"
                  />
                </div>
              </div>


              <div className="col-lg-3 col-sm-12 col-12">
                <div className={`${styles.widget} ${styles.widget_direct_links}`}>
                  <h3 className={styles.widget_title}>Important Links</h3>
                    <div className={styles.links}>
                      <div>
                        <ul className={styles.menu}>
                          <li className={styles.menu_item}>
                            <a className={styles.menu_item_link} href="#home">
                              Home
                            </a>
                          </li>
                          <li className={styles.menu_item}>
                            <a className={styles.menu_item_link} href="#services">
                              Services
                            </a>
                          </li>
                          <li className={styles.menu_item}>
                            <a className={styles.menu_item_link} href="#about_us">
                              About Us
                            </a>
                          </li>
                          <li className={styles.menu_item}>
                            <a className={styles.menu_item_link} href="#projects">
                              Projects
                            </a>
                          </li>
                          <li className={styles.menu_item}>
                            <a className={styles.menu_item_link} href="#feeback">
                              Feeback
                            </a>
                          </li>
                          {/* <li className={styles.menu_item}>
                            <a className={styles.menu_item_link} href="#clients">
                              Clients
                            </a>
                          </li> */}
                        </ul>
                      </div>
                    </div>
                </div>
              </div>


              <div className="col-lg-4 col-sm-12 col-12">
                <div
                  className={`${styles.widget} ${styles.widget_digeco_address}`}
                >
                  <h3 className={styles.widget_title}>Our Location</h3>
                  <ul className={styles.corporate_address}>
                    <li><h4>United States Office</h4></li>
                    <li>
                      <img
                        src="/pin.svg"
                        alt="locattion"
                        className={styles.footer_icon}
                      />
                      <a href="#">168 W. Main Street New Market<span> MD 21774, US</span></a>
                    </li>
                    <li className={styles.contact_numbers}>
                      <img
                        src="/phone.svg"
                        alt="phone number"
                        className={styles.footer_icon}
                      />
                      <a href="tel:+1202-630-0593">+1 202-630-0593</a>
                    </li>


                    <li><h4>Lahore Office</h4></li>
                    <li>
                      <img
                        src="/pin.svg"
                        alt="locattion"
                        className={styles.footer_icon}
                      />
                      <a href="#">3-AA, Phase 4, DHA, Lahore</a>
                    </li>
                    <li className={styles.contact_numbers}>
                      <img
                        src="/phone.svg"
                        alt="phone number"
                        className={styles.footer_icon}
                      />
                      <a href="tel:+923351094915">+923351094915 | +923060228518</a>
                    </li>
                    <li>
                      <img
                        src="/plane.svg"
                        alt="email address"
                        className={styles.footer_icon}
                      />
                      <a href="mailto:info@yourdomain.com">
                        contact@zweidevs.com
                      </a>
                    </li>
                  </ul>
                </div>
                <div
                  className={`${styles.widget} ${styles.rt_footer_social_widget}`}
                >
                  <div>
                    <ul className={styles.footer_social}>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-google-plus-g"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-pinterest-p"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-youtube"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="_blank">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
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
              

              <div className="col-lg-2 col-sm-12 col-12 text-center">
                <div
                  className={`${styles.widget} ${styles.widget_social_links}`}
                >
                  <h3 className={styles.widget_title}>Social Links</h3>
                  <div className={styles.links}>
                    <a href="https://www.facebook.com/zweidevs" target="_blank">
                      <img src="/facebook.svg" alt="Zweidevs-facebook Page" />
                    </a>
                    <a href="https://www.linkedin.com/company/zweidevs/" target="_blank">
                      <img src="/linkedin.svg" alt="Zweidevs-linkedin Page" />
                    </a>
                    <a href="https://www.instagram.com/zweidevs/" target="_blank">
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
            <div className={`${styles.copyright_wrap}`}>
              <div className={styles.copyright}>
                © 2020 Zweidevs. All Rights Reserved by{" "}
                <a target="_blank" rel="nofollow" href="#">
                  Zweidevs
                </a>
              </div>
              {/* <div className={styles.copyright_widget}>
                <div className={`${styles.widget} ${styles.widget_nav_menu}`}>
                  <div>
                    <ul className={styles.menu}>
                      <li className={styles.menu_item}>
                        <a className={styles.menu_item_link} href="#home">
                          Home
                        </a>
                      </li>
                      <li className={styles.menu_item}>
                        <a className={styles.menu_item_link} href="#services">
                          Services
                        </a>
                      </li>
                      <li className={styles.menu_item}>
                        <a className={styles.menu_item_link} href="#about_us">
                          About Us
                        </a>
                      </li>
                      <li className={styles.menu_item}>
                        <a className={styles.menu_item_link} href="#projects">
                          Projects
                        </a>
                      </li>
                      <li className={styles.menu_item}>
                        <a className={styles.menu_item_link} href="#feeback">
                          Feeback
                        </a>
                      </li>
                      <li className={styles.menu_item}>
                        <a className={styles.menu_item_link} href="#clients">
                          Clients
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
