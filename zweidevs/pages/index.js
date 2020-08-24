import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import ServiceCard from '../components/serviceCard'
import Feeback from '../components/feedback'
import Button from '../components/button'
import LogoCard from '../components/logoCard'
import {services, clients} from '../constant/data';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Zweidews | Home</title>
        <link rel="icon" href="/favicon-dark.ico" />
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous" />
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-B4gt1jrGC7Jh4AgTPSdUtOBvfO8shuf57BaghqFfPlYxofvL8/KUEfYiJOMMV+rV" crossorigin="anonymous"></script>
      </Head>
      <Navbar />

      <div className={styles.content_area}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12 col-12">
              <main id="main" className={styles.site_main}>
                <section>
                  <img className={styles.animated_shape} src="/layout.png" alt="svg"/>
                </section>
                <section className={styles.intro}>
                  <div className={styles.intro_img}>
                    <img src="/version-control-animate.svg" alt="main-illustration"/>
                  </div>
                  <div className={styles.intro_desc}>
                    <h1>
                      Empowering the Innovations.
                    </h1>
                    <p>Zweidevs provides dedicated remote teams that work closely with you to design and build your idea.</p>
                  </div>
                </section>
                <section className={styles.services}>
                  <img src="/element1.svg" alt="" />
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h2>Our Services</h2>
                        <p className={styles.service_desc}>We offer complete product development solutions, that fit your product's unique requirements.</p>
                      </div>
                      {
                        services.map((value,index)=>{
                          return (
                            <div className="col-md-6 col-lg-4">
                              <ServiceCard 
                                title={value.title} 
                                icon={value.icon}
                                icon_desc={value.icon_desc}
                                desc={value.desc}
                              />
                            </div>
                          )
                        })
                      }
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
                        <p>Zweidevs is a service-oriented company providing creative and innovative solutions for your business domain. We believe in exceeding your expectations by delivering thoughtfully innovated eye-catching products on your desk. We take a pride in engineering your requirements into robust software using our mobile, web, cloud and e-commerce capabilities.</p>
                        <Button text="Discover More" type="button" />
                      </div>
                    </div>
                  </div>
                </section>
                <section className={styles.projects_gallery}>
                  <div className="container">
                    <div className="row">
                      <div className="col-md-12">
                        <h2>Project Gallery</h2>
                        <p className={styles.project_desc}>Lorem Ipsum is simply dummy text of the printing and typesetting has been the industrys standard dummy text ever since</p>
                      </div>
                      <div className={`col-md-4 col-sm-6 col-xs-12 ${styles.project_item}`}>
                        <a href="https://www.shineriteco.com/"> 
                          <img src="/new 2.png" width="100%" alt="" />
                          <div className={styles.project_details}>
                            <div className={styles.project_info}>
                              <h2>ShineRite</h2>
                              <p>React | Angular | Node</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className={`col-md-4 col-sm-6 col-xs-12 ${styles.project_item}`}>
                        <a href="https://www.shineriteco.com/"> 
                          <img src="/new 3.png" width="100%" alt="" />
                          <div className={styles.project_details}>
                            <div className={styles.project_info}>
                              <h2>ShineRite</h2>
                              <p>React | Angular | Node</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className={`col-md-4 col-sm-6 col-xs-12 ${styles.project_item}`}>
                        <a href="https://www.shineriteco.com/"> 
                          <img src="/new 4.png" width="100%" alt="" />
                          <div className={styles.project_details}>
                            <div className={styles.project_info}>
                              <h2>ShineRite</h2>
                              <p>React | Angular | Node</p>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className={`col-md-4 col-sm-6 col-xs-12 ${styles.project_item}`}>
                        <a href="https://www.shineriteco.com/"> 
                          <img src="/new 5.png" width="100%" alt="" />
                          <div className={styles.project_details}>
                            <div className={styles.project_info}>
                              <h2>ShineRite</h2>
                              <p>React | Angular | Node</p>
                            </div>
                          </div>
                        </a>
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
                      <div className="col-md-12">
                        <div id="carouselExampleControls" className={`carousel slide ${styles.carousel_controls}`} data-ride="carousel">
                          <div className="carousel-inner">
                            <div className="carousel-item active">
                              <div className="row">
                                <div className="col-md-6">
                                  <Feeback name="Robert Bruce" />
                                </div>
                                <div className="col-md-6">
                                  <Feeback name="John Doe" />
                                </div>
                              </div>
                            </div>
                            <div className="carousel-item">
                              <div className="row">
                                <div className="col-md-6">
                                  <Feeback name="Robert Bruce_2" />
                                </div>
                                <div className="col-md-6">
                                  <Feeback name="John Doe" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <a className={styles.carousel_control_prev} href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className={styles.carousel_control_prev_icon} aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                          </a>
                          <a className={styles.carousel_control_next} href="#carouselExampleControls" role="button" data-slide="next">
                            <span className={styles.carousel_control_next_icon} aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <section className={styles.clients}>
                  <div className="container">
                    <div className="row">
                      {
                        clients.map((value,index)=>{
                          return (
                            <div className="col-md-3">
                              <LogoCard logo={value.logo} />
                            </div>
                          );
                        })
                      }
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
                                <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" defaultValue="0">
                                  <option value="0">Choose...</option>
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
                                <textarea name="textarea-652" cols="40" rows="5" className={styles.form_control} aria-invalid="false" placeholder="Message"></textarea>
                              </div>
                            </div>
                          </div>
                          <Button text="Submit Now" type="button" />
                        </form>
                      </div>
                      <div className="col-md-6">
                        <img src="/get-in-touch-animate.svg" alt="illustration"/>
                      </div>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </div>
        </div>
      </div>

      <a href="#" className={styles.scrollToTop}>
        <img src="/angle.svg" alt="scroll up icon" />
      </a>
      <Footer />
    </div>
  )
}
