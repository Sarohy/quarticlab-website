import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import { getApiWithoutAuth } from "../api/api";
import styles from "./blogNew.module.css";

const SITE_URL = "https://www.quarticlab.com";

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

const BlogPage = () => {
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
      pathname: `/blog/${item.id}`,
      query: { data: JSON.stringify(item) },
    });
  };

  const requestDemo = () => {
    window.open("https://calendly.com/request-demo-zweidevs/meeting", "_blank");
  };

  return (
    <div className={styles.page}>
      <Head>
        <title>Blog | Quartic Lab</title>
        <meta
          content={
            "Read the latest insights on web development, mobile apps, " +
            "blockchain, AI, and digital strategy from the Quartic Lab team."
          }
          name="description"
        />
        <link href={`${SITE_URL}/blog`} rel="canonical" />
        <meta content="website" property="og:type" />
        <meta content={`${SITE_URL}/blog`} property="og:url" />
        <meta content="Blog | Quartic Lab" property="og:title" />
        <meta
          content={
            "Insights on web development, AI, blockchain, and digital " +
            "strategy from the Quartic Lab team."
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
          <span className={styles.heroBadge}>Insights</span>
          <h1 className={styles.heroH1}>
            Ideas, craft, and{" "}
            <span className={styles.heroAccent}>engineering</span>
          </h1>
          <p className={styles.heroSub}>
            Practical perspectives from our team on software development, AI,
            blockchain, and building products that last.
          </p>
        </div>
        <div className={styles.heroWave} />
      </section>

      {/* ─── FILTER + ARTICLES ────────────────── */}
      <section aria-label="Blog articles" className={styles.articlesSec}>
        <div className={styles.container}>
          <div className={styles.articlesHeader}>
            <h2 className={styles.articlesHeading}>Insights from the team</h2>
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
              <p className={styles.loadingText}>Loading articles…</p>
            </div>
          ) : filtered.length === 0 ? (
            <PlaceholderCards />
          ) : (
            <div className={styles.grid} key={animKey}>
              {filtered.map((item, i) => (
                <article
                  className={`${styles.card} ${styles.reveal}`}
                  key={item.id}
                  onClick={() => navigateToPost(item)}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className={styles.cardImgWrap}>
                    {item.image ? (
                      <Image
                        alt={item.title}
                        className={styles.cardImg}
                        fill
                        sizes={
                          "(max-width: 640px) 100vw, " +
                          "(max-width: 1024px) 50vw, 33vw"
                        }
                        src={item.image}
                      />
                    ) : (
                      <div className={styles.cardImgPlaceholder} />
                    )}
                    <div className={styles.cardOverlay} />
                    <span className={styles.cardCategory}>{item.category}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <div
                      className={styles.cardExcerpt}
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <div className={styles.cardFooter}>
                      <span className={styles.readMore}>Read article →</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ─── CTA BANNER ───────────────────────── */}
      <section aria-label="Newsletter CTA" className={styles.ctaSec}>
        <div className={`${styles.container} ${styles.ctaInner}`}>
          <div className={`${styles.ctaText} ${styles.reveal}`}>
            <h2 className={styles.ctaH2}>Want to stay ahead of the curve?</h2>
            <p className={styles.ctaSub}>
              Book a call with our team to discuss how the latest technology can
              move your business forward.
            </p>
          </div>
          <button className={styles.btnPrimary} onClick={requestDemo}>
            Book a meeting →
          </button>
        </div>
      </section>
    </div>
  );
};

/* ── placeholder cards (shown when API returns no data) ── */

const placeholderPosts = [
  {
    id: "placeholder-1",
    author: "Abdul Rehman Sarohy",
    category: "AI",
    date: "March 15, 2026",
    excerpt:
      "From ideation to deployment, AI-assisted workflows are cutting " +
      "delivery cycles in half. Here's what we've seen in the field.",
    title: "How generative AI is reshaping product development",
  },
  {
    id: "placeholder-2",
    author: "Ali Zain",
    category: "Blockchain",
    date: "February 28, 2026",
    excerpt:
      "Why smart-contract-based audit trails are becoming the default " +
      "for supply-chain and fintech projects in 2026.",
    title: "Building trust with on-chain verification",
  },
  {
    id: "placeholder-3",
    author: "Quartic Lab",
    category: "Web Dev",
    date: "January 20, 2026",
    excerpt:
      "Server Components, Partial Pre-rendering, and edge caching — " +
      "a practical guide from our engineering team.",
    title: "Next.js 15 performance patterns we're using right now",
  },
];

function PlaceholderCards() {
  return (
    <div className={styles.placeholderGrid}>
      {placeholderPosts.map(post => (
        <article className={styles.placeholderCard} key={post.id}>
          <div className={styles.placeholderImgWrap}>
            <div className={styles.placeholderImgInner} />
          </div>
          <div className={styles.placeholderBody}>
            <span className={styles.placeholderTag}>{post.category}</span>
            <h3 className={styles.placeholderTitle}>{post.title}</h3>
            <p className={styles.placeholderExcerpt}>{post.excerpt}</p>
            <div className={styles.placeholderMeta}>
              <span>{post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default BlogPage;

export async function getStaticProps() {
  return {
    props: {},
  };
}
