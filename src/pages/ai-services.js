import Head from "next/head";
import Image from "next/image";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import OpenAIIcon from "../../public/assets/serviceIcons/openAIIcon.svg";
import AIDevIcon from "../../public/assets/serviceIcons/AIDevIcon.svg";
import PythonIcon from "../../public/assets/serviceIcons/py.svg";
import Ai1Icon from "../../public/assets/serviceIcons/aiIcons/ai1.svg";

import styles from "../styles/aiServices.module.css";

/* ── data ─────────────────────────────────────────── */
const serviceTiles = [
  {
    icon: OpenAIIcon,
    title: "Generative AI Applications",
    desc: "LLM-powered chatbots, content tools, and intelligent search.",
  },
  {
    icon: AIDevIcon,
    title: "Multi-Agent AI Systems",
    desc: "Autonomous agents that plan, reason, and self-correct at scale.",
  },
  {
    icon: null,
    title: "AI Audit & Transformation",
    desc: "We map your workflows and identify where AI creates real ROI.",
  },
  {
    icon: PythonIcon,
    title: "MLOps & Model Deployment",
    desc: "From notebook to production — with monitoring and versioning.",
  },
  {
    icon: Ai1Icon,
    title: "LLM Fine-tuning",
    desc: "Train models on your own data for domain-specific accuracy.",
  },
  {
    icon: null,
    title: "Process Automation (RPA)",
    desc: "Replace manual workflows with intelligent automation.",
  },
];

const industries = [
  "FinTech",
  "HealthTech",
  "E-commerce",
  "Legal",
  "Real Estate",
  "Logistics",
  "Education",
  "SaaS",
];

/* ── page ─────────────────────────────────────────── */
export default function AIServicesPage() {
  return (
    <>
      <Head>
        <title>GenAI &amp; AI Automation | Zweidevs</title>
        <meta
          content={
            "Production-grade Generative AI, autonomous agents, and " +
            "automation pipelines built for your business. Not demos."
          }
          name="description"
        />
      </Head>

      {/* ── HERO ──────────────────────────────────── */}
      <Box
        className={styles.hero}
        sx={{ bgcolor: "#0A0A0F", color: "#fff", py: { md: 14, xs: 10 } }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography
            className={styles.heroBadge}
            component="p"
            sx={{ color: "#FF9700", fontWeight: 700, letterSpacing: 2, mb: 2 }}
            variant="overline"
          >
            AI Services
          </Typography>
          <Typography
            className={styles.heroH1}
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { md: "3.75rem", xs: "1.9rem" },
              lineHeight: 1.15,
              mb: 3,
            }}
            variant="h2"
          >
            AI That Works.{" "}
            <Box component="span" sx={{ color: "#FF9700" }}>
              Not AI That Hypes.
            </Box>
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ color: "rgba(255,255,255,0.6)", maxWidth: 600, mx: "auto" }}
            variant="h6"
          >
            Production-grade Generative AI, autonomous agents, and automation
            pipelines.
          </Typography>
          <Button
            href="/contactUs"
            size="large"
            sx={{
              bgcolor: "#FF9700",
              mt: 5,
              px: 4,
              py: 1.5,
              "&:hover": { bgcolor: "#e08600" },
            }}
            variant="contained"
          >
            Talk to an AI Expert
          </Button>
        </Container>
      </Box>

      {/* ── SERVICE TILES ─────────────────────────── */}
      <Box component="section" sx={{ bgcolor: "#fff", py: { md: 10, xs: 8 } }}>
        <Container maxWidth="lg">
          <Typography
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, mb: 1, textAlign: "center" }}
            variant="h4"
          >
            What We Build in AI
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ mb: 6, textAlign: "center" }}
            variant="body1"
          >
            End-to-end AI solutions — from strategy to production deployment.
          </Typography>
          <Grid container spacing={3}>
            {serviceTiles.map(tile => (
              <Grid item key={tile.title} sm={6} xs={12}>
                <Card
                  className={styles.tile}
                  sx={{
                    borderRadius: "16px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                    height: "100%",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      boxShadow: "0 12px 40px rgba(255,151,0,0.15)",
                      transform: "translateY(-6px)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {tile.icon && (
                      <Box
                        sx={{
                          alignItems: "center",
                          bgcolor: "rgba(255,151,0,0.08)",
                          borderRadius: "12px",
                          display: "flex",
                          height: 56,
                          justifyContent: "center",
                          mb: 2,
                          width: 56,
                        }}
                      >
                        <Image
                          alt={tile.title}
                          height={28}
                          src={tile.icon}
                          width={28}
                        />
                      </Box>
                    )}
                    <Typography
                      component="h3"
                      gutterBottom
                      sx={{ fontWeight: 700 }}
                      variant="h6"
                    >
                      {tile.title}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {tile.desc}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── INDUSTRIES ────────────────────────────── */}
      <Box
        component="section"
        sx={{ bgcolor: "#F9F9F9", py: { md: 10, xs: 8 } }}
      >
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Typography
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700, mb: 1 }}
            variant="h4"
          >
            Industries We&apos;ve Automated
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 5 }} variant="body1">
            Our AI solutions have shipped across verticals.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1.5,
              justifyContent: "center",
            }}
          >
            {industries.map(industry => (
              <Chip
                key={industry}
                label={industry}
                sx={{
                  bgcolor: "#2B2A35",
                  borderRadius: "20px",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 500,
                  px: 1,
                  py: 2.5,
                  "&:hover": { bgcolor: "#FF9700" },
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── CTA ───────────────────────────────────── */}
      <Box component="section" sx={{ bgcolor: "#fff", py: { md: 10, xs: 8 } }}>
        <Container maxWidth="md">
          <Paper
            sx={{
              bgcolor: "#0A0A0F",
              borderRadius: "24px",
              color: "#fff",
              p: { md: 8, xs: 5 },
              textAlign: "center",
            }}
          >
            <Typography
              component="h2"
              sx={{ fontWeight: 700, mb: 2 }}
              variant="h4"
            >
              Not sure if AI is right for your business?
            </Typography>
            <Typography
              sx={{ color: "rgba(255,255,255,0.65)", mb: 4 }}
              variant="h6"
            >
              Book a free 30-minute AI readiness call. We&apos;ll be honest.
            </Typography>
            <Button
              href="https://calendly.com/request-demo-zweidevs/meeting"
              rel="noopener noreferrer"
              size="large"
              sx={{
                bgcolor: "#FF9700",
                px: 5,
                py: 1.75,
                "&:hover": { bgcolor: "#e08600" },
              }}
              target="_blank"
              variant="contained"
            >
              Book Free AI Audit
            </Button>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
