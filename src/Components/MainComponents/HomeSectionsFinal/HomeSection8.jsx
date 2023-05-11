import React, { useState } from "react";
import styles from "./HomeSection.module.css";

import { TextField, Button, FormLabel } from "@mui/material";

function HomeSection8({ handleButtonClick }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    contact: "",
    country: "",
    description: "",
  });
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

  return (
    <>
      <div className={styles.HS8MainContainer}>
        <div className={styles.HS8Heading}>How May we Help You</div>
        <div style={{ width: "85%" }}>
          <form onSubmit={handleSubmit}>
            <div className={styles.HS8InputFieldContainer}>
              <div className={styles.HS8InputContainer}>
                <FormLabel required className={styles.HS8FormLabel}>
                  Name
                </FormLabel>
                <TextField
                  placeholder="Enter your Name"
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
                <FormLabel required className={styles.HS8FormLabel}>
                  Email
                </FormLabel>
                <TextField
                  placeholder="Enter your Email"
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
                <FormLabel required className={styles.HS8FormLabel}>
                  Contact Number
                </FormLabel>
                <TextField
                  placeholder="Enter your Contact Number"
                  name="contact"
                  type="text"
                  value={formValues.contact}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                  className={styles.HS8InputField}
                />
              </div>
              <div className={styles.HS8InputContainer}>
                <FormLabel required className={styles.HS8FormLabel}>
                  Country
                </FormLabel>
                <TextField
                  placeholder="Enter your Country"
                  className={styles.HS8InputField}
                  name="country"
                  type="text"
                  value={formValues.country}
                  onChange={handleInputChange}
                  required
                  variant="outlined"
                />
              </div>
            </div>

            <div className={styles.HS8InputContainer}>
              <FormLabel required className={styles.HS8FormLabel}>
                Description
              </FormLabel>
              <TextField
                placeholder="Type your Description*"
                name="description"
                minRows={6}
                multiline
                value={formValues.description}
                onChange={handleInputChange}
                required
                variant="outlined"
              />
              <div className={styles.HS8ButtonContainer}>
                <Button
                  className={styles.HS8Button}
                  variant="contained"
                  color="primary"
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
