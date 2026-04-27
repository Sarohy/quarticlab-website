import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import {
  getAllBlogs,
  subscribeEmail,
} from "@component/firebase/firebaseRequests";
import { SITE_URL } from "@component/utils/siteUrl";
import styles from "./blogNew.module.css";

const CATEGORIES = [
  { key: "All", label: "All" },
  { key: "Engineering", label: "Engineering" },
  { key: "AI & ML", label: "AI & ML" },
  { key: "Product", label: "Product" },
  { key: "Business", label: "Business" },
];

/* ── tag → display category ──────────────── */
function tagToCategory(tags = []) {
  if (!tags || !tags.length) {
    return "Engineering";
  }
  const s = tags.join(" ").toLowerCase();
  if (
    s.includes("agentic") ||
    s.includes(" ai") ||
    s.includes("ml") ||
    s.includes("machine learning") ||
    s.includes("llm") ||
    s.includes("gpt")
  ) {
    return "AI & ML";
  }
  if (
    s.includes("product") ||
    s.includes("shipping") ||
    s.includes("saas") ||
    s.includes("workflow")
  ) {
    return "Product";
  }
  if (
    s.includes("business") ||
    s.includes("agency") ||
    s.includes("pricing") ||
    s.includes("client")
  ) {
    return "Business";
  }
  return "Engineering";
}

