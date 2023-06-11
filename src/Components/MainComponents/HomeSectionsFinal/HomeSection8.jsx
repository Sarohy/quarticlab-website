import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  TextField,
  Button,
  FormLabel,
  Autocomplete,
  ListItem,
  Avatar,
  ListItemText,
  ListItemIcon,
  InputAdornment
} from "@mui/material";
import { isValidPhoneNumber } from "libphonenumber-js";
import styles from "./HomeSection.module.css";


function HomeSection8({ handleButtonClick }) {
  const [allCountries, setAllCountries] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    country: {
      label: "Pakistan",
      id: "PK",
      phoneCode: "+92",
      icon: "https://flagcdn.com/w80/pk.png"
    },
    description: ""
  });
  const animatedDivRefs = React.useRef(null);
  const animatedLabelRefs = Array.from({ length: 5 }, () => React.useRef(null));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidPhoneNumber(formValues.contact, formValues.country?.id)) {
      console.log(formValues);
    } else {
      alert("Invalid phone number O_O")
    }
  };

  const getCountriesData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      const countriesData = countries.map((country) => {
        return {
          label: country?.name?.common,
          id: country?.cca2,
          phoneCode:
            country?.idd?.root +
            (country?.idd?.suffixes?.length === 1
              ? country?.idd?.suffixes?.[0]
              : ""),
          icon: `https://flagcdn.com/w80/${country?.cca2?.toLowerCase()}.png`
        };
      });
      setAllCountries(countriesData);
    } catch (error) {
      console.error("Error fetching countries data:", error);
      return [];
    }
  };

  useEffect(() => {
    getCountriesData();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
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
            <div className={styles.HS8InputFieldContainer}>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  required
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[2]}
                >
                  Country
                </FormLabel>
                <Autocomplete
                  value={formValues.country}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id &&
                    option.label === option.label
                  }
                  disableClearable={true}
                  options={allCountries}
                  onChange={(event, value) => {
                    setFormValues({
                      ...formValues,
                      country: value
                    });
                  }}
                  renderOption={(props, option) => (
                    <ListItem {...props}>
                      <ListItemIcon>
                        <Avatar
                          variant="square"
                          style={{ backgroundColor: "transparent" }}
                        >
                          <Image
                            alt={"country flag"}
                            width={40}
                            height={25}
                            src={option.icon}
                          />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={option.label} />
                    </ListItem>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className={styles.HS8InputField}
                      name="country"
                      required
                      variant="outlined"
                      placeholder="Select country"
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            {formValues.country?.icon && (
                              <Image
                                width={40}
                                height={25}
                                src={formValues.country.icon}
                                alt={formValues.country?.id}
                              />
                            )}
                          </InputAdornment>
                        )
                      }}
                    />
                  )}
                ></Autocomplete>
              </div>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  required
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[3]}
                >
                  Contact No
                </FormLabel>
                <TextField
                  disabled={formValues.country?.label ? false : true}
                  placeholder="Enter your contact number"
                  className={styles.HS8InputField}
                  name="contact"
                  value={formValues.contact}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <span style={{ marginRight: 5 }}>
                        {formValues.country?.phoneCode}
                      </span>
                    )
                  }}
                />
              </div>
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
