import { useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./blogNew.module.css";

const SITE_URL = "https://www.quarticlab.com";

/* ── hooks ───────────────────────────────────────── */

function useReveal() {
  const refs = useRef([]);

  useEffect(() => {
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
    refs.current.forEach(el => {
      if (el) {
        obs.observe(el);
      }
    });
    return () => obs.disconnect();
  }, []);

  return el => {
    if (el && !refs.current.includes(el)) {
      refs.current.push(el);
    }
  };
}

/* ── page ────────────────────────────────────────── */

const BlogDetail = () => {
  const router = useRouter();
  const addRef = useReveal();
  const { data } = router.query;
  const parsed = data ? JSON.parse(data) : null;

  const requestDemo = () => {
    window.open("https://calendly.com/request-demo-zweidevs/meeting", "_blank");
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>
          {parsed?.title
            ? `${parsed.title} — Quartic Lab`
            : "Blog | Quartic Lab"}
        </title>
        <meta
          content={
            parsed?.title
              ? `Read "${parsed.title}" on the Quartic Lab blog.`
              : "Insights on software development, AI, and digital strategy."
          }
          name="description"
        />
        <link
          href={
            parsed?.id ? `${SITE_URL}/blog/${parsed.id}` : `${SITE_URL}/blog`
          }
          rel="canonical"
        />
        <meta content="article" property="og:type" />
        <meta
          content={parsed?.title || "Blog | Quartic Lab"}
          property="og:title"
        />
        {parsed?.image && <meta content={parsed.image} property="og:image" />}
        <meta content="Quartic Lab" property="og:site_name" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <section aria-label="Article hero" className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          {parsed?.category && (
            <span className={styles.heroBadge}>{parsed.category}</span>
          )}
          <h1 className={styles.heroH1}>{parsed?.title || "Blog post"}</h1>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── CONTENT ──────────────────────────── */}
      <section aria-label="Article content" className={styles.detailSec}>
        <div className={styles.container}>
          {/* hero image */}
          {parsed?.image && (
            <div className={styles.detailHeroImg}>
              <Image
                alt={parsed.title || "Article image"}
                className={styles.detailHeroImgEl}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                src={parsed.image}
              />
            </div>
          )}

          {/* two-column layout: article + sidebar */}
          <div
            className={`${styles.detailLayout} ${styles.reveal}`}
            ref={addRef}
          >
            {/* article body */}
            <article
              className={styles.detailContent}
              dangerouslySetInnerHTML={{
                __html: parsed?.description || "",
              }}
            />

            {/* sidebar */}
            <aside className={styles.detailSidebar}>
              <div className={styles.sidebarCard}>
                {parsed?.category && (
                  <>
                    <span className={styles.sidebarLabel}>Category</span>
                    <span className={styles.sidebarCategory}>
                      {parsed.category}
                    </span>
                  </>
                )}
                <div className={styles.sidebarDivider} />
                <p className={styles.sidebarCta}>
                  Want to work with us on something similar?
                </p>
                <button className={styles.btnPrimary} onClick={requestDemo}>
                  Book a meeting →
                </button>
              </div>
            </aside>
          </div>

          {/* back link */}
          <div className={styles.detailBack}>
            <button
              className={styles.btnOutline}
              onClick={() => router.push("/blog")}
            >
              ← Back to articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
