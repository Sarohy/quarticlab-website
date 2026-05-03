import { useEffect, useMemo, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { getBlogBySlug } from "@component/firebase/firebaseRequests";
import { SITE_URL } from "@component/utils/siteUrl";
import styles from "./blogNew.module.css";

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

function countWords(html = "") {
  return html
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function estimateReadTime(html = "") {
  return Math.max(1, Math.round(countWords(html) / 200));
}

function parseHeadings(html = "") {
  const out = [];
  const re = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h[23]>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push({
      id: m[2],
      level: parseInt(m[1], 10),
      text: m[3].replace(/<[^>]+>/g, ""),
    });
  }
  return out;
}

/* ── hooks ───────────────────────────────── */
function useReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return pct;
}

function useScrollSpy(headingIds) {
  const [activeId, setActiveId] = useState("");
  const key = headingIds.join("|");

  useEffect(() => {
    if (!headingIds.length) {
      return;
    }
    const elements = headingIds
      .map(id => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) {
      return;
    }

    const obs = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length === 0) {
          return;
        }
        visible.sort(
          (a, b) =>
            a.target.getBoundingClientRect().top -
            b.target.getBoundingClientRect().top,
        );
        setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px", threshold: 0 },
    );

    elements.forEach(el => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return activeId;
}

function useEnhanceArticle(ref, html) {
  useEffect(() => {
    const root = ref.current;
    if (!root) {
      return;
    }

    // Add hover-reveal anchor links to headings with ids
    root.querySelectorAll("h2[id], h3[id]").forEach(h => {
      if (h.querySelector(`.${styles.anchorLink}`)) {
        return;
      }
      const a = document.createElement("a");
      a.href = `#${h.id}`;
      a.className = styles.anchorLink;
      a.setAttribute("aria-label", `Link to ${h.textContent}`);
      a.textContent = "#";
      h.appendChild(a);
    });

    // Add language label + copy button to code blocks
    const cleanups = [];
    root.querySelectorAll("pre").forEach(pre => {
      if (pre.querySelector(`.${styles.codeCopyBtn}`)) {
        return;
      }
      const code = pre.querySelector("code");
      const langClass =
        code &&
        Array.from(code.classList || []).find(c => c.startsWith("language-"));
      if (langClass) {
        const label = document.createElement("span");
        label.className = styles.codeLang;
        label.textContent = langClass.replace("language-", "");
        pre.appendChild(label);
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = styles.codeCopyBtn;
      btn.textContent = "Copy";
      const handler = () => {
        const text = code ? code.innerText : pre.innerText;
        if (!navigator.clipboard) {
          return;
        }
        navigator.clipboard.writeText(text).then(() => {
          btn.textContent = "✓ Copied";
          setTimeout(() => {
            btn.textContent = "Copy";
          }, 1800);
        });
      };
      btn.addEventListener("click", handler);
      pre.appendChild(btn);
      cleanups.push(() => btn.removeEventListener("click", handler));
    });

    return () => cleanups.forEach(fn => fn());
  }, [ref, html]);
}

/* ── icons ───────────────────────────────── */
function IconLinkedIn() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="14"
      viewBox="0 0 24 24"
      width="14"
    >
      <path d="M20.4 3H3.6A.6.6 0 0 0 3 3.6v16.8a.6.6 0 0 0 .6.6h16.8a.6.6 0 0 0 .6-.6V3.6a.6.6 0 0 0-.6-.6ZM8.3 18.3H5.7V9.7h2.6v8.6Zm-1.3-9.8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm11.3 9.8h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H10V9.7h2.5v1.2h.1c.4-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.7 3.2 4v4.8Z" />
    </svg>
  );
}

