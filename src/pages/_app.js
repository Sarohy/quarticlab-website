import { useEffect, useState } from "react";
import Head from "next/head";
import NextApp from "next/app";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import {
  IBM_Plex_Mono,
  Instrument_Serif,
  Space_Grotesk,
} from "next/font/google";
const Layout = dynamic(() => import("@component/Components/Layout"));
import "@component/styles/globals.css";
import { getAllServices } from "@component/firebase/firebaseRequests";
import { ServicesContext } from "@component/utils/ServicesContext";

// Self-hosted fonts via next/font — removes the external Google Fonts
// stylesheet request and drops unused weights (audit F6).
const spaceGrotesk = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});
const instrumentSerif = Instrument_Serif({
  display: "swap",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});
const ibmPlexMono = IBM_Plex_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});

const fontVariables = [
  spaceGrotesk.variable,
  instrumentSerif.variable,
  ibmPlexMono.variable,
].join(" ");

const SITE_URL = (
  process.env.NEXT_PUBLIC_URL || "https://www.quarticlab.com"
).replace(/\/$/, "");

function buildCanonicalUrl(asPath) {
  const path = (asPath || "/").split(/[?#]/)[0];
  if (path === "/" || path === "") {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${path.replace(/\/$/, "")}`;
}

export default function App({ Component, navServices, pageProps }) {
  const [svcList, setSvcList] = useState(navServices || []);
  const router = useRouter();
  const canonicalUrl = buildCanonicalUrl(router.asPath);

  useEffect(() => {
    if (navServices?.length) {
      setSvcList(navServices);
    }
  }, [navServices]);

  const organizationSchema = {
    "@context": "http://schema.org",
    "@type": "Organization",
    name: "Quartic Lab",
    description:
      "A full-service software agency building web, mobile, and AI" +
      " products for startups and enterprises.",
    url: process.env.NEXT_PUBLIC_URL,
    logo: process.env.NEXT_PUBLIC_LOGO,
    sameAs: [
      "https://www.linkedin.com/company/quarticlab",
      "https://twitter.com/quarticlab",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "6-B, Block B Phase 1 Johar Town, Lahore, Punjab, Pakistan",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      postalCode: "54000",
      addressCountry: "Pakistan",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Telephone",
      telephone: "+923094446225",
    },
  };
  return (
    <ServicesContext.Provider value={svcList}>
      <div className={fontVariables} style={{ display: "contents" }}>
        <Layout>
          <Head>
            <link href={canonicalUrl} rel="canonical" />
            <script type="application/ld+json">
              {JSON.stringify(organizationSchema)}
            </script>
            <title>Quartic Lab</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </div>
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
