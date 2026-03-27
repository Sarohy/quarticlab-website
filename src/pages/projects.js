import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/projectsNew.module.css";

import { getAllProjects } from "../firebase/firebaseRequests";

/* ── MUI ─────────────────────────────────────────── */
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

const SITE_URL = "https://www.zweidevs.com";

/* ── reveal hook ─────────────────────────────────── */
function useReveal() {
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    refs.current.forEach(el => {
      if (el) {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, []);

  return el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
}

/* ── page ────────────────────────────────────────── */

export default function ProjectsNewPage({ projects = [] }) {
  const addRef = useReveal();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = project => {
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const categories = ["All", ...new Set(projects.map(p => p.category))];

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter(p => p.category === activeCategory);

  const requestDemo = () => {
    window.open("https://calendly.com/request-demo-zweidevs/meeting", "_blank");
  };

  /* ── JSON-LD structured data ── */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    description:
      "A curated list of custom software projects built by Zweidevs, " +
      "covering web apps, mobile apps, AI & ML solutions, and blockchain " +
      "platforms.",
    itemListElement: projects.map((p, i) => ({
      "@type": "ListItem",
      item: {
        "@type": "SoftwareApplication",
        author: { "@type": "Organization", name: "Zweidevs", url: SITE_URL },
        description: p.desc,
        name: p.title,
        ...(p.imageUrl ? { image: p.imageUrl } : {}),
      },
      position: i + 1,
    })),
    name: "Zweidevs Portfolio — Software Development Projects",
    numberOfItems: projects.length,
    url: `${SITE_URL}/projects`,
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Portfolio | Zweidevs — Web, Mobile &amp; AI Projects</title>
        <meta
          content={
            "Explore Zweidevs' portfolio of software projects spanning web " +
            "apps, mobile applications, AI & ML solutions, and blockchain " +
            "platforms. Trusted by global clients."
          }
          name="description"
        />
        <meta
          content={
            "software development portfolio, web app development, mobile app " +
            "development, AI ML projects, blockchain development, React " +
            "projects, Node.js projects, custom software"
          }
          name="keywords"
        />
        <link href={`${SITE_URL}/projects`} rel="canonical" />
        <meta content="website" property="og:type" />
        <meta content={`${SITE_URL}/projects`} property="og:url" />
        <meta
          content="Portfolio | Zweidevs — Web, Mobile & AI Projects"
          property="og:title"
        />
        <meta
          content={
            "Explore Zweidevs' portfolio of software projects spanning web " +
            "apps, mobile applications, AI & ML solutions, and blockchain " +
            "platforms."
          }
          property="og:description"
        />
        <meta
          content={`${SITE_URL}/assets/og-projects.jpg`}
          property="og:image"
        />
        <meta content="Zweidevs" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta
          content="Portfolio | Zweidevs — Web, Mobile & AI Projects"
          name="twitter:title"
        />
        <meta
          content={
            "Explore Zweidevs' portfolio of software projects spanning web " +
            "apps, mobile applications, AI & ML solutions, and blockchain " +
            "platforms."
          }
          name="twitter:description"
        />
        <meta
          content={`${SITE_URL}/assets/og-projects.jpg`}
          name="twitter:image"
        />
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </Head>

      {/* ─── HERO BANNER ──────────────────────── */}
      <section aria-label="Portfolio hero banner" className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>💼 Portfolio</span>
          <h1 className={styles.heroH1}>
            Everything Your Business Needs{" "}
            <span className={styles.heroAccent}>Under One Roof</span>
          </h1>
          <p className={styles.heroSub}>
            We&apos;ve worked across multiple verticals and a range of services
            to create engaging and innovative digital experiences.
          </p>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── CATEGORY FILTER ──────────────────── */}
      <section
        aria-label="Filter projects by category"
        className={styles.filterSec}
      >
        <div className={styles.container}>
          <Box display="flex" justifyContent="center">
            <ToggleButtonGroup
              aria-label="Project category filter"
              exclusive
              onChange={(_, val) => {
                if (val !== null) {
                  setActiveCategory(val);
                }
              }}
              sx={{
                flexWrap: "wrap",
                gap: 1,
                "& .MuiToggleButton-root": {
                  border: "1px solid #e0e0e0",
                  borderRadius: "24px !important",
                  color: "#596380",
                  fontSize: "13px",
                  fontWeight: 500,
                  px: 2.5,
                  py: 0.75,
                  textTransform: "none",
                  "&.Mui-selected": {
                    bgcolor: "#FF9700",
                    borderColor: "#FF9700",
                    color: "#fff",
                    "&:hover": { bgcolor: "#e08600" },
                  },
                },
              }}
              value={activeCategory}
            >
              {categories.map(cat => (
                <ToggleButton key={cat} value={cat}>
                  {cat}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Box>
        </div>
      </section>

      {/* ─── PROJECT GRID ─────────────────────── */}
      <section aria-label="Projects portfolio grid" className={styles.gridSec}>
        <div className={styles.container}>
          {filtered.length === 0 ? (
            <Box py={8} textAlign="center">
              <Typography color="text.secondary">
                No projects in this category yet. Check back soon!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filtered.map((p, i) => (
                <Grid item key={p.title} md={4} sm={6} xs={12}>
                  <Box
                    aria-label={`${p.title} project`}
                    className={`${styles.card} ${styles.reveal}`}
                    onClick={() => handleCardClick(p)}
                    onKeyDown={e => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleCardClick(p);
                      }
                    }}
                    ref={addRef}
                    role="button"
                    style={{
                      cursor: "pointer",
                      transitionDelay: `${i * 60}ms`,
                    }}
                    tabIndex={0}
                  >
                    <div className={styles.cardImgWrap}>
                      {p.imageUrl ? (
                        <Image
                          alt={`${p.title} — ${p.desc?.slice(0, 60)}`}
                          className={styles.cardImg}
                          fill
                          sizes={
                            "(max-width: 640px) 100vw, " +
                            "(max-width: 1024px) 50vw, 33vw"
                          }
                          src={p.imageUrl}
                        />
                      ) : (
                        <Box
                          aria-hidden="true"
                          bgcolor="grey.200"
                          height="100%"
                          width="100%"
                        />
                      )}
                    </div>
                    <div className={styles.cardBody}>
                      <Chip
                        label={p.category || "Web"}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,151,0,0.1)",
                          color: "#FF9700",
                          fontWeight: 600,
                          mb: 1,
                        }}
                      />
                      <Typography
                        className={styles.cardTitle}
                        component="h3"
                        variant="h6"
                      >
                        {p.title}
                      </Typography>
                      <Typography
                        className={styles.cardDesc}
                        sx={{
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          display: "-webkit-box",
                          overflow: "hidden",
                        }}
                        variant="body2"
                      >
                        {p.desc}
                      </Typography>
                      {p.metrics && (
                        <Chip
                          label={p.metrics}
                          size="small"
                          sx={{ bgcolor: "warning.light", mt: 1.5 }}
                        />
                      )}
                    </div>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </section>

      {/* ─── PROJECT DETAIL DIALOG ────────────── */}
      <Dialog
        fullWidth
        maxWidth="md"
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
      >
        {selectedProject && (
          <>
            <DialogTitle
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography fontWeight={700} variant="h6">
                {selectedProject.title}
              </Typography>
              <IconButton
                aria-label="Close project details"
                onClick={() => setDialogOpen(false)}
                size="small"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {selectedProject.imageUrl && (
                <Box
                  mb={3}
                  position="relative"
                  sx={{
                    aspectRatio: "16/9",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    alt={selectedProject.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 900px"
                    src={selectedProject.imageUrl}
                    style={{ objectFit: "cover" }}
                  />
                </Box>
              )}
              <Typography mb={2} variant="body1">
                {selectedProject.description || selectedProject.desc}
              </Typography>
              <Box mb={2}>
                <Chip
                  label={selectedProject.category || "Web"}
                  sx={{
                    bgcolor: "rgba(255,151,0,0.1)",
                    color: "#FF9700",
                    fontWeight: 600,
                    mr: 1,
                  }}
                />
                {selectedProject.metrics && (
                  <Chip
                    label={selectedProject.metrics}
                    sx={{
                      bgcolor: "warning.light",
                      color: "warning.dark",
                      mr: 1,
                    }}
                  />
                )}
              </Box>
              {selectedProject.technologies?.length > 0 && (
                <>
                  <Typography mb={1} variant="subtitle2">
                    Technologies
                  </Typography>
                  <Box mb={2}>
                    {selectedProject.technologies.map(tech => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        sx={{ mb: 0.5, mr: 0.5 }}
                      />
                    ))}
                  </Box>
                </>
              )}
              {selectedProject.tags?.length > 0 && (
                <>
                  <Typography mb={1} variant="subtitle2">
                    Tags
                  </Typography>
                  <Box mb={2}>
                    {selectedProject.tags.map(tag => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{ mb: 0.5, mr: 0.5 }}
                        variant="outlined"
                      />
                    ))}
                  </Box>
                </>
              )}
              <Box display="flex" gap={2} mt={2}>
                {selectedProject.liveUrl && (
                  <Button
                    href={selectedProject.liveUrl}
                    rel="noopener noreferrer"
                    sx={{
                      bgcolor: "#FF9700",
                      "&:hover": { bgcolor: "#e08600" },
                    }}
                    target="_blank"
                    variant="contained"
                  >
                    View Live →
                  </Button>
                )}
                {selectedProject.githubUrl && (
                  <Button
                    href={selectedProject.githubUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="outlined"
                  >
                    View Code →
                  </Button>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* ─── CTA BANNER ───────────────────────── */}
      <section
        aria-label="Start a project with Zweidevs"
        className={styles.ctaSec}
      >
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div className={`${styles.ctaText} ${styles.reveal}`} ref={addRef}>
            <h2 className={styles.ctaH2}>Have a Project in Mind?</h2>
            <p className={styles.ctaSub}>
              Let&apos;s discuss how we can bring your vision to life with our
              expert team.
            </p>
          </div>
          <button
            aria-label="Book a meeting with Zweidevs"
            className={`${styles.btnPrimary} ${styles.reveal}`}
            onClick={requestDemo}
            ref={addRef}
          >
            Book a Meeting →
          </button>
        </div>
      </section>
    </div>
  );
}

/* ── data fetching — SSR (always fresh from Firestore) ── */

export async function getServerSideProps() {
  try {
    const data = await getAllProjects();
    const projects = (data || [])
      .map(p => ({
        category: p.category || p.types?.[0] || "Web",
        createdAt: p.createdAt
          ? { seconds: p.createdAt.seconds ?? 0 }
          : { seconds: 0 },
        desc: p.desc || p.description || "",
        description: p.description || p.desc || "",
        githubUrl: p.githubUrl || null,
        imageUrl: p.imageUrl || p.image || null,
        liveUrl: p.liveUrl || p.projectUrl || null,
        metrics: p.metrics || null,
        tags: Array.isArray(p.tags) ? p.tags : [],
        technologies: Array.isArray(p.technologies) ? p.technologies : [],
        title: p.title || "",
        types: Array.isArray(p.types) ? p.types : p.type ? [p.type] : ["web"],
      }))
      .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
    return { props: { projects } };
  } catch (err) {
    return { props: { projects: [] } };
  }
}
