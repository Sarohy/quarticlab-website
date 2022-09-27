import React from "react";
import styles from "../styles/ServiceCarousel.module.css";
import { services } from "../constant/data";

function ServiceCarousel() {
  return (
    <div
      id="carouselExampleControlsTwo"
      className="carousel slide col-12"
      data-ride="carousel"
      data-interval="5000"
    >
      <ol class={`carousel-indicators ${styles.carouselBars}`}>
        <li
          data-target="#carouselExampleControlsTwo"
          data-slide-to="0"
          class="active"
        ></li>
        <li data-target="#carouselExampleControlsTwo" data-slide-to="1"></li>
        <li data-target="#carouselExampleControlsTwo" data-slide-to="2"></li>
      </ol>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <div className="row">
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[0].icon} alt={services[0].icon_desc} />
                  <h3>{services[0].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[0].desc}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[1].icon} alt={services[1].icon_desc} />
                  <h3>{services[1].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[1].desc}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[2].icon} alt={services[2].icon_desc} />
                  <h3>{services[2].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[2].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row">
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[3].icon} alt={services[3].icon_desc} />
                  <h3>{services[3].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[3].desc}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[4].icon} alt={services[4].icon_desc} />
                  <h3>{services[4].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[4].desc}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[5].icon} alt={services[5].icon_desc} />
                  <h3>{services[5].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[5].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <div className="row">
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[6].icon} alt={services[6].icon_desc} />
                  <h3>{services[6].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[6].desc}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[7].icon} alt={services[7].icon_desc} />
                  <h3>{services[7].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[7].desc}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.card_items}>
                <div className={styles.card_items_icon}>
                  <img src={services[8].icon} alt={services[8].icon_desc} />
                  <h3>{services[8].title}</h3>
                </div>
                <div className={styles.card_items_content}>
                  <p className={styles.serviceDisc}>{services[8].desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.carouselBtn}>
        <a
          class="carousel-control-prev"
          href="#carouselExampleControlsTwo"
          role="button"
          data-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
      </div>
      <div className={styles.carouselBtn}>
        <a
          class="carousel-control-next"
          href="#carouselExampleControlsTwo"
          role="button"
          data-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
  );
}

export default ServiceCarousel;
