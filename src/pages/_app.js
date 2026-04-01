import { useEffect, useState } from "react";
import Head from "next/head";
import NextApp from "next/app";
import dynamic from "next/dynamic";
const Layout = dynamic(() => import("@component/Components/Layout"));
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";
import "@component/styles/globals.css";
import { getAllServices } from "@component/firebase/firebaseRequests";
import { ServicesContext } from "@component/utils/ServicesContext";

export default function App({ Component, navServices, pageProps }) {
  const [svcList, setSvcList] = useState(navServices || []);

  useEffect(() => {
    if (navServices?.length) {
      setSvcList(navServices);
    }
  }, [navServices]);

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
    <ServicesContext.Provider value={svcList}>
      <Layout>
        <Head>
          <script type="application/ld+json">
            {JSON.stringify(organizationSchema)}
          </script>
          <title>Zweidevs</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </ServicesContext.Provider>
  );
}

App.getInitialProps = async appContext => {
  const appProps = await NextApp.getInitialProps(appContext);
  /* Client-side navigation — skip fetch, state retains last value */
  if (!appContext.ctx.req) {
    return { ...appProps, navServices: [] };
  }
  try {
    const data = await getAllServices();
    const navServices = (data || [])
      .map(svc => ({
        order: Number(svc.order_no ?? svc.order ?? 0),
        slug: svc.slug || "",
        title: svc.title || "",
      }))
      .sort((a, b) =>
        a.order === b.order
          ? a.title.localeCompare(b.title)
          : a.order - b.order,
      );
    return { ...appProps, navServices };
  } catch (_) {
    return { ...appProps, navServices: [] };
  }
};
