import React, { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import InputAdornment from "@mui/material/InputAdornment";
import { isValidPhoneNumber } from "libphonenumber-js";
import styles from "./HomeSection8.module.css";

function HomeSection8() {
  const [allCountries, setAllCountries] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    country: {
      label: "Pakistan",
      id: "PK",
      phoneCode: "+92",
      icon: "https://flagcdn.com/w80/pk.png",
    },
    description: "",
  });
  const animatedDivRefs = React.useRef(null);
  const animatedLabelRefs = Array.from({ length: 5 }, () => React.useRef(null));

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isValidPhoneNumber(formValues.contact, formValues.country?.id)) {
      alert("valid phone  number");
    } else {
      alert("Invalid phone number O_O");
    }
  };

  const getCountriesData = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      const countries = await response.json();
      const countriesData = countries.map(country => {
        return {
          label: country?.name?.common,
          id: country?.cca2,
          phoneCode:
            country?.idd?.root +
            (country?.idd?.suffixes?.length === 1
              ? country?.idd?.suffixes?.[0]
              : ""),
          icon: `https://flagcdn.com/w80/${country?.cca2?.toLowerCase()}.png`,
        };
      });
      setAllCountries(countriesData);
    } catch (error) {
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
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(
            "animate__animated",
            "animate__backInLeft",
            "animate__delay-0s",
          );
        }
      });
    }, options);

    const observer1 = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          ("animate__delay-0s");
          entry.target.classList.add(
            "animate__animated",
            "animate__flipInX",
            "animate__delay-1s",
          );
        }
      });
    }, options);

    if (animatedDivRefs.current) {
      observer.observe(animatedDivRefs.current);
    }

    animatedLabelRefs.forEach(ref => {
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
        <div className={styles.HS8Width}>
          <form onSubmit={handleSubmit}>
            <div className={styles.HS8InputFieldContainer}>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[0]}
                  required
                >
                  Name
                </FormLabel>
                <TextField
                  className={styles.HS8InputField}
                  name="name"
                  onChange={handleInputChange}
                  placeholder="Enter your name"
                  required
                  size="small"
                  type="text"
                  value={formValues.name}
                  variant="outlined"
                />
              </div>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[1]}
                  required
                >
                  Email
                </FormLabel>
                <TextField
                  className={styles.HS8InputField}
                  name="email"
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                  size="small"
                  type="email"
                  value={formValues.email}
                  variant="outlined"
                />
              </div>
            </div>
            <div className={styles.HS8InputFieldContainer}>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[2]}
                  required
                >
                  Country
                </FormLabel>
                <Autocomplete
                  disableClearable={true}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id && option.label === option.label
                  }
                  onChange={(event, value) => {
                    setFormValues({
                      ...formValues,
                      country: value,
                    });
                  }}
                  options={allCountries}
                  renderInput={params => (
                    <TextField
                      {...params}
                      className={styles.HS8InputField}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <InputAdornment position="start">
                            {formValues.country?.icon && (
                              <Image
                                alt={formValues.country?.id}
                                height={25}
                                src={formValues.country.icon}
                                title="Zweidevs | Custome Software Development Services Company"
                                width={40}
                              />
                            )}
                          </InputAdornment>
                        ),
                      }}
                      name="country"
                      placeholder="Select country"
                      required
                      size="small"
                      variant="outlined"
                    />
                  )}
                  renderOption={(props, option) => (
                    <ListItem {...props}>
                      <ListItemIcon>
                        <Avatar className={styles.AvatarStyle} variant="square">
                          <Image
                            alt="country flag logo"
                            height={25}
                            src={option.icon}
                            title="Zweidevs | Custome Software Development Services Company"
                            width={40}
                          />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={option.label} />
                    </ListItem>
                  )}
                  value={formValues.country}
                ></Autocomplete>
              </div>
              <div className={styles.HS8InputContainer}>
                <FormLabel
                  className={styles.HS8FormLabel}
                  ref={animatedLabelRefs[3]}
                  required
                >
                  Contact No
                </FormLabel>
                <TextField
                  className={styles.HS8InputField}
                  disabled={!formValues.country?.label}
                  InputProps={{
                    startAdornment: (
                      <span className={styles.TextFieldStyle}>
                        {formValues.country?.phoneCode}
                      </span>
                    ),
                  }}
                  name="contact"
                  onChange={handleInputChange}
                  placeholder="Enter your contact number"
                  required
                  size="small"
                  value={formValues.contact}
                  variant="outlined"
                />
              </div>
            </div>

            <div className={styles.HS8InputAreaContainer}>
              <FormLabel
                className={styles.HS8FormLabel}
                ref={animatedLabelRefs[4]}
                required
              >
                Description
              </FormLabel>
              <TextField
                className={`${styles.HS8TextArea} ${styles.TextFieldFont}`}
                minRows={6}
                multiline
                name="description"
                onChange={handleInputChange}
                placeholder="Type your description"
                required
                value={formValues.description}
                variant="outlined"
              />

              <div className={styles.HS8ButtonContainer}>
                <Button
                  className={styles.HS8Button}
                  type="submit"
                  variant="contained"
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
