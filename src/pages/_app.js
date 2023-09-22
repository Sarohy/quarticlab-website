import Head from "next/head";
import { Layout } from "@component/Components";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "@component/styles/globals.css";

export default function App({ Component, pageProps }) {
  const organizationSchema = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Zweidevs (Pvt) Ltd",
    description:
      "Zweidevs is a service-oriented company providing creative and innovative solutions for your business domain. We believe in exceeding your expectations by delivering thoughtfully innovated eye-catching products on your desk. We take a pride in engineering your requirements into robust software using our mobile, web, cloud and e-commerce capabilities",
    url: process.env.NEXT_PUBLIC_URL,
    logo: process.env.NEXT_PUBLIC_LOGO,
    address: {
      "@type": "PostalAddress",
      streetAddress:
        " 6-B, Block B Phase 1 Johar Town, Lahore, Punjab , Pakistan",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      postalCode: "54000",
      addressCountry: "Pakistan",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_TELEPHONE,
      contactType: "Telephone",
    },
  };
  return (
    <Layout>
      <Head>
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        <title>Zweidevs</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
