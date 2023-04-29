import Image from "next/image";
import React from "react";

const ServicesCard = (props) => {
  const { cardData } = props;
  return (
    <>
      {cardData.map((element, key) => (
        <div className="services-card-container">
          <div className="services-icon-card-container">
            <Image
              className="services-icon"
              src={element.cardIcon}
              alt="web-dev-icon"
            />
            <div className="services-icon-card-title">
              <div>
                {element.cardIconTitle.firstLine}
                <br></br>
                {element.cardIconTitle.secondLine}
              </div>
            </div>
          </div>
          <div className="services-card-details-container">
            <span className="services-card-details-header">
              {element.cardTitle}
            </span>
            <div className="services-card-details">{element.cardDetails} </div>
            <div className="services-card-footer-container">
              <span className="services-card-footer-header">
                {element.footerTitle}:
              </span>
              <div className="services-footer-images-container">
                {element.footerImages &&
                  element.footerImages.map((image, key) => (
                    <Image
                      key={key}
                      className="services-footer-image"
                      src={image}
                      alt={"node-icon"}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ServicesCard;
