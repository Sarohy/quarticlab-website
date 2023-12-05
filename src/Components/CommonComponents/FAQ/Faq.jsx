import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./faq.module.css";
const Faq = ({ faqData }) => {
  const [expandedPanel, setExpandedPanel] = useState(null);

  const handleChange = panel => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : null);
  };

  return (
    <div
      className={styles.root}
      style={{ marginInline: 50, marginBottom: 50, marginTop: 50 }}
    >
      <h2
        className={`${styles.fontHeading} ${styles.heading}  ${styles.heading2} ${styles.stages__heading}`}
      >
        Frequently Asked Questions
      </h2>
      {faqData.map((data, key) => (
        <Accordion
          expanded={expandedPanel === `panel-${key}`}
          key={key}
          onChange={handleChange(`panel-${key}`)}
        >
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
          >
            <Typography
              className={styles.faqTitle}
              style={{
                color: expandedPanel === `panel-${key}` ? "#ff9700" : "#000",
              }}
            >
              {data.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography className={styles.faqDesc}>{data.desc}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;
