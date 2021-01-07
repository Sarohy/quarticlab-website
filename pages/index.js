import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import ServiceCard from "../components/serviceCard";
import Feeback from "../components/feedback";
import Button from "../components/button";
import { services, projects } from "../constant/data";
import Layout from "../components/layout";
import { Snackbar, Box } from "@material-ui/core";
import { postAPI } from "./api/api";
import { emailFormatVerification } from "../functions/utils/helpers";
import Form from "react-bootstrap/Form";

export default function Home() {
  const [qouteData, setQouteData] = useState({
    name: "",
    email: "",
    phone_number: "",
    country: "",
    des: "",
  });
  const [open, setOpen] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const url = "/dev/contact";
  const handleSubmit = (e) => {
    e.preventDefault();
    postQoute();
  };

  const postQoute = async () => {
    try {
      setShowSpinner(true);
      setOpen(true);
      const res = await postAPI(url, {
        name: qouteData.name,
        email: qouteData.email,
        phone_number: qouteData.phone_number,
        country: qouteData.country,
        des: qouteData.des,
      });
      setShowSpinner(false);
      setOpen(false);
    } catch (error) {
      setOpen(false);
      setShowSpinner(false);
      console.log("This is the Error");
    }
  };
  const handleQuoteDataChange = (e) => {
    const { value, name } = e.target;
    setQouteData({
      ...qouteData,
      [name]: value,
    });
  };

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content_area}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-12 col-12">
                <main id="main" className={styles.site_main}>
                  <section>
                    <img
                      className={styles.animated_shape}
                      src="/layout.png"
                      alt="svg"
                    />
                  </section>
                  <section className={styles.intro} id="home">
                    <div className={styles.intro_img}>
                      <img
                        src="/version-control-animate.svg"
                        alt="main-illustration"
                      />
                    </div>
                    <div className={styles.intro_desc}>
                      <h1>Empowering the Innovations.</h1>
                      <p>
                        Zweidevs provides dedicated remote teams that work
                        closely with you to design and build your idea.
                      </p>
                      <div>
                        <Button
                          text="Instant Booking"
                          onClick={() =>
                            window.location.assign(
                              "https://calendly.com/zweidevs/get-quote"
                            )
                          }
                        />
                      </div>
                    </div>
                  </section>

                  <section className={styles.services} id="services">
                    <img src="/element1.svg" alt="" />
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <h2>Our Services</h2>
                          <p className={styles.service_desc}>
                            We offer complete product development solutions,
                            that fit your product's unique requirements.
                          </p>
                        </div>
                        {services.map((value) => {
                          return (
                            <div className="col-md-6 col-lg-4">
                              <ServiceCard
                                title={value.title}
                                icon={value.icon}
                                icon_desc={value.icon_desc}
                                desc={value.desc}
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                  <section className={styles.about_us} id="about_us">
                    <img
                      className={styles.about_media}
                      src="/element2.svg"
                      alt=""
                    />
                    <div className="container">
                      <div className="row">
                        <div
                          className={`col-md-6 offset-md-6 ${styles.about_desc}`}
                        >
                          <span>About Us</span>
                          <h2>
                            Work with top notch designers and developers to get
                            amazing products.
                          </h2>
                          <p>
                            Zweidevs is a service-oriented company providing
                            creative and innovative solutions for your business
                            domain. We believe in exceeding your expectations by
                            delivering thoughtfully innovated eye-catching
                            products on your desk. We take a pride in
                            engineering your requirements into robust software
                            using our mobile, web, cloud and e-commerce
                            capabilities.
                          </p>
                          {/* <Button text="Discover More" type="button" /> */}
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className={styles.projects_gallery} id="projects">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <h2>Project Gallery</h2>
                        </div>
                        {projects.map((value) => {
                          return (
                            <div
                              className={`col-md-4 col-sm-6 col-xs-12 ${styles.project_item}`}
                            >
                              <a href={value.link} target="_blank">
                                <img src={value.image} width="100%" alt="" />
                                <div className={styles.project_details}>
                                  <div className={styles.project_info}>
                                    <h2>{value.name}</h2>
                                    <p>{value.technologies}</p>
                                    <a href={value.link} target="_blank">
                                      <img
                                        src="/search.svg"
                                        alt="zweidews search logo"
                                      />
                                    </a>
                                  </div>
                                </div>
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                  <section className={styles.feedback} id="feeback">
                    <div className="container">
                      <div className="row">
                        <div className="col-md-12">
                          <h2>Customers Feedback</h2>
                        </div>
                        <div className="col-md-12">
                          <div
                            id="carouselExampleControls"
                            className={`carousel slide ${styles.carousel_controls}`}
                            data-ride="carousel"
                          >
                            <div className="carousel-inner">
                              <div className="carousel-item active">
                                <div className="row">
                                  <div className="col-md-6">
                                    <Feeback
                                      name="Mudassir Malik"
                                      designation="Co-founder of Officer Survey"
                                      feedback="When we first spoke with the Zweidevs team, right off the bat we knew, they’re were powerful, credible and most importantly effective. We had a very complex task which they were able to build for us. They overcame many of the challenges that we faced along the way and were able to deliver a complete and functional software a week ahead of the deadline. You guys are the best! Keep up the great work! Thank you so much for the job well done. We will definitely hire them again!"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <Feeback
                                      name="Radu"
                                      designation="Founder of Social Wing"
                                      feedback="I found Zweidevs Team very professional and hard working. They just didn't only develop my web app but actually guided me as well through different phases. Thank you will definitely use your services again"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="carousel-item">
                                <div className="row">
                                  <div className="col-md-6">
                                    <Feeback
                                      name="Wenner"
                                      designation="COO"
                                      feedback="I’ve had a pleasure working with Ali and his team at Zweidevs on a very complex software project. I’ve felt very comfortable working with them and we plan on using this team for all of our software needs. I would highly recommend this team. Thank you!!"
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <Feeback
                                      name="Kyle"
                                      designation="CTO of Shine Rite"
                                      feedback="Zweidevs has been great to work with. They follow a solid Agile process so all development work is well planned and clearly priced. Their code is solid and the end result was top notch!"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <a
                              className={styles.carousel_control_prev}
                              href="#carouselExampleControls"
                              role="button"
                              data-slide="prev"
                            >
                              <span
                                className={styles.carousel_control_prev_icon}
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Previous</span>
                            </a>
                            <a
                              className={styles.carousel_control_next}
                              href="#carouselExampleControls"
                              role="button"
                              data-slide="next"
                            >
                              <span
                                className={styles.carousel_control_next_icon}
                                aria-hidden="true"
                              ></span>
                              <span className="sr-only">Next</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  {/* <section className={styles.clients} id="clients">
                    <div className="container">
                      <div className="row">
                        {clients.map((value, index) => {
                          return (
                            <div className="col-md-3">
                              <LogoCard logo={value.logo} />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section> */}
                  <section
                    className={styles.project_numbers}
                    id="project_numbers"
                  >
                    <div className={styles.gradient}></div>
                    <div className="container">
                      <div className={`${styles.pn_box} row`}>
                        <div className="col-md-4 text-center">
                          <div className={styles.pn_icon}>
                            <img src="/projector.svg" alt="Projects" />
                          </div>
                          <div className={styles.counter}>
                            <span>50+</span>
                          </div>
                          <div className={styles.pn_content}>
                            <h3 className={styles.content_title}>
                              Projects Done
                            </h3>
                          </div>
                        </div>

                        <div className="col-md-4 text-center">
                          <div className={styles.pn_icon}>
                            <img src="/smile.svg" alt="smile" />
                          </div>
                          <div className={styles.counter}>
                            <span>20+</span>
                          </div>
                          <div className={styles.pn_content}>
                            <h3 className={styles.content_title}>
                              Happy Clients
                            </h3>
                          </div>
                        </div>

                        <div className="col-md-4 text-center">
                          <div className={styles.pn_icon}>
                            <img src="/review.svg" alt="reviews" />
                          </div>
                          <div className={styles.counter}>
                            <span>5000+</span>
                          </div>
                          <div className={styles.pn_content}>
                            <h3 className={styles.content_title}>
                              Hours Worked
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                  <section className={styles.message} id="contact">
                    <img
                      src="/element19.png"
                      alt="element"
                      className={styles.message_bg}
                    />
                    <div className="container">
                      <div className="row">
                        <div className="col-md-6">
                          <h2>How May We Help You!</h2>
                          <p>Let's Talk about your amazing idea!</p>
                          <div className={styles.instantBookingButton}>
                            <Button
                              text="Instant Booking"
                              onClick={() =>
                                window.location.assign(
                                  "https://calendly.com/zweidevs/get-quote"
                                )
                              }
                            />
                          </div>
                          <div className={styles.media_designation}>
                            <p>OR</p>
                          </div>

                          <Form onSubmit={handleSubmit} method="post">
                            <div className="row">
                              <div className="col">
                                <div className={styles.form_group}>
                                  <Form.Group>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                      placeholder="Enter Name"
                                      name="name"
                                      onChange={handleQuoteDataChange}
                                      className={styles.form_control}
                                      required
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                              <div className="col">
                                <div className={styles.form_group}>
                                  <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                      className={styles.form_control}
                                      type="email"
                                      placeholder="Enter email"
                                      name="email"
                                      onChange={handleQuoteDataChange}
                                      required
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className={styles.form_group}>
                                  <Form.Group>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control
                                      required
                                      placeholder="Enter Phone Number"
                                      name="phone_number"
                                      onChange={handleQuoteDataChange}
                                      className={styles.form_control}
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                              <div className="col">
                                <div className={styles.form_group}>
                                  <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                      required
                                      placeholder="Enter Country"
                                      name="country"
                                      onChange={handleQuoteDataChange}
                                      className={styles.form_control}
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <div className={styles.form_group}>
                                  <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                      required
                                      placeholder="Enter Description"
                                      name="des"
                                      onChange={handleQuoteDataChange}
                                      className={styles.form_control}
                                    />
                                  </Form.Group>
                                </div>
                              </div>
                            </div>
                            <Button
                              text="Submit Now"
                              type="submit"
                              showSpinnerProp={showSpinner}
                            />
                            <Snackbar
                              open={open}
                              autoHideDuration={6000}
                              size
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              message={"Submitted Successfully"}
                              color="yellow"
                            ></Snackbar>
                          </Form>
                        </div>
                        <div className="col-md-6">
                          <img
                            src="/get-in-touch-animate.svg"
                            alt="illustration"
                          />
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
      </div>
    </Layout>
  );
}
