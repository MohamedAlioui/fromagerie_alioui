import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
}

const BASE_URL = 'https://fromageriealioui.tn';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

const SEO = ({ title, description, canonical, ogImage = DEFAULT_IMAGE, schema }: SEOProps) => {
  const fullTitle = title === 'Fromagerie Alioui'
    ? 'Fromagerie Alioui — Fromages Artisanaux Tunisiens | Mozzarella, Ricotta, Sicilien Blanc'
    : `${title} | Fromagerie Alioui`;
  const canonicalUrl = canonical ? `${BASE_URL}${canonical}` : BASE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Fromagerie Alioui" />
      <meta property="og:locale" content="fr_TN" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
