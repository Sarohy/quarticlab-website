import { useEffect, useRef, useState } from "react";
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

const BLOG_KICKER =
  "ENGINEERING NOTES · DEEP-DIVES / POST-MORTEMS / OPINIONS · EVERY 2 WEEKS";

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
const BlogPage = ({ initialError, initialPosts }) => {
  const [active, setActive] = useState("All");
  const [blogData, setBlogData] = useState(initialPosts || []);
  const [status, setStatus] = useState(
    initialError ? "error" : (initialPosts || []).length ? "ok" : "empty",
  );
  const [animKey, setAnimKey] = useState(0);
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle");
  const kickerRef = useRef(null);

  useReveal(`.${styles.reveal}`, animKey);

  /* scramble the hero kicker on mount */
  useEffect(() => {
    const el = kickerRef.current;
    if (!el) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = BLOG_KICKER;
      return;
    }
    const glyphs = "◆#/\\+×—·01";
    const total = 44;
    let frame = 0;
    let tid = null;
    const tick = () => {
      let out = "";
      for (let i = 0; i < BLOG_KICKER.length; i++) {
        const threshold = (i / BLOG_KICKER.length) * total * 0.8;
        out +=
          frame > threshold
            ? BLOG_KICKER[i]
            : BLOG_KICKER[i] === " "
              ? " "
              : glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      el.textContent = out;
      if (frame++ < total) {
        tid = setTimeout(tick, 34);
      } else {
        el.textContent = BLOG_KICKER;
      }
    };
    tick();
    return () => clearTimeout(tid);
  }, []);

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

  const countFor = key =>
    key === "All"
      ? blogData.length
      : blogData.filter(b => b.category === key).length;

  const visibleCategories = CATEGORIES.filter(
    c => c.key === "All" || countFor(c.key) > 0,
  );

  const filtered =
    active === "All" ? blogData : blogData.filter(b => b.category === active);

  const featured = filtered[0];
  const rest = filtered.slice(1);

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
      <header className={styles.bhero}>
        <div className={styles.container}>
          <span className={styles.kick} ref={kickerRef}>
            &nbsp;
          </span>
          <h1 className={styles.h1}>
            <span className={styles.ln}>
              <span>Engineering notes</span>
            </span>
            <span className={styles.ln}>
              <span>
                from the <em>team.</em>
              </span>
            </span>
          </h1>
          <p className={styles.heroLead}>
            Technical deep-dives, post-mortems, and opinionated takes on
            shipping software. Written by the engineers who built it — not the
            marketing team.
          </p>
        </div>
      </header>

      {/* ─── FILTER BAR ───────────────────────── */}
      {status === "ok" && (
        <div className={styles.fbar} id="posts">
          <div className={`${styles.container} ${styles.fbarIn}`}>
            <div
              aria-label="Filter posts"
              className={styles.fpills}
              role="group"
            >
              {visibleCategories.map(c => (
                <button
                  aria-pressed={active === c.key}
                  className={`${styles.fpill} ${
                    active === c.key ? styles.on : ""
                  }`}
                  key={c.key}
                  onClick={() => handleFilter(c.key)}
                >
                  {c.key === "All" ? "ALL" : c.label.toUpperCase()}
                  <b>{countFor(c.key)}</b>
                </button>
              ))}
            </div>
            <span className={styles.fcount}>
              <b>{filtered.length}</b> PUBLISHED
            </span>
          </div>
        </div>
      )}

      {/* ─── POSTS ────────────────────────────── */}
      <section className={styles.postsSec}>
        <div className={styles.container}>
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
                Subscribe below to be notified when we publish.
              </p>
            </div>
          )}

          {status === "ok" && (
            <div key={`${active}-${animKey}`}>
              {featured && <FeaturedCard item={featured} />}
              {rest.length > 0 && (
                <div className={styles.bgrid}>
                  {rest.map((item, i) => (
                    <ArticleCard index={i} item={item} key={item.slug} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ─── NEWSLETTER + CALL (dark) ─────────── */}
      <section className={styles.subSec}>
        <div className={`${styles.container} ${styles.subGrid}`}>
          <div className={`${styles.subCard} ${styles.reveal}`}>
            <span className={styles.eb}>
              <i />
              The newsletter
            </span>
            <h3 className={styles.subCardH3}>
              Get engineering notes in your <em>inbox.</em>
            </h3>
            <p className={styles.subCardP}>
              One email every 2 weeks. Technical deep-dives, case studies, and
              occasional opinions. No promotional fluff. Unsubscribe anytime.
            </p>
            <NewsletterForm
              email={email}
              onEmailChange={setEmail}
              onSubmit={handleSubscribe}
              subStatus={subStatus}
            />
          </div>
          <div className={`${styles.callCard} ${styles.reveal}`}>
            <span className={styles.eb}>
              <i />
              Or skip the reading
            </span>
            <h3 className={styles.callCardH3}>Prefer a conversation?</h3>
            <p className={styles.callCardP}>
              Book a 30-min call with an engineer. No sales pitch — just a
              discussion about what you&apos;re building.
            </p>
            <a
              className={styles.callBtn}
              href="https://calendly.com/quarticlab/30min"
              rel="noopener noreferrer"
              target="_blank"
            >
              Book a call <span className={styles.arr}>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

/* ── featured post (large) ───────────────── */
function FeaturedCard({ item }) {
  return (
    <Link
      className={`${styles.fpost} ${styles.reveal}`}
      href={`/blog/${item.slug}`}
    >
      <div className={styles.fshot}>
        {item.heroImage ? (
          <Image
            alt={item.title}
            className={styles.coverImg}
            fill
            priority
            sizes="(max-width: 1040px) 100vw, 55vw"
            src={item.heroImage}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.imgPlaceholder} />
        )}
      </div>
      <div className={styles.fb}>
        <span className={styles.kcat}>
          {item.category}
          <span className={styles.lat}>LATEST</span>
        </span>
        <h3 className={styles.fpostTitle}>{item.title}</h3>
        <p className={styles.fpostExcerpt}>{item.metaDescription}</p>
        <PostMeta item={item} />
        <span className={styles.kread}>
          READ ARTICLE <span>→</span>
        </span>
      </div>
    </Link>
  );
}

/* ── article card ────────────────────────── */
function ArticleCard({ index, item }) {
  return (
    <Link
      className={styles.bp}
      href={`/blog/${item.slug}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={styles.bpShot}>
        {item.heroImage ? (
          <Image
            alt={item.title}
            className={styles.coverImg}
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 1040px) 50vw, 33vw"
            src={item.heroImage}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <div className={styles.imgPlaceholder} />
        )}
      </div>
      <div className={styles.bb}>
        <span className={styles.kcat}>{item.category}</span>
        <h3 className={styles.bpTitle}>{item.title}</h3>
        <p className={styles.bpExcerpt}>{item.metaDescription}</p>
        <PostMeta item={item} />
      </div>
    </Link>
  );
}

/* ── post meta line ──────────────────────── */
function PostMeta({ item }) {
  return (
    <div className={styles.kmeta}>
      <b>{item.author}</b>
      <span>·</span>
      <span>{formatDate(item.publishedDate)}</span>
      <span>·</span>
      <span>{item.readingTime} min read</span>
    </div>
  );
}

/* ── skeleton grid ───────────────────────── */
function SkeletonGrid() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading articles"
      className={styles.bgrid}
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div className={styles.skeletonCard} key={i}>
          <div className={styles.skeletonImg} />
          <div className={styles.skeletonBody}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTag}`} />
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
            <div
              className={`${styles.skeletonLine} ${styles.skeletonExcerpt}`}
            />
            <div className={`${styles.skeletonLine} ${styles.skeletonMeta}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── newsletter form (dark sub-card) ─────── */
function NewsletterForm({ email, onEmailChange, onSubmit, subStatus }) {
  if (subStatus === "done") {
    return (
      <p className={styles.subDone}>
        ◆ SUBSCRIBED — first note arrives with the next issue.
      </p>
    );
  }
  return (
    <form className={styles.subForm} onSubmit={onSubmit}>
      <input
        aria-label="Email address"
        autoComplete="email"
        className={styles.subInput}
        disabled={subStatus === "sending"}
        onChange={e => onEmailChange(e.target.value)}
        placeholder="you@company.com"
        required
        type="email"
        value={email}
      />
      <button
        className={styles.subBtn}
        disabled={subStatus === "sending"}
        type="submit"
      >
        {subStatus === "sending" ? "Subscribing…" : "Subscribe"}
        <span className={styles.arr}>→</span>
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
