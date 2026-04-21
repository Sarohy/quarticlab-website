import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getBlogBySlug } from "@component/firebase/firebaseRequests";
import styles from "./blogNew.module.css";

const SITE_URL = "https://www.quarticlab.com";

/* ── helpers ─────────────────────────────── */
function formatDate(str) {
  if (!str) {
    return "";
  }
  const d = new Date(str);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadTime(html = "") {
  const words = html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

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
    s.includes("llm")
  ) {
    return "AI & ML";
  }
  if (s.includes("product") || s.includes("saas") || s.includes("workflow")) {
    return "Product";
  }
  if (s.includes("business") || s.includes("agency")) {
    return "Business";
  }
  return "Engineering";
}

/* ── scroll progress bar ─────────────────── */
function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={styles.scrollProgress}
      style={{ width: `${pct}%` }}
    />
  );
}

/* ── back to top ─────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setVisible(total > 0 && scrolled / total > 0.5);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) {
    return null;
  }
  return (
    <button
      aria-label="Back to top"
      className={styles.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      ↑
    </button>
  );
}

/* ── copy link ───────────────────────────── */
function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : SITE_URL;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "");

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.shareBar}>
      <span className={styles.shareLabel}>Share:</span>
      <button
        aria-label="Copy link"
        className={styles.shareBtn}
        onClick={handleCopy}
      >
        {copied ? "✓ Copied" : "Copy link"}
      </button>
      <a
        aria-label="Share on LinkedIn"
        className={styles.shareBtn}
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        LinkedIn
      </a>
      <a
        aria-label="Share on X"
        className={styles.shareBtn}
        href={`https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        X / Twitter
      </a>
    </div>
  );
}

/* ── table of contents ───────────────────── */
function TableOfContents({ html }) {
  const [open, setOpen] = useState(true);
  const headings = [];
  const re = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    headings.push({
      level: parseInt(m[1], 10),
      id: m[2],
      text: m[3].replace(/<[^>]+>/g, ""),
    });
  }
  if (headings.length < 3) {
    return null;
  }
  return (
    <nav aria-label="Table of contents" className={styles.toc}>
      <button
        aria-expanded={open}
        className={styles.tocToggle}
        onClick={() => setOpen(o => !o)}
      >
        Contents {open ? "▲" : "▼"}
      </button>
      {open && (
        <ol className={styles.tocList}>
          {headings.map(h => (
            <li
              className={h.level === 3 ? styles.tocSubItem : styles.tocItem}
              key={h.id}
            >
              <a className={styles.tocLink} href={`#${h.id}`}>
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
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

/* ── page ────────────────────────────────── */
const BlogDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [fetchStatus, setFetchStatus] = useState("loading");
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle");
  const contentRef = useRef(null);

  useEffect(() => {
    if (!slug) {
      return;
    }
    setFetchStatus("loading");
    getBlogBySlug(slug)
      .then(data => {
        if (data) {
          setPost(data);
          setFetchStatus("ok");
        } else {
          setFetchStatus("notfound");
        }
      })
      .catch(() => setFetchStatus("error"));
  }, [slug]);

  const handleSubscribe = async e => {
    e.preventDefault();
    if (!email) {
      return;
    }
    setSubStatus("sending");
    const { subscribeEmail } = await import(
      "@component/firebase/firebaseRequests"
    );
    try {
      await subscribeEmail({
        email,
        source: "blog_detail",
        slug,
        subscribedAt: new Date().toISOString(),
        confirmed: false,
      });
      setSubStatus("done");
      setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  if (fetchStatus === "loading" || !slug) {
    return (
      <div className={styles.page}>
        <ScrollProgress />
        <div className={styles.detailLoadingWrap}>
          <div className={styles.skeletonDetailHero} />
          <div className={styles.container}>
            <div className={styles.skeletonDetailBody}>
              <div
                className={`${styles.skeletonLine} ${styles.skeletonDetailTitle}`}
              />
              <div
                className={`${styles.skeletonLine} ${styles.skeletonDetailMeta}`}
              />
              <div
                className={`${styles.skeletonLine} ${styles.skeletonDetailPara}`}
              />
              <div
                className={`${styles.skeletonLine} ${styles.skeletonDetailPara}`}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (fetchStatus === "notfound" || fetchStatus === "error") {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState} style={{ paddingTop: "120px" }}>
          <p className={styles.emptyTitle}>Article not found.</p>
          <Link className={styles.btnPrimary} href="/blog">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const category = tagToCategory(post.tags);
  const readingTime =
    post.readingTime || estimateReadTime(post.contentHtml || "");
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <div className={styles.page}>
      <Head>
        <title>
          {post.title ? `${post.title} — Quartic Lab` : "Blog | Quartic Lab"}
        </title>
        <meta content={post.metaDescription || post.title} name="description" />
        <link href={canonicalUrl} rel="canonical" />
        <meta content="article" property="og:type" />
        <meta content={canonicalUrl} property="og:url" />
        <meta content={post.title} property="og:title" />
        <meta
          content={post.metaDescription || post.title}
          property="og:description"
        />
        {post.heroImage && (
          <meta content={post.heroImage} property="og:image" />
        )}
        <meta content="Quartic Lab" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
        {post.publishedDate && (
          <meta
            content={post.publishedDate}
            property="article:published_time"
          />
        )}
      </Head>

      <ScrollProgress />
      <BackToTop />

      {/* ─── HERO ─────────────────────────────── */}
      <section aria-label="Article hero" className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <Link className={styles.backLink} href="/blog">
            ← Back to blog
          </Link>
          <span className={styles.heroBadge}>{category}</span>
          <h1 className={styles.heroH1}>{post.title}</h1>

          {/* meta row */}
          <div className={styles.detailMeta}>
            <span className={styles.detailAuthor}>{post.author}</span>
            <span className={styles.cardDot}>·</span>
            <span>{formatDate(post.publishedDate)}</span>
            <span className={styles.cardDot}>·</span>
            <span>{readingTime} min read</span>
          </div>

          {/* share bar */}
          <ShareBar title={post.title} />
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── CONTENT ──────────────────────────── */}
      <section aria-label="Article content" className={styles.detailSec}>
        <div className={styles.container}>
          {/* hero image */}
          {post.heroImage && (
            <div className={styles.detailHeroImg}>
              <Image
                alt={post.title || "Article image"}
                className={styles.detailHeroImgEl}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                src={post.heroImage}
              />
            </div>
          )}

          {/* two-col: body + sidebar */}
          <div className={styles.detailLayout}>
            {/* article body */}
            <div>
              {post.contentHtml && <TableOfContents html={post.contentHtml} />}
              <article
                className={styles.detailContent}
                dangerouslySetInnerHTML={{
                  __html: post.contentHtml || "",
                }}
                ref={contentRef}
              />

              {/* author bio */}
              <div className={styles.authorBio}>
                <div aria-hidden="true" className={styles.authorAvatar}>
                  {(post.author || "Q").charAt(0).toUpperCase()}
                </div>
                <div className={styles.authorBioText}>
                  <strong className={styles.authorBioName}>
                    {post.author || "Quartic Lab"}
                  </strong>
                  <p className={styles.authorBioDesc}>
                    Writing from inside the product — engineers building real
                    software for real clients.
                  </p>
                </div>
              </div>

              {/* newsletter */}
              <div className={styles.detailNewsletter}>
                <h3 className={styles.detailNewsletterH}>
                  Get engineering notes in your inbox.
                </h3>
                <p className={styles.detailNewsletterSub}>
                  One email every 2 weeks. No fluff.
                </p>
                <NewsletterForm
                  email={email}
                  onEmailChange={setEmail}
                  onSubmit={handleSubscribe}
                  subStatus={subStatus}
                />
              </div>
            </div>

            {/* sidebar */}
            <aside className={styles.detailSidebar}>
              <div className={styles.sidebarCard}>
                <span className={styles.sidebarLabel}>Category</span>
                <span className={styles.sidebarCategory}>{category}</span>

                <div className={styles.sidebarDivider} />

                <p className={styles.sidebarCta}>
                  Need help shipping something like this?
                </p>
                <Link className={styles.btnPrimary} href="/contact">
                  Start a project →
                </Link>

                <div className={styles.sidebarDivider} />

                {post.tags && post.tags.length > 0 && (
                  <>
                    <span className={styles.sidebarLabel}>Tags</span>
                    <div className={styles.tagList}>
                      {post.tags.map(t => (
                        <span className={styles.tag} key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </aside>
          </div>

          {/* back link */}
          <div className={styles.detailBack}>
            <Link className={styles.btnOutline} href="/blog">
              ← Back to articles
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────── */}
      <section aria-label="Contact CTA" className={styles.ctaSec}>
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div className={styles.ctaText}>
            <h2 className={styles.ctaH2}>Need help shipping this?</h2>
            <p className={styles.ctaSub}>
              Book a 30-min call with an engineer. No sales pitch — just a
              discussion about what you&apos;re building.
            </p>
          </div>
          <Link className={styles.btnPrimary} href="/contact">
            Book a call →
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
