import { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "./blogNew.module.css";

/* ── hooks ───────────────────────────────────────── */

function useReveal(selector) {
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
      { threshold: 0.1 },
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [selector]);
}

/* ── page ────────────────────────────────────────── */

const BlogDetail = () => {
  const router = useRouter();
  const { data } = router.query;
  const parsed = data ? JSON.parse(data) : null;

  useReveal(`.${styles.reveal}`);

  return (
    <div className={styles.page}>
      <Head>
        <title>{parsed?.title || "Blog"} — Quartic Lab</title>
      </Head>

      {/* ─── HERO ─────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          {parsed?.category && (
            <span className={styles.heroBadge}>{parsed.category}</span>
          )}
          <h1 className={styles.heroH1}>{parsed?.title || "Blog Post"}</h1>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── CONTENT ──────────────────────────── */}
      <section className={styles.detailSec}>
        <div className={styles.container}>
          <article
            className={`${styles.detailContent} ${styles.reveal}`}
            dangerouslySetInnerHTML={{
              __html: parsed?.description || "",
            }}
          />
          <div className={styles.detailBack}>
            <button
              className={styles.btnOutline}
              onClick={() => router.push("/blogNew")}
            >
              ← Back to Articles
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
