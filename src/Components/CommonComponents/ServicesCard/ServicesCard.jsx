import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

const ServicesCard = (props) => {
  const { cardData } = props;
  return (
    <>
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
            md: "block",
            lg: "block",
            xl: "block",
            xxl: "block",
          },
        }}
      >
        {cardData.map((element, key) => (
          <div key={key} className="services-card-container">
            <Box
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                  xxl: "flex",
                },
              }}
            >
              <div className="services-icon-card-container">
                <Image
                  className="services-icon"
                  src={element.cardIcon}
                  alt="web-dev-icon"
                  height={"auto"}
                />
                <div className="services-icon-card-title">
                  <div>
                    {element.cardIconTitle.firstLine}
                    <br></br>
                    {element.cardIconTitle.secondLine}
                  </div>
                </div>
              </div>
            </Box>

            <div className="services-card-details-container">
              <span className="services-card-details-header">
                {element.cardTitle}
              </span>
              <div className="services-card-details">
                {element.cardDetails}{" "}
              </div>
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
      </Box>

      {/* mobile View */}
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            md: "none",
            lg: "none",
            xl: "none",
            xxl: "none",
          },
        }}
      >
        {cardData.map((element, key) => (
          <Box>
            <div className="services-icon-card-container-mobile">
              <Image
                className="services-icon"
                src={element.cardIcon}
                alt="web-dev-icon"
                height={"auto"}
              />
              <div className="services-icon-card-title">
                <div>
                  {element.cardIconTitle.firstLine}
                  <br></br>
                  {element.cardIconTitle.secondLine}
                </div>
              </div>
            </div>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default ServicesCard;
