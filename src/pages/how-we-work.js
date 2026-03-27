import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Step from "@mui/material/Step";
import StepContent from "@mui/material/StepContent";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Typography from "@mui/material/Typography";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/* ── data ─────────────────────────────────────────── */
const engagementModels = [
  {
    title: "Fixed Price",
    when: "Best for well-defined projects with clear scope.",
    includes: [
      "Scoped requirements document",
      "Fixed timeline & budget",
      "2 rounds of revisions included",
      "No hidden costs",
    ],
    timeline: "Typical: 4–12 weeks",
    ctaLabel: "Start with Fixed Price",
  },
  {
    title: "Time & Material",
    when: "Best when requirements evolve as you build.",
    includes: [
      "Weekly billing",
      "Flexible scope",
      "Direct developer access",
      "Monthly reporting",
    ],
    timeline: "Typical: Ongoing",
    ctaLabel: "Start with T&M",
  },
  {
    title: "Dedicated Team",
    when: "Best for long-term product work needing reliability.",
    includes: [
      "Senior devs + PM",
      "Daily standups",
      "Shared Slack & Jira",
      "30-day scale notice",
    ],
    timeline: "Typical: 3+ months",
    ctaLabel: "Start with Dedicated Team",
  },
];

const processSteps = [
  {
    label: "Discovery Call",
    day: "Day 1",
    desc: "We learn your goals, constraints, budget, and timeline.",
  },
  {
    label: "Proposal & SOW",
    day: "Day 3–5",
    desc: "Scope, timeline, team composition, and detailed cost breakdown.",
  },
  {
    label: "Kickoff & Sprint Planning",
    day: "Week 1",
    desc: "Repo setup, sprint board, and full team introduction.",
  },
  {
    label: "Development Sprints",
    day: "Week 2+",
    desc: "2-week sprints with a live demo every Friday.",
  },
  {
    label: "QA & Staging",
    day: "Final Sprint",
    desc: "Full QA, staging environment, and dedicated client testing period.",
  },
  {
    label: "Launch & Handoff",
    day: "Final Week",
    desc: "Deployment, full documentation, and 30-day free support included.",
  },
];

const faqs = [
  {
    q: "What's your minimum project size?",
    a: "We typically work on projects starting at $5,000. For smaller scopes, we offer fixed-price packages.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, always — before any discovery or scoping call.",
  },
  {
    q: "Will we have a dedicated project manager?",
    a: "Yes. Every project has a PM and a dedicated Slack channel.",
  },
  {
    q: "Can we hire a dedicated developer?",
    a: "Yes. Our dedicated team model starts at $30/hr for a senior developer.",
  },
  {
    q: "What happens after launch?",
    a: "30 days of free support is included. After that, we offer monthly retainer plans.",
  },
];

/* ── section wrapper ──────────────────────────────── */
function Section({ bgcolor, children, py }) {
  return (
    <Box
      component="section"
      sx={{ bgcolor: bgcolor || "#fff", py: py || { md: 10, xs: 8 } }}
    >
      <Container maxWidth="md">{children}</Container>
    </Box>
  );
}

/* ── section heading ──────────────────────────────── */
function SectionHeading({ title }) {
  return (
    <Typography
      component="h2"
      sx={{ fontWeight: 700, mb: 6, textAlign: "center" }}
      variant="h4"
    >
      {title}
    </Typography>
  );
}

