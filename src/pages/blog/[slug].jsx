import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Seo from "@component/Components/CommonComponents/Seo/Seo";
import { getBlogBySlug } from "@component/firebase/firebaseRequests";
import { SITE_URL } from "@component/utils/siteUrl";
import styles from "./blogDetail.module.css";

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
  if (pct <= 25) {
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
          stroke="oklch(20% 0.05 255 / 0.14)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          fill="none"
          r="20"
          stroke="var(--ql-copper-dk)"
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

/* ── reading ring meter (sidebar) ────────── */
function ReadingMeter({ pct, readingTime }) {
  const minsLeft = Math.max(0, Math.round(readingTime * (1 - pct / 100)));
  const C = 2 * Math.PI * 22;
  const offset = C * (1 - pct / 100);
  return (
    <div className={styles.scard}>
      <h4 className={styles.scardH4}>Reading</h4>
      <div className={styles.meterRow}>
        <div className={styles.ring}>
          <svg height="52" viewBox="0 0 52 52" width="52">
            <circle className={styles.ringBg} cx="26" cy="26" r="22" />
            <circle
              className={styles.ringFg}
              cx="26"
              cy="26"
              r="22"
              strokeDasharray={C}
              strokeDashoffset={offset}
            />
          </svg>
          <b className={styles.ringPct}>{Math.round(pct)}%</b>
        </div>
        <span>{pct >= 99 ? "COMPLETE" : `${minsLeft} MIN LEFT`}</span>
      </div>
    </div>
  );
}

/* ── table of contents links ─────────────── */
function TocLinks({ activeId, headings }) {
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
    <nav aria-label="Article contents" className={styles.toc}>
      {headings.map(h => (
        <a
          className={`${styles.tocLink} ${h.level === 3 ? styles.tocSub : ""} ${
            activeId === h.id ? styles.tocOn : ""
          }`}
          href={`#${h.id}`}
          key={h.id}
          onClick={e => handleClick(e, h.id)}
        >
          {h.text}
        </a>
      ))}
    </nav>
  );
}

/* ── mobile table of contents ────────────── */
function MobileToc({ activeId, headings }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`${styles.mtoc} ${open ? styles.mtocOpen : ""}`}>
      <button
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        type="button"
      >
        ON THIS PAGE
        <span aria-hidden="true" className={styles.mtocIc}>
          +
        </span>
      </button>
      <div className={styles.mtocBody}>
        <TocLinks activeId={activeId} headings={headings} />
      </div>
    </div>
  );
}