function IconX() {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      focusable="false"
      height="14"
      viewBox="0 0 24 24"
      width="14"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231ZM17.083 19.77h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function IconLink() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="14"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.4"
      viewBox="0 0 24 24"
      width="14"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ── scroll progress (top bar) ───────────── */
function ScrollProgress({ pct }) {
  return (
    <div
      aria-hidden="true"
      className={styles.scrollProgress}
      style={{ width: `${pct}%` }}
    />
  );
}

/* ── back to top with radial progress ────── */
function BackToTop({ pct }) {
  const visible = pct > 25;
  if (!visible) {
    return null;
  }
  const C = 2 * Math.PI * 20;
  const offset = C * (1 - pct / 100);
  return (
    <button
      aria-label="Back to top"
      className={styles.backToTop}
      onClick={() => window.scrollTo({ behavior: "smooth", top: 0 })}
    >
      <svg
        aria-hidden="true"
        className={styles.backToTopRing}
        focusable="false"
        height="48"
        viewBox="0 0 48 48"
        width="48"
      >
        <circle
          cx="24"
          cy="24"
          fill="none"
          r="20"
          stroke="oklch(95% 0.018 75 / 0.15)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          fill="none"
          r="20"
          stroke="var(--ql-copper)"
          strokeDasharray={C}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth="2"
          transform="rotate(-90 24 24)"
        />
      </svg>
      <span aria-hidden="true" className={styles.backToTopArrow}>
        ↑
      </span>
    </button>
  );
}

/* ── vertical share rail (desktop only) ──── */
function ShareRail({ title }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : SITE_URL;
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title || "");

  const handleCopy = () => {
    if (!navigator.clipboard) {
      return;
    }
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  return (
    <aside aria-label="Share article" className={styles.shareRail}>
      <span className={styles.shareRailLabel}>Share</span>
      <a
        aria-label="Share on LinkedIn"
        className={styles.shareRailBtn}
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <IconLinkedIn />
      </a>
      <a
        aria-label="Share on X"
        className={styles.shareRailBtn}
        href={`https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <IconX />
      </a>
      <button
        aria-label="Copy link"
        className={styles.shareRailBtn}
        onClick={handleCopy}
        type="button"
      >
        {copied ? <IconCheck /> : <IconLink />}
      </button>
    </aside>
  );
}

/* ── reading-progress card (sidebar) ─────── */
function ProgressCard({ pct, readingTime }) {
  const minsLeft = Math.max(0, Math.round(readingTime * (1 - pct / 100)));
  return (
    <div className={styles.progressCard}>
      <div className={styles.progressLabel}>
        <span className={styles.progressPct}>{Math.round(pct)}%</span>
        <span className={styles.progressMin}>
          {pct >= 99 ? "Complete" : `${minsLeft} min left`}
        </span>
      </div>
      <div aria-hidden="true" className={styles.progressBar}>
        <div className={styles.progressFill} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/* ── scroll-spy table of contents ────────── */
function TableOfContents({ activeId, headings, mobile }) {
  const [open, setOpen] = useState(!mobile);

  if (headings.length < 3) {
    return null;
  }

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) {
      return;
    }
    const top = el.getBoundingClientRect().top + window.pageYOffset - 88;
    window.scrollTo({ behavior: "smooth", top });
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Article contents"
      className={mobile ? styles.tocMobile : styles.tocCard}
    >
      <button
        aria-expanded={open}
        className={styles.tocToggle}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        On this page
        <span aria-hidden="true" className={styles.tocChevron}>
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <ol className={styles.tocList}>
          {headings.map(h => (
            <li
              className={`${
                h.level === 3 ? styles.tocSubItem : styles.tocItem
              } ${activeId === h.id ? styles.tocActive : ""}`}
              key={h.id}
            >
              <a
                className={styles.tocLink}
                href={`#${h.id}`}
                onClick={e => handleClick(e, h.id)}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}

/* ── newsletter ──────────────────────────── */
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
const BlogDetail = ({ post, fetchStatus }) => {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState("idle");
  const contentRef = useRef(null);

  const headings = useMemo(
    () => parseHeadings(post?.contentHtml || ""),
    [post?.contentHtml],
  );
  const headingIds = useMemo(() => headings.map(h => h.id), [headings]);

  const pct = useReadingProgress();
  const activeId = useScrollSpy(headingIds);
  useEnhanceArticle(contentRef, post?.contentHtml);

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
        confirmed: false,
        email,
        slug: post?.slug,
        source: "blog_detail",
        subscribedAt: new Date().toISOString(),
      });
      setSubStatus("done");
      setEmail("");
    } catch {
      setSubStatus("error");
    }
  };

  if (fetchStatus === "loading") {
    return (
      <div className={styles.page}>
        <ScrollProgress pct={0} />
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

  const wordCount = countWords(post.contentHtml || "");
  const readingTime =
    post.readingTime || estimateReadTime(post.contentHtml || "");
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const authorName = post.author || "Quartic Lab";
  const authorInitial = authorName.charAt(0).toUpperCase();

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
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              author: {
                "@type": "Organization",
                name: "Quartic Lab",
                url: "https://www.quarticlab.com/",
              },
              dateModified: post.updatedAt || post.publishedDate,
              datePublished: post.publishedDate,
              headline: post.title,
              image: post.heroImage,
              mainEntityOfPage: `https://www.quarticlab.com/blog/${post.slug}`,
              publisher: {
                "@type": "Organization",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.quarticlab.com/mark-dark.svg",
                },
                name: "Quartic Lab",
              },
            }),
          }}
          type="application/ld+json"
        />
      </Head>

      <ScrollProgress pct={pct} />
      <BackToTop pct={pct} />

      {/* ─── HEADER ───────────────────────────── */}
      <header aria-label="Article header" className={styles.detailHeader}>
        <div className={styles.detailHeaderInner}>
          <Link className={styles.backLink} href="/blog">
            ← Back to blog
          </Link>

          {post.heroImage && (
            <div className={styles.heroCover}>
              <Image
                alt={post.title || "Article cover image"}
                className={styles.heroCoverImg}
                fill
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
                src={post.heroImage}
              />
            </div>
          )}
        </div>
      </header>

      {/* ─── CONTENT ──────────────────────────── */}
      <section aria-label="Article content" className={styles.detailSec}>
        <div className={styles.container}>
          <div className={styles.detailLayout}>
            <ShareRail title={post.title} />

            <div className={styles.detailBodyCol}>
              {headings.length >= 3 && (
                <TableOfContents
                  activeId={activeId}
                  headings={headings}
                  mobile
                />
              )}
              <div className={styles.detailHeaderText}>
                <h1 className={styles.detailHeaderH1}>{post.title}</h1>
                {post.metaDescription && (
                  <p className={styles.detailHeaderDeck}>
                    {post.metaDescription}
                  </p>
                )}

                <div className={styles.detailMeta}>
                  <div className={styles.detailMetaAuthor}>
                    <span
                      aria-hidden="true"
                      className={styles.detailMetaAvatar}
                    >
                      {authorInitial}
                    </span>
                    <div className={styles.detailMetaAuthorText}>
                      <strong className={styles.detailAuthor}>
                        {authorName}
                      </strong>
                      <span className={styles.detailMetaDate}>
                        {formatDate(post.publishedDate)}
                      </span>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className={styles.detailMetaDivider}
                  />
                  <div className={styles.detailMetaStats}>
                    <span>{readingTime} min read</span>
                    <span aria-hidden="true" className={styles.cardDot}>
                      ·
                    </span>
                    <span>{wordCount.toLocaleString()} words</span>
                  </div>
                </div>
              </div>
              <article
                className={styles.detailContent}
                dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
                ref={contentRef}
              />

              <div className={styles.authorBio}>
                <div aria-hidden="true" className={styles.authorAvatar}>
                  {authorInitial}
                </div>
                <div className={styles.authorBioText}>
                  <span className={styles.authorBioLabel}>Written by</span>
                  <strong className={styles.authorBioName}>{authorName}</strong>
                  <p className={styles.authorBioDesc}>
                    Writing from inside the product — engineers building real
                    software for real clients.
                  </p>
                </div>
              </div>

              <div className={styles.detailNewsletter}>
                <span className={styles.detailNewsletterTag}>Newsletter</span>
                <h3 className={styles.detailNewsletterH}>
                  Get engineering notes in your inbox.
                </h3>
                <p className={styles.detailNewsletterSub}>
                  One email every 2 weeks. No fluff, no tracking pixels.
                </p>
                <NewsletterForm
                  email={email}
                  onEmailChange={setEmail}
                  onSubmit={handleSubscribe}
                  subStatus={subStatus}
                />
              </div>

              <div className={styles.detailBack}>
                <Link className={styles.btnOutline} href="/blog">
                  ← Back to articles
                </Link>
              </div>
            </div>

            <aside className={styles.detailSidebar}>
              <div className={styles.sidebarStack}>
                <ProgressCard pct={pct} readingTime={readingTime} />

                {headings.length >= 3 && (
                  <TableOfContents
                    activeId={activeId}
                    headings={headings}
                    mobile={false}
                  />
                )}

                <div className={styles.sidebarCtaCard}>
                  <span className={styles.sidebarLabel}>Work with us</span>
                  <p className={styles.sidebarCta}>
                    Need help shipping something like this?
                  </p>
                  <Link className={styles.sidebarCtaBtn} href="/contact">
                    Start a project
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className={styles.sidebarTagsCard}>
                    <span className={styles.sidebarLabel}>Tags</span>
                    <div className={styles.tagList}>
                      {post.tags.map(t => (
                        <span className={styles.tag} key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────── */}
      <section aria-label="Contact CTA" className={styles.ctaSec}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <span className={styles.ctaTag}>Let&apos;s build</span>
            <h2 className={styles.ctaH2}>
              Bring us the brief. We&apos;ll bring the team.
            </h2>
            <p className={styles.ctaSub}>
              Book a 30-min call with a senior engineer — or send a project
              brief and get a written estimate within 12 hours.
            </p>
            <div className={styles.ctaBtns}>
              <a
                className={styles.btnPrimary}
                href="https://calendly.com/quarticlab/30min"
                rel="noopener noreferrer"
                target="_blank"
              >
                Book a call
              </a>
              <Link className={styles.btnGhost} href="/contact">
                Send a brief →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;

export async function getServerSideProps(context) {
  const { slug } = context.params;
  try {
    const post = await getBlogBySlug(slug);
    if (!post) {
      return { props: { post: null, fetchStatus: "notfound" } };
    }
    // Firestore Timestamp objects are not JSON-serializable.
    // Convert any Timestamp fields to ISO strings before returning props.
    const serializeTimestamp = val => {
      if (val && typeof val === "object" && typeof val.toDate === "function") {
        return val.toDate().toISOString();
      }
      return val ?? null;
    };
    const serialized = {
      ...post,
      createdAt: serializeTimestamp(post.createdAt),
      publishedAt: serializeTimestamp(post.publishedAt),
      updatedAt: serializeTimestamp(post.updatedAt),
    };
    return { props: { fetchStatus: "ok", post: serialized } };
  } catch {
    return { props: { fetchStatus: "error", post: null } };
  }
}
