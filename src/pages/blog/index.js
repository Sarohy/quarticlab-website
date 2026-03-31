// TODO: Connect to a CMS or Firestore 'blog_posts' collection when content is ready.
// For now, using static placeholder cards.
import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { getApiWithoutAuth } from "../api/api";
import styles from "./blogNew.module.css";

/* ── hooks ───────────────────────────────────────── */

function useReveal(selector, dep) {
  useEffect(() => {
    const els = document.querySelectorAll(selector);
    if (!els.length) {
      return;
    }
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add(styles.visible);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector, dep]);
}

/* ── page ────────────────────────────────────────── */

const BlogNew = () => {
  const router = useRouter();
  const filters = ["All", "Marketing", "Technology", "Grow"];
  const [active, setActive] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  useReveal(`.${styles.reveal}`, animKey);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resp = await getApiWithoutAuth("blogs/");
      if (resp?.data?.success) {
        const results = resp.data.data?.results || [];
        const mapped = results.map(item => ({
          id: item.pk,
          image: item.thumbnail,
          title: item.title,
          description: item.content,
          category: item?.tags?.[0]?.name || "Technology",
        }));
        setBlogData(mapped);
      }
    } catch {
      /* silent */
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = f => {
    setActive(f);
    setAnimKey(p => p + 1);
  };

  const filtered =
    active === "All" ? blogData : blogData.filter(b => b.category === active);

  const navigateToPost = item => {
    router.push({
      pathname: `/blogNew/${item.id}`,
      query: { data: JSON.stringify(item) },
    });
  };

  const requestDemo = () => {
    window.open("https://calendly.com/request-demo-zweidevs/meeting", "_blank");
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Blog | Zweidevs</title>
        <meta
          content="Read the latest insights on web development, mobile apps, blockchain, AI, and digital strategy from the Zweidevs team."
          name="description"
        />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <span className={styles.heroBadge}>📝 Top Articles</span>
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

      {/* ─── FILTER + ARTICLES ────────────────── */}
      <section className={styles.articlesSec}>
        <div className={styles.container}>
          <div className={styles.articlesHeader}>
            <h2 className={styles.articlesHeading}>Insights from the Team</h2>
            <div className={styles.filterBar}>
              {filters.map(f => (
                <button
                  className={`${styles.filterBtn} ${
                    active === f ? styles.filterActive : ""
                  }`}
                  key={f}
                  onClick={() => handleFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className={styles.loadingWrap}>
              <div className={styles.spinner} />
              <p className={styles.loadingText}>Loading articles...</p>
            </div>
          ) : filtered.length === 0 ? (
            <PlaceholderCards />
          ) : (
            <div className={styles.grid} key={animKey}>
              {filtered.map((item, i) => (
                <div
                  className={`${styles.card} ${styles.reveal}`}
                  key={item.id}
                  onClick={() => navigateToPost(item)}
                  style={{
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <div className={styles.cardImgWrap}>
                    {item.image && (
                      <Image
                        alt={item.title}
                        className={styles.cardImg}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        src={item.image}
                      />
                    )}
                    <span className={styles.cardCategory}>{item.category}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <div
                      className={styles.cardExcerpt}
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                    <span className={styles.readMore}>Read More →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────── */}
      <section className={styles.ctaSec}>
        <div className={styles.container}>
          <div className={`${styles.ctaCard} ${styles.reveal}`}>
            <h2 className={styles.ctaH2}>
              Not Finding The Right Fit? Stay Connected
            </h2>
            <button className={styles.btnPrimary} onClick={requestDemo}>
              Book a Meeting →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ── static placeholder cards ────────────────────── */

const placeholderPosts = [
  {
    id: "placeholder-1",
    category: "AI",
    title: "How Generative AI Is Reshaping Product Development",
    excerpt:
      "From ideation to deployment, AI-assisted workflows are cutting " +
      "delivery cycles in half. Here's what we've seen in the field.",
    author: "Abdul Rehman Sarohy",
    date: "March 15, 2026",
  },
  {
    id: "placeholder-2",
    category: "Blockchain",
    title: "Building Trust with On-Chain Verification",
    excerpt:
      "Why smart-contract-based audit trails are becoming the default " +
      "for supply-chain and fintech projects in 2026.",
    author: "Ali Zain",
    date: "February 28, 2026",
  },
  {
    id: "placeholder-3",
    category: "Web Dev",
    title: "Next.js 15 Performance Patterns We're Using Right Now",
    excerpt:
      "Server Components, Partial Pre-rendering, and edge caching — " +
      "a practical guide from our engineering team.",
    author: "Zweidevs Team",
    date: "January 20, 2026",
  },
];

function PlaceholderCards() {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: {
          md: "repeat(3, 1fr)",
          sm: "repeat(2, 1fr)",
          xs: "1fr",
        },
      }}
    >
      {placeholderPosts.map(post => (
        <Card
          key={post.id}
          sx={{
            borderRadius: 2,
            boxShadow: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box bgcolor="grey.200" height={180} />
          <CardContent sx={{ flexGrow: 1 }}>
            <Chip label={post.category} size="small" sx={{ mb: 1.5 }} />
            <Typography
              component="h3"
              gutterBottom
              sx={{ fontWeight: 700 }}
              variant="h6"
            >
              {post.title}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                display: "-webkit-box",
                overflow: "hidden",
              }}
              variant="body2"
            >
              {post.excerpt}
            </Typography>
          </CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              pb: 2,
              px: 2,
            }}
          >
            <Typography color="text.disabled" variant="caption">
              {post.author} &middot; {post.date}
            </Typography>
            <Typography
              color="text.disabled"
              sx={{ cursor: "not-allowed" }}
              variant="caption"
            >
              Read more &rarr;
            </Typography>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

export default BlogNew;

export async function getStaticProps() {
  return {
    props: {
      data: [{ image: "jdfksjfsk" }],
    },
  };
}
