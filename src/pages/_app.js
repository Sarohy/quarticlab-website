import { useEffect, useState } from "react";
import Head from "next/head";
import NextApp from "next/app";
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
import { SITE_URL } from "@component/utils/siteUrl";

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

export default function App({ Component, navServices, pageProps }) {
  const [svcList, setSvcList] = useState(navServices || []);

  useEffect(() => {
    if (navServices?.length) {
      setSvcList(navServices);
    }
  }, [navServices]);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "Quartic Lab",
    legalName: "Quartic Lab",
    description:
      "A full-service software agency building web, mobile, and AI" +
      " products for startups and enterprises.",
    url: `${SITE_URL}/`,
    logo: process.env.NEXT_PUBLIC_LOGO || `${SITE_URL}/mark-dark.svg`,
    foundingDate: "2020",
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
      addressCountry: "PK",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+923094446225",
      availableLanguage: ["English"],
    },
  };
  return (
    <ServicesContext.Provider value={svcList}>
      <div className={fontVariables} style={{ display: "contents" }}>
        <Layout>
          <Head>
            <meta
              content="Quartic Lab"
              key="og:site_name"
              property="og:site_name"
            />
            <meta content="website" key="og:type" property="og:type" />
            <meta content="en_US" key="og:locale" property="og:locale" />
            <meta
              content="summary_large_image"
              key="twitter:card"
              name="twitter:card"
            />
            <meta
              content="@quarticlab"
              key="twitter:site"
              name="twitter:site"
            />
            <script type="application/ld+json">
              {JSON.stringify(organizationSchema)}
            </script>
            <script
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Home",
                      item: "https://www.quarticlab.com/",
                    },
                  ],
                }),
              }}
              type="application/ld+json"
            />
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
