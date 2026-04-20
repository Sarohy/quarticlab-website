// TODO: build /how-we-work page
import Head from "next/head";
import Link from "next/link";
import Layout from "@component/Components/Layout/Layout";

export default function HowWeWork() {
  return (
    <Layout>
      <Head>
        <title>How We Work | Quartic Lab</title>
        <meta
          content="Learn how Quartic Lab engages with clients — fixed price, time & material, and dedicated team models."
          name="description"
        />
      </Head>
      <main
        style={{
          fontFamily: "var(--font-body)",
          minHeight: "60vh",
          padding: "140px 24px 80px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "var(--ql-copper)",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "2.5px",
            marginBottom: "16px",
            textTransform: "uppercase",
          }}
        >
          Coming soon
        </p>
        <h1
          style={{
            color: "var(--ql-oxford)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 48px)",
            fontStyle: "italic",
            fontWeight: 400,
            marginBottom: "20px",
          }}
        >
          How we work
        </h1>
        <p
          style={{
            color: "var(--ql-oxford)",
            fontSize: "16px",
            lineHeight: 1.6,
            margin: "0 auto 32px",
            maxWidth: "480px",
            opacity: 0.6,
          }}
        >
          Full engagement model details are being prepared. In the meantime, see
          our{" "}
          <Link
            href="/services#engagement-models"
            style={{ color: "var(--ql-copper)" }}
          >
            services page
          </Link>{" "}
          or{" "}
          <Link href="/contact" style={{ color: "var(--ql-copper)" }}>
            get in touch
          </Link>
          .
        </p>
      </main>
    </Layout>
  );
}
