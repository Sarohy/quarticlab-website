import Head from "next/head";
import styles from "@component/styles/Home.module.css";

export default function HowWeWork() {
  return (
    <>
      <Head>
        <title>How We Work | ZweiDevs</title>
        <meta
          content={
            "Learn about ZweiDevs' process — how we " +
            "collaborate, build, and deliver software solutions."
          }
          name="description"
        />
      </Head>
      <main className={styles.comingSoonPage}>
        <h1>How We Work</h1>
        <p>This page is coming soon. Stay tuned!</p>
      </main>
    </>
  );
}
