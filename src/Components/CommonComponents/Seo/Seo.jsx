import Head from "next/head";
import { SITE_URL } from "@component/utils/siteUrl";

const SITE_NAME = "Quartic Lab";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_IMAGE_WIDTH = "1200";
const DEFAULT_IMAGE_HEIGHT = "630";

/**
 * Centralised SEO head block.
 *
 * Props:
 *   title            — <title> and og:title fallback
 *   description      — meta description and og:description fallback
 *   canonical        — canonical href; also used as og:url
 *   ogTitle          — overrides og:title (defaults to title)
 *   ogDescription    — overrides og:description (defaults to description)
 *   ogImage          — og:image URL (defaults to /og-image.png)
 *   ogImageWidth     — og:image:width (defaults to "1200")
 *   ogImageHeight    — og:image:height (defaults to "630")
 *   ogImageAlt       — og:image:alt (defaults to site name)
 *   twitterTitle     — twitter:title (defaults to ogTitle)
 *   twitterDescription — twitter:description (defaults to ogDescription)
 *   twitterImage     — twitter:image (defaults to ogImage)
 *   robots           — meta robots content (optional)
 *   keywords         — meta keywords content (optional)
 *   children         — additional <Head> children, e.g. JSON-LD scripts
 */
export default function Seo({
  canonical,
  children,
  description,
  keywords,
  ogDescription,
  ogImage,
  ogImageAlt,
  ogImageHeight,
  ogImageWidth,
  ogTitle,
  robots,
  title,
  twitterDescription,
  twitterImage,
  twitterTitle,
}) {
  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDesc = ogDescription ?? description;
  const resolvedTwTitle = twitterTitle ?? resolvedOgTitle;
  const resolvedTwDesc = twitterDescription ?? resolvedOgDesc;
  const resolvedImage = ogImage ?? DEFAULT_OG_IMAGE;
  const resolvedTwImage = twitterImage ?? resolvedImage;
  const resolvedImageAlt = ogImageAlt ?? SITE_NAME;
  const resolvedImageWidth = ogImageWidth ?? DEFAULT_IMAGE_WIDTH;
  const resolvedImageHeight = ogImageHeight ?? DEFAULT_IMAGE_HEIGHT;

  return (
    <Head>
      {title && <title>{title}</title>}
      {description && (
        <meta content={description} key="description" name="description" />
      )}
      {canonical && (
        <link href={canonical} key="canonical-url" rel="canonical" />
      )}
      {canonical && <meta content={canonical} key="og:url" property="og:url" />}
      {robots && <meta content={robots} key="robots" name="robots" />}
      {keywords && <meta content={keywords} key="keywords" name="keywords" />}
      {resolvedOgTitle && (
        <meta content={resolvedOgTitle} key="og:title" property="og:title" />
      )}
      {resolvedOgDesc && (
        <meta
          content={resolvedOgDesc}
          key="og:description"
          property="og:description"
        />
      )}
      <meta content={resolvedImage} key="og:image" property="og:image" />
      <meta
        content={resolvedImageWidth}
        key="og:image:width"
        property="og:image:width"
      />
      <meta
        content={resolvedImageHeight}
        key="og:image:height"
        property="og:image:height"
      />
      <meta
        content={resolvedImageAlt}
        key="og:image:alt"
        property="og:image:alt"
      />
      {resolvedTwTitle && (
        <meta
          content={resolvedTwTitle}
          key="twitter:title"
          name="twitter:title"
        />
      )}
      {resolvedTwDesc && (
        <meta
          content={resolvedTwDesc}
          key="twitter:description"
          name="twitter:description"
        />
      )}
      <meta
        content={resolvedTwImage}
        key="twitter:image"
        name="twitter:image"
      />
      {children}
    </Head>
  );
}