/* ── page ─────────────────────────────────────────── */
export default function HowWeWork() {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleFaqChange = panel => (_, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : null);
  };

  return (
    <>
      <Head>
        <title>How We Work | Zweidevs</title>
        <meta
          content={
            "Transparency, speed, and zero surprises. Learn about " +
            "Zweidevs\u2019 engagement models, project process, and what " +
            "it\u2019s really like to work with us."
          }
          name="description"
        />
      </Head>

      {/* ── HERO ────────────────────────────────── */}
      <Box
        component="section"
        sx={{
          bgcolor: "#0A0A0F",
          color: "#fff",
          py: { md: 14, xs: 10 },
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="p"
            sx={{
              color: "#FF9700",
              fontWeight: 700,
              letterSpacing: 2,
              mb: 2,
            }}
            variant="overline"
          >
            How We Work
          </Typography>
          <Typography
            component="h1"
            sx={{ fontWeight: 800, lineHeight: 1.15, mb: 3 }}
            variant="h2"
          >
            Our Process Is as Important{" "}
            <Box component="span" sx={{ color: "#FF9700" }}>
              as Our Product
            </Box>
          </Typography>
          <Typography
            sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 560, mx: "auto" }}
            variant="h6"
          >
            Transparency, speed, and zero surprises &mdash; that&apos;s how we
            operate.
          </Typography>
        </Container>
      </Box>

      {/* ── ENGAGEMENT MODELS ───────────────────── */}
      <Section>
        <SectionHeading title="How We Engage" />
        {engagementModels.map(model => (
          <Card
            key={model.title}
            sx={{
              border: "1px solid #eee",
              borderRadius: "20px",
              boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              mb: 3,
              transition: "box-shadow 0.3s",
              "&:hover": {
                boxShadow: "0 12px 40px rgba(255,151,0,0.12)",
              },
            }}
          >
            <CardContent sx={{ p: { md: 5, xs: 3 } }}>
              <Box
                sx={{
                  alignItems: { md: "center", xs: "flex-start" },
                  display: "flex",
                  flexDirection: { md: "row", xs: "column" },
                  gap: 3,
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <Box>
                  <Typography
                    component="h3"
                    sx={{ color: "#FF9700", fontWeight: 800, mb: 0.5 }}
                    variant="h5"
                  >
                    {model.title}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {model.when}
                  </Typography>
                </Box>
                <Typography
                  sx={{
                    bgcolor: "rgba(255,151,0,0.08)",
                    borderRadius: "12px",
                    color: "#FF9700",
                    flexShrink: 0,
                    fontWeight: 600,
                    px: 2,
                    py: 0.75,
                  }}
                  variant="caption"
                >
                  {model.timeline}
                </Typography>
              </Box>
              <List dense disablePadding sx={{ mb: 3 }}>
                {model.includes.map(item => (
                  <ListItem disableGutters key={item} sx={{ py: 0.25 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircleOutlineIcon
                        fontSize="small"
                        sx={{ color: "#FF9700" }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                ))}
              </List>
              <Button
                component={Link}
                href="/contactUs"
                sx={{
                  bgcolor: "#FF9700",
                  "&:hover": { bgcolor: "#e08600" },
                }}
                variant="contained"
              >
                {model.ctaLabel}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Section>

      {/* ── PROCESS TIMELINE ────────────────────── */}
      <Section bgcolor="#F9F9F9">
        <SectionHeading title="A Typical Project at Zweidevs" />
        <Stepper orientation="vertical">
          {processSteps.map(step => (
            <Step active completed={false} key={step.label}>
              <StepLabel
                StepIconProps={{
                  sx: {
                    "&.MuiStepIcon-root": { color: "#FF9700" },
                    "&.MuiStepIcon-root.Mui-active": { color: "#FF9700" },
                  },
                }}
              >
                <Box sx={{ alignItems: "center", display: "flex", gap: 1.5 }}>
                  <Typography sx={{ fontWeight: 700 }} variant="subtitle1">
                    {step.label}
                  </Typography>
                  <Typography
                    sx={{
                      bgcolor: "#2B2A35",
                      borderRadius: "8px",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 600,
                      px: 1.25,
                      py: 0.35,
                    }}
                    variant="caption"
                  >
                    {step.day}
                  </Typography>
                </Box>
              </StepLabel>
              <StepContent>
                <Typography
                  color="text.secondary"
                  sx={{ pb: 2 }}
                  variant="body2"
                >
                  {step.desc}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Section>

      {/* ── FAQ ─────────────────────────────────── */}
      <Section>
        <SectionHeading title="Common Questions" />
        {faqs.map((faq, i) => (
          <Accordion
            disableGutters
            elevation={0}
            expanded={expandedFaq === i}
            key={faq.q}
            onChange={handleFaqChange(i)}
            sx={{
              "&::before": { display: "none" },
              border: "1px solid #eee",
              borderRadius: "12px !important",
              mb: 1.5,
              overflow: "hidden",
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: "#FF9700" }} />}
              sx={{
                "&.Mui-expanded": { bgcolor: "rgba(255,151,0,0.04)" },
                px: 3,
                py: 0.5,
              }}
            >
              <Typography sx={{ fontWeight: 600 }} variant="body1">
                {faq.q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ color: "text.secondary", px: 3, pb: 2.5 }}>
              <Typography color="text.secondary" variant="body2">
                {faq.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Section>
    </>
  );
}