/* ── helpers ─────────────────────────────── */
function estimateReadTime(html = "") {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(str) {
  if (!str) {
    return "";
  }
  const d = new Date(str);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/* ── hooks ───────────────────────────────── */
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

/* ── page ────────────────────────────────── */
const BlogPage = ({ initialPosts, initialError }) => {
  const [active, setActive] = useState("All");
  const [blogData, setBlogData] = useState(initialPosts || []);
  const [status, setStatus] = useState(
    initialError ? "error" : (initialPosts || []).length ? "ok" : "empty",
  );
  const [animKey, setAnimKey] = useState(0);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle");

  useReveal(`.${styles.reveal}`, animKey);

  /* Client-side retry only — initial data comes from getServerSideProps */
  const fetchData = async () => {
    setStatus("loading");
    try {
      const results = await getAllBlogs();
      if (results && results.length) {
        const mapped = results
          .filter(item => item.status === "published")
          .map(item => ({
            slug: item.slug,
            heroImage: item.heroImage || "",
            title: item.title || "",
            metaDescription: item.metaDescription || "",
            author: item.author || "Quartic Lab",
            publishedDate: item.publishedDate || "",
            readingTime: item.readingTime || estimateReadTime(item.contentHtml),
            tags: item.tags || [],
            category: tagToCategory(item.tags),
            contentHtml: item.contentHtml || "",
          }));
        setBlogData(mapped);
        setStatus(mapped.length ? "ok" : "empty");
        setAnimKey(k => k + 1);
      } else {
        setStatus("empty");
      }
    } catch {
      setStatus("error");
    }
  };

  const handleFilter = f => {
    setActive(f);
    setAnimKey(p => p + 1);
  };

  const countFor = key => blogData.filter(b => b.category === key).length;

  const visibleCategories = CATEGORIES.filter(
    c => c.key === "All" || countFor(c.key) > 0,
  );

  const filtered =
    active === "All" ? blogData : blogData.filter(b => b.category === active);

  const handleSubscribe = async e => {
    e.preventDefault();
    if (!email) {
      return;
    }
    setSubStatus("sending");
    try {
      await subscribeEmail({
        email,
        source: "blog_listing",
        subscribedAt: new Date().toISOString(),
        confirmed: false,
      });
      setSubStatus("done");
      setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Engineering Notes — Quartic Lab Blog</title>
        <meta
          content={
            "Technical deep-dives, post-mortems, and opinionated takes on " +
            "shipping software. Written by the engineers who built it."
          }
          name="description"
        />
        {/* Noindex until posts exist — status is known at SSR time */}
        {status !== "ok" && <meta content="noindex, follow" name="robots" />}
        <link href={`${SITE_URL}/blog`} rel="canonical" />
        <meta content="website" property="og:type" />
        <meta content={`${SITE_URL}/blog`} property="og:url" />
        <meta
          content="Engineering Notes — Quartic Lab Blog"
          property="og:title"
        />
        <meta
          content={
            "Technical deep-dives, post-mortems, and opinionated takes on " +
            "shipping software."
          }
          property="og:description"
        />
        <meta content="Quartic Lab" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <section aria-label="Blog hero" className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <h1 className={styles.heroH1}>
            Engineering notes{" "}
            <span className={styles.heroAccent}>from the team</span>
          </h1>
          <p className={styles.heroSub}>
            Technical deep-dives, post-mortems, and opinionated takes on
            shipping software. Written by the engineers who built it — not the
            marketing team.
          </p>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── FILTER + ARTICLES ────────────────── */}
      <section aria-label="Blog articles" className={styles.articlesSec}>
        <div className={styles.container}>
          <div
            aria-label="Filter by category"
            className={styles.filterBar}
            role="group"
          >
            {visibleCategories.map(c => (
              <button
                aria-pressed={active === c.key}
                className={`${styles.filterBtn} ${
                  active === c.key ? styles.filterActive : ""
                }`}
                key={c.key}
                onClick={() => handleFilter(c.key)}
              >
                {c.label}
                {c.key !== "All" && status === "ok" && (
                  <span className={styles.filterCount}>{countFor(c.key)}</span>
                )}
              </button>
            ))}
          </div>

          {status === "loading" && <SkeletonGrid />}

          {status === "error" && (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>
                Couldn&apos;t load articles right now.
              </p>
              <button className={styles.btnPrimary} onClick={fetchData}>
                Retry
              </button>
              <p className={styles.emptyMeta}>
                If this keeps happening, reach out:{" "}
                <a href="mailto:contact@quarticlab.com">
                  contact@quarticlab.com
                </a>
              </p>
            </div>
          )}

          {status === "empty" && (
            <div className={styles.emptyState}>
              <p className={styles.emptyTitle}>
                No articles yet — but we&apos;re writing them now.
              </p>
              <p className={styles.emptyMeta}>
                Subscribe to be notified when we publish.
              </p>
              <NewsletterForm
                email={email}
                onEmailChange={setEmail}
                onSubmit={handleSubscribe}
                subStatus={subStatus}
              />
            </div>
          )}

          {status === "ok" && (
            <div className={styles.grid} key={animKey}>
              {filtered.map((item, i) => (
                <ArticleCard index={i} item={item} key={item.slug} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── NEWSLETTER ───────────────────────── */}
      <section aria-label="Newsletter signup" className={styles.newsletterSec}>
        <div className={`${styles.container} ${styles.newsletterInner}`}>
          <div className={`${styles.newsletterText} ${styles.reveal}`}>
            <h2 className={styles.newsletterH2}>
              Get engineering notes in your inbox.
            </h2>
            <p className={styles.newsletterSub}>
              One email every 2 weeks. Technical deep-dives, case studies, and
              occasional opinions. No promotional fluff. Unsubscribe anytime.
            </p>
          </div>
          <div className={styles.newsletterForm}>
            <NewsletterForm
              email={email}
              onEmailChange={setEmail}
              onSubmit={handleSubscribe}
              subStatus={subStatus}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

/* ── article card ────────────────────────── */
function ArticleCard({ item, index }) {
  return (
    <Link
      className={`${styles.card} ${styles.reveal}`}
      href={`/blog/${item.slug}`}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className={styles.cardImgWrap}>
        {item.heroImage ? (
          <Image
            alt={item.title}
            className={styles.cardImg}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={item.heroImage}
          />
        ) : (
          <div className={styles.cardImgPlaceholder} />
        )}
        <div className={styles.cardOverlay} />
        <span className={styles.cardCategory}>{item.category}</span>
      </div>
      <div className={styles.cardBody}>
        <h3 className={styles.cardTitle}>{item.title}</h3>
        <p className={styles.cardExcerpt}>{item.metaDescription}</p>
        <div className={styles.cardMeta}>
          <span className={styles.cardAuthor}>{item.author}</span>
          <span className={styles.cardDot}>·</span>
          <span>{formatDate(item.publishedDate)}</span>
          <span className={styles.cardDot}>·</span>
          <span>{item.readingTime} min read</span>
        </div>
        <div className={styles.cardFooter}>
          <span className={styles.readMore}>Read article →</span>
        </div>
      </div>
    </Link>
  );
}

/* ── skeleton grid ───────────────────────── */
function SkeletonGrid() {
  return (
    <div aria-busy="true" aria-label="Loading articles" className={styles.grid}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div className={styles.skeletonCard} key={i}>
          <div className={styles.skeletonImg} />
          <div className={styles.skeletonBody}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTag}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
            <div
              className={`${styles.skeletonLine} ${styles.skeletonTitleShort}`}
            />
            <div
              className={`${styles.skeletonLine} ${styles.skeletonExcerpt}`}
            />
            <div
              className={`${styles.skeletonLine} ${styles.skeletonExcerptShort}`}
            />
            <div className={`${styles.skeletonLine} ${styles.skeletonMeta}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── newsletter form ─────────────────────── */
function NewsletterForm({ email, onEmailChange, onSubmit, subStatus }) {
  if (subStatus === "done") {
    return (
      <p className={styles.subDone}>
        ✓ You&apos;re on the list — check your inbox to confirm.
      </p>
    );
  }
  return (
    <form className={styles.subForm} onSubmit={onSubmit}>
      <input
        aria-label="Email address"
        className={styles.subInput}
        disabled={subStatus === "sending"}
        onChange={e => onEmailChange(e.target.value)}
        placeholder="your@email.com"
        required
        type="email"
        value={email}
      />
      <button
        className={styles.btnPrimary}
        disabled={subStatus === "sending"}
        type="submit"
      >
        {subStatus === "sending" ? "Subscribing…" : "Subscribe"}
      </button>
      {subStatus === "error" && (
        <span className={styles.subError}>
          Something went wrong — try again.
        </span>
      )}
    </form>
  );
}

export default BlogPage;

export async function getServerSideProps() {
  try {
    const results = await getAllBlogs();
    const posts = (results || [])
      .filter(item => item.status === "published")
      .map(item => ({
        slug: item.slug,
        heroImage: item.heroImage || "",
        title: item.title || "",
        metaDescription: item.metaDescription || "",
        author: item.author || "Quartic Lab",
        publishedDate: item.publishedDate || "",
        readingTime: item.readingTime || estimateReadTime(item.contentHtml),
        tags: item.tags || [],
        category: tagToCategory(item.tags),
        /* strip contentHtml — not needed on the listing page */
        contentHtml: "",
      }));
    return { props: { initialPosts: posts, initialError: false } };
  } catch {
    return { props: { initialPosts: [], initialError: true } };
  }
}
