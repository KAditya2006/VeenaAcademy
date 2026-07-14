import { Helmet } from "react-helmet-async";
import type { SEOConfig } from "../../types";
import { organizationJsonLd } from "../../lib/seo";

type SEOProps = SEOConfig & { jsonLd?: object };

export function SEO({ title, description, canonical, jsonLd = organizationJsonLd }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {canonical && <meta property="og:url" content={canonical} />}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
