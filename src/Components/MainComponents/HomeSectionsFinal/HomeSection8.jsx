import React, { useState, useEffect } from "react";
import styles from "./HomeSection.module.css";
import PhoneInput from "react-phone-input-2";
import { TextField, Button, FormLabel } from "@mui/material";
import "react-phone-input-2/lib/style.css";

function HomeSection8({ handleButtonClick }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    country: "",
    description: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("+92");
  const [countryName, setCountryName] = useState();
  const animatedDivRefs = React.useRef(null);
  const animatedLabelRefs = Array.from({ length: 5 }, () => React.useRef(null));
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formValues);
  };
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInUp",
            "animate__delay-0s"
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ("animate__delay-0s");
          entry.target.classList.add(
            "animate__animated",
            "animate__flipInX",
            "animate__delay-1s"
          );
        }
      });
    }, options);

    if (animatedDivRefs.current) {
      observer.observe(animatedDivRefs.current);
    }

    animatedLabelRefs.forEach((ref) => {
      observer1.observe(ref.current);
    });

    return () => {
      observer.disconnect();
      observer1.disconnect();
    };
  }, []);

  return (
    <>
      <div className={styles.HS8MainContainer}>
        <h2 className={styles.HS8Heading} ref={animatedDivRefs}>
          How May We Help You
        </h2>
        <div style={{ width: "80%" }}>
          <form onSubmit={handleSubmit}>
            <div className={styles.HS8InputFieldContainer}>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  required
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[0]}
                >
                  Name
                </FormLabel>
                <TextField
                  placeholder="Enter your name"
                  name="name"
                  type="text"
                  value={formValues.name}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  className={styles.HS8InputField}
                />
              </div>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  required
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[1]}
                >
                  Email
                </FormLabel>
                <TextField
                  placeholder="Enter your email"
                  className={styles.HS8InputField}
                  name="email"
                  type="email"
                  value={formValues.email}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </div>
            </div>
            <div style={{ display: "none" }} className={styles.HS8InputFieldContainer}>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  required
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[3]}
                >
                  Country
                </FormLabel>
                <TextField
                  placeholder="Enter your country"
                  className={styles.HS8InputField}
                  name="country"
                  type="text"
                  value={formValues.country}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </div>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  required
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[2]}
                >
                  Contact Number
                </FormLabel>
                <TextField
                  placeholder="Enter your contact number"
                  name="contact"
                  type="text"
                  value={formValues.contact}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  className={styles.HS8InputField}
                />
              </div>
            </div>

            <div className={styles.HS8InputContainer} style={{position:"relative"}}>
              <FormLabel
                required
                className={styles.HS8FormLabel}
                ref={animatedLabelRefs[2]}
              >
                Contact Number
              </FormLabel>
              <PhoneInput
                country={"pk"}
                value={phoneNumber}
                containerClass="HS8Phone-number"
                inputClass="HS8Phone-number-input"
                dropdownClass="HS8Phone-country-dropdown"
                onChange={(phone, country) => {
                  setPhoneNumber(phone);
                  setCountryName(country.name);
                }}
              />
              <div className={styles.HS8CountryName}> {countryName}</div>
            </div>
            <div className={styles.HS8InputAreaContainer}>
              <FormLabel
                required
                className={styles.HS8FormLabel}
                ref={animatedLabelRefs[4]}
              >
                Description
              </FormLabel>
              <TextField
                placeholder="Type your description"
                name="description"
                minRows={6}
                multiline
                value={formValues.description}
                onChange={handleInputChange}
                required
                variant="outlined"
                style={{ fontFamily: "Poppins" }}
                className={styles.HS8TextArea}
              />

              <div className={styles.HS8ButtonContainer}>
                <Button
                  className={styles.HS8Button}
                  variant="contained"
                  type="submit"
                >
                  Submit Now
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default HomeSection8;
