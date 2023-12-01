import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./faq.module.css";
const Faq = ({ faqData }) => {
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
        <Accordion key={key}>
          <AccordionSummary
            aria-controls="panel1a-content"
            expandIcon={<ExpandMoreIcon />}
            id="panel1a-header"
          >
            <Typography style={{ fontSize: 21 }}>{data.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: 15 }}>{data.desc}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Faq;
