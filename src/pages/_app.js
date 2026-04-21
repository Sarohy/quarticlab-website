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

function buildCanonicalUrl(asPath) {
  const path = (asPath || "/").split(/[?#]/)[0];
  if (path === "/" || path === "") {
    return `${SITE_URL}/`;
  }
  return `${SITE_URL}${path.replace(/\/$/, "")}`;
}

// Turn "ai-ml-development" into "AI ML Development", "ui-ux-design"
// into "UI UX Design". Hand-off friendly defaults; a page can still
// emit its own BreadcrumbList JSON-LD via <Head> to override.
const BREADCRUMB_LABEL_OVERRIDES = {
  "ai-ml-development": "AI & Machine Learning",
  "genai-automation": "GenAI & Automation",
  "ui-ux-design": "UI/UX Design",
  "ai-services": "AI Services",
  "how-we-work": "How We Work",
  devops: "DevOps",
  iot: "IoT",
};

function prettifySegment(segment) {
  if (BREADCRUMB_LABEL_OVERRIDES[segment]) {
    return BREADCRUMB_LABEL_OVERRIDES[segment];
  }
  return segment
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function buildBreadcrumbSchema(asPath) {
  const path = (asPath || "/").split(/[?#]/)[0];
  if (path === "/" || path === "") {
    return null;
  }
  const segments = path.split("/").filter(Boolean);
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
  ];
  let accumulated = "";
  segments.forEach((segment, idx) => {
    accumulated += `/${segment}`;
    items.push({
      "@type": "ListItem",
      position: idx + 2,
      name: prettifySegment(segment),
      item: `${SITE_URL}${accumulated}`,
    });
  });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

export default function App({ Component, navServices, pageProps }) {
  const [svcList, setSvcList] = useState(navServices || []);
  const router = useRouter();
  const canonicalUrl = buildCanonicalUrl(router.asPath);
  const breadcrumbSchema = buildBreadcrumbSchema(router.asPath);

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
            <link href={canonicalUrl} key="canonical-url" rel="canonical" />
            <meta
              content="Quartic Lab"
              key="og:site_name"
              property="og:site_name"
            />
            <meta content="website" key="og:type" property="og:type" />
            <meta content="en_US" key="og:locale" property="og:locale" />
            <meta content={canonicalUrl} key="og:url" property="og:url" />
            <meta content="Quartic Lab" key="og:title" property="og:title" />
            <meta
              content="A full-service software agency building web, mobile, and AI products for startups and enterprises."
              key="og:description"
              property="og:description"
            />
            <meta
              content={`${SITE_URL}/apple-touch-icon.png`}
              key="og:image"
              property="og:image"
            />
            <meta
              content="512"
              key="og:image:width"
              property="og:image:width"
            />
            <meta
              content="512"
              key="og:image:height"
              property="og:image:height"
            />
            <meta
              content="Quartic Lab"
              key="og:image:alt"
              property="og:image:alt"
            />
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
            <meta
              content="Quartic Lab"
              key="twitter:title"
              name="twitter:title"
            />
            <meta
              content="A full-service software agency building web, mobile, and AI products for startups and enterprises."
              key="twitter:description"
              name="twitter:description"
            />
            <meta
              content={`${SITE_URL}/apple-touch-icon.png`}
              key="twitter:image"
              name="twitter:image"
            />
            <script type="application/ld+json">
              {JSON.stringify(organizationSchema)}
            </script>
            {breadcrumbSchema && (
              <script
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(breadcrumbSchema),
                }}
                key="breadcrumb-schema"
                type="application/ld+json"
              />
            )}
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