/* ── share card (sidebar) ────────────────── */
function ShareCard({ title }) {
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
    <div className={styles.scard}>
      <h4 className={styles.scardH4}>Share</h4>
      <div className={styles.shareRow}>
        <a
          className={styles.shb}
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encoded}&title=${encodedTitle}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          LINKEDIN
        </a>
        <a
          className={styles.shb}
          href={`https://x.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          X
        </a>
        <button className={styles.shb} onClick={handleCopy} type="button">
          {copied ? "COPIED" : "COPY"}
        </button>
      </div>
    </div>
  );
}

/* ── newsletter ──────────────────────────── */
function NewsletterForm({ email, onEmailChange, onSubmit, subStatus }) {
  if (subStatus === "done") {
    return (
      <p className={styles.subDone}>
        ◆ SUBSCRIBED — check your inbox to confirm.
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
        className={styles.btnSub}
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
const BlogDetail = ({ fetchStatus, post }) => {
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
        <div className={styles.container}>
          <div className={styles.skeletonHero} />
          <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonMeta}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonPara}`} />
          <div className={`${styles.skeletonLine} ${styles.skeletonPara}`} />
        </div>
      </div>
    );
  }

  if (fetchStatus === "notfound" || fetchStatus === "error") {
    return (
      <div className={styles.page}>
        <div className={styles.emptyState}>
          <p className={styles.emptyTitle}>Article not found.</p>
          <Link className={styles.btnPrimary} href="/blog">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const readingTime =
    post.readingTime || estimateReadTime(post.contentHtml || "");
  const canonicalUrl = `${SITE_URL}/blog/${post.slug}`;
  const authorName = post.author || "Quartic Lab";
  const authorInitial = authorName.charAt(0).toUpperCase();
  const category = post.category || post.tags?.[0] || "Engineering";
  // Word count intentionally dropped from the byline — length is not a
  // ranking signal and the visible "X WORDS" trained the wrong instinct.
  const bylineMeta = [
    formatDate(post.publishedDate).toUpperCase(),
    `${readingTime} MIN READ`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={styles.page}>
      <Seo
        canonical={canonicalUrl}
        description={post.metaDescription || post.title}
        ogImage={post.heroImage || undefined}
        ogImageAlt={post.title || "Quartic Lab"}
        ogTitle={post.title}
        title={
          post.title ? `${post.title} — Quartic Lab` : "Blog | Quartic Lab"
        }
      >
        {/* og:type overrides the global "website" from _app.js for articles */}
        <meta content="article" key="og:type" property="og:type" />
        {post.publishedDate && (
          <meta
            content={post.publishedDate}
            key="article:published_time"
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
                url: `${SITE_URL}/`,
              },
              dateModified: post.updatedAt || post.publishedDate,
              datePublished: post.publishedDate,
              headline: post.title,
              image: post.heroImage,
              mainEntityOfPage: canonicalUrl,
              publisher: {
                "@type": "Organization",
                logo: {
                  "@type": "ImageObject",
                  url: `${SITE_URL}/mark-dark.svg`,
                },
                name: "Quartic Lab",
              },
            }),
          }}
          type="application/ld+json"
        />
      </Seo>

      <ScrollProgress pct={pct} />
      <BackToTop pct={pct} />

      {/* ─── ARTICLE HERO ─────────────────────── */}
      <header className={styles.ah}>
        <div className={styles.container}>
          <div className={styles.crumb}>
            <Link href="/blog">← BACK TO BLOG</Link>
            <span>/</span>
            <span>{category.toUpperCase()}</span>
          </div>
          <span className={styles.kcat}>{category} · ENGINEERING NOTES</span>
          <h1 className={styles.ahTitle}>{post.title}</h1>
          {post.metaDescription && (
            <p className={styles.dek}>{post.metaDescription}</p>
          )}
          <div className={styles.byline}>
            <span aria-hidden="true" className={styles.av}>
              {authorInitial}
            </span>
            <div>
              <b>{authorName}</b>
              <span className={styles.bm}>{bylineMeta}</span>
            </div>
          </div>
          {post.heroImage && (
            <figure className={styles.heroFig}>
              <Image
                alt={post.title || "Article cover image"}
                className={styles.heroFigImg}
                height={630}
                priority
                sizes="(max-width: 1100px) 100vw, 1100px"
                src={post.heroImage}
                width={1200}
              />
            </figure>
          )}
        </div>
      </header>

      {/* ─── LAYOUT ───────────────────────────── */}
      <div className={`${styles.container} ${styles.layout}`}>
        {/* sidebar */}
        <aside aria-label="Article tools" className={styles.side}>
          <div className={styles.sideIn}>
            <ReadingMeter pct={pct} readingTime={readingTime} />

            {headings.length >= 3 && (
              <div className={styles.scard}>
                <h4 className={styles.scardH4}>On this page</h4>
                <TocLinks activeId={activeId} headings={headings} />
              </div>
            )}

            <ShareCard title={post.title} />

            <div className={`${styles.scard} ${styles.workCard}`}>
              <h4 className={styles.scardH4}>Work with us</h4>
              <p className={styles.workCardP}>
                Need help shipping something like this?
              </p>
              <Link className={styles.workCardLink} href="/contact">
                START A PROJECT →
              </Link>
            </div>
          </div>
        </aside>

        {/* article */}
        <main>
          {headings.length >= 3 && (
            <MobileToc activeId={activeId} headings={headings} />
          )}

          <article
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
            ref={contentRef}
          />

          {post.tags && post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.map(t => (
                <span className={styles.tg} key={t}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className={styles.endcards}>
            <div className={styles.endc}>
              <div className={styles.who}>
                <span aria-hidden="true" className={styles.endcAv}>
                  {authorInitial}
                </span>
                <div>
                  <b>{authorName}</b>
                </div>
              </div>
              <p className={styles.endcP}>
                Writing from inside the product — engineers building real
                software for real clients.
              </p>
            </div>

            <div className={styles.endc}>
              <h4 className={styles.scardH4}>Newsletter</h4>
              <b className={styles.endcLead}>
                Get engineering notes in your inbox.
              </b>
              <p className={styles.endcP}>
                One email every 2 weeks. No fluff, no tracking pixels.
              </p>
              <NewsletterForm
                email={email}
                onEmailChange={setEmail}
                onSubmit={handleSubscribe}
                subStatus={subStatus}
              />
            </div>
          </div>

          <p className={styles.backrow}>
            <Link href="/blog">← BACK TO ARTICLES</Link>
          </p>
        </main>
      </div>

      {/* ─── CTA BAND ─────────────────────────── */}
      <section className={styles.ctaBand}>
        <div className={styles.container}>
          <span className={`${styles.eb} ${styles.ebCenter}`}>
            <i />
            Let&apos;s build
          </span>
          <h2 className={styles.ctaH2}>
            Bring us the brief. We&apos;ll bring the <em>team.</em>
          </h2>
          <p className={styles.ctaSub}>
            Book a 30-min call with a senior engineer — or send a project brief
            and get a written estimate within 12 hours.
          </p>
          <div className={styles.ctaBtns}>
            <a
              className={styles.ctaBtnPrimary}
              href="https://calendly.com/quarticlab/30min"
              rel="noopener noreferrer"
              target="_blank"
            >
              Book a call <span className={styles.arr}>→</span>
            </a>
            <Link className={styles.ctaBtnSecondary} href="/contact">
              Send a brief <span className={styles.arr}>→</span>
            </Link>
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
