import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import ServiceCard from '../components/serviceCard'
import Feeback from '../components/feedback'
import Button from '../components/button'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zweidews</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
      </Head>
      <Navbar />

      <div class={styles.content_area}>
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 col-12">
              <main id="main" class={styles.site_main}>
                <section>
                  <img className={styles.animated_shape} src="/layout.png" alt="svg"/>
                </section>
                <section className={styles.intro}>
                  <div className={styles.intro_img}>
                    <img src="/illustration.png" alt="main-illustration"/>
                  </div>
                  <div className={styles.intro_desc}>
                    <h1>
                      The Perfect Clean Design
                      <br />
                      Framework for Startup Your
                      <br />
                      Own Businesses
                    </h1>
                    <p>Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion the consectetur dumm ipsumm text dolocons. </p>
                  </div>
                </section>
                <section className={styles.services}>
                  <img src="/element1.svg" alt="" />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h2>Our Services</h2>
                        <p className={styles.service_desc}>Lorem Ipsum is simply dummy text of the printing and typesetting has been the industrys standard dummy text ever since</p>
                      </div>
                      <div className="col-md-4">
                        <ServiceCard />
                      </div>
                      <div className="col-md-4">
                        <ServiceCard />
                      </div>
                      <div className="col-md-4">
                        <ServiceCard />
                      </div>
                    </div>
                  </div>
                </section>
                <section className={styles.about_us}>
                  <img className={styles.about_media} src="/element2.svg" alt="" />
                  <div className="container">
                    <div className="row">
                      <div className={`col-md-6 offset-md-6 ${styles.about_desc}`}>
                        <span>About Us</span>
                        <h2>Work With Tried and True Digital Marketing Experts</h2>
                        <p>Grursus mal suada faci lisis Lorem ipsum dolarorit more a ametion to dummy about at consectetur elit. Vesti at bulum nec odioipsumm ipsum that dolocons rsus mal suada and fadolorit to the mo consectetur elit. Grursus mal suada faci lisis is Lorem ipsum is dolarorit the more a ametion consectetur elit. Vesti at bulum nec odio aea the and the dumm ipsumm ipsum that dolocons rsus mal suada and the fadolorit to the umm than consectetur elit. ipsumm ipsum that dolocons rsus mal suada and fadolorit rsus mal suada and fadolorit to the and consectetur dummy text her now elit.</p>
                        <Button />
                      </div>
                    </div>
                  </div>
                </section>
                <section className={styles.feedback}>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h2>Customers Feedback</h2>
                        <p className={styles.feedback_desc}>Lorem Ipsum is simply dummy text of the printing and typesetting has been the industrys standard dummy text ever since</p>
                      </div>
                      <div className="col-md-6">
                        <Feeback />
                      </div>
                      <div className="col-md-6">
                        <Feeback />
                      </div>
                    </div>
                  </div>
                </section>
                <section className={styles.project_numbers}>
                  <div className={styles.gradient}></div>
                  <div className="container">
                    <div className={`${styles.pn_box} row`}>
                      <div className="col-md-3 text-center">
                        <div className={styles.pn_icon}>
                          <img src="/projector.svg" alt="Projects"/>
                        </div>
                        <div className={styles.counter}>
                          <span>1175</span>
                        </div>
                        <div className={styles.pn_content}>
                          <h3 className={styles.content_title}>Projects Done</h3>
                        </div>
                      </div>

                      <div className="col-md-3  text-center">
                        <div className={styles.pn_icon}>
                          <img src="/smile.svg" alt="smile"/>
                        </div>
                        <div className={styles.counter}>
                          <span>844</span>
                        </div>
                        <div className={styles.pn_content}>
                          <h3 className={styles.content_title}>Happy Clients</h3>
                        </div>
                      </div>

                      <div className="col-md-3 text-center">
                        <div className={styles.pn_icon}>
                          <img src="/review.svg" alt="reviews"/>
                        </div>
                        <div className={styles.counter}>
                          <span>1240</span>
                        </div>
                        <div className={styles.pn_content}>
                          <h3 className={styles.content_title}>Ratings Customer</h3>
                        </div>
                      </div>

                      <div className="col-md-3 text-center">
                        <div className={styles.pn_icon}>
                          <img src="/trophy.svg" alt="trophy"/>
                        </div>
                        <div className={styles.counter}>
                          <span>87</span>
                        </div>
                        <div className={styles.pn_content}>
                          <h3 className={styles.content_title}>Award Winner</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className={styles.message}>
                  <img src="/element19.png" alt="element" className={styles.message_bg} />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <h2>How May We Help You!</h2>
                        <p>Grursus mal suada faci lisis Lorem ipsum consectetur elit. Grursus mal suada faci lisis Lorem ipsum consectetur elit.</p>
                        <form>
                          <div className="row">
                            <div className="col">
                              <div className={styles.form_group}>
                                <input type="text" className={styles.form_control} placeholder="First name" />
                              </div>
                            </div>
                            <div className="col">
                              <div className={styles.form_group}>
                                <input type="text" className={styles.form_control} placeholder="Last name" />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className={styles.form_group}>
                                <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                                  <option selected>Choose...</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <div className={styles.form_group}>
                                <textarea name="textarea-652" cols="40" rows="5" className={styles.form_control} aria-invalid="false" placeholder="Message" spellcheck="false"></textarea>
                              </div>
                            </div>
                          </div>
                          <Button />
                        </form>
                      </div>
                      <div className="col-md-6">
                        <img src="/illustration21.png" alt="illustration"/>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  )
}
