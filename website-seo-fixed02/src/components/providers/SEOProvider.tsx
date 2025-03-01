import { createContext, useContext, ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOContextType {
  setSEO: (props: SEOProps) => void;
}

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  language?: 'en' | 'ar';
  region?: 'uae' | 'ksa';
  type?: 'website' | 'article' | 'profile';
  image?: string;
  imageAlt?: string;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  twitterUsername?: string;
}

const defaultSEO: SEOProps = {
  title: 'Muntasir Elagami | Professional Video Editor',
  description: 'Professional video editor with expertise in commercial, documentary and narrative filmmaking.',
  canonical: 'https://www.muntasirelagami.com',
  language: 'en',
  region: 'uae',
  type: 'website',
  image: 'https://www.muntasirelagami.com/og-image.jpg',
  imageAlt: 'Muntasir Elagami Video Portfolio',
  authorName: 'Muntasir Elagami',
  twitterUsername: '@MuntasirElagami',
};

const SEOContext = createContext<SEOContextType>({
  setSEO: () => {},
});

export function useSEO() {
  return useContext(SEOContext);
}

interface SEOProviderProps {
  children: ReactNode;
  initialSEO?: SEOProps;
}

export default function SEOProvider({ 
  children, 
  initialSEO = defaultSEO 
}: SEOProviderProps) {
  const seoData = { ...defaultSEO, ...initialSEO };
  
  // Set alternates for language and region combinations
  const alternates = [];
  
  if (seoData.canonical) {
    // Add canonical URL
    alternates.push({
      rel: 'canonical',
      href: seoData.canonical,
    });
    
    // Add language alternates
    if (seoData.language === 'en') {
      alternates.push({
        rel: 'alternate',
        hrefLang: 'ar',
        href: `${seoData.canonical}/ar`,
      });
    } else {
      alternates.push({
        rel: 'alternate',
        hrefLang: 'en',
        href: seoData.canonical.replace('/ar', ''),
      });
    }
    
    // Add region alternates
    if (seoData.region === 'uae') {
      alternates.push({
        rel: 'alternate',
        hrefLang: 'en-sa',
        href: `${seoData.canonical}/sa`,
      });
    } else {
      alternates.push({
        rel: 'alternate',
        hrefLang: 'en-ae',
        href: seoData.canonical.replace('/sa', ''),
      });
    }
  }
  
  // Generate structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seoData.authorName,
    url: seoData.canonical,
    image: seoData.image,
    jobTitle: 'Video Editor',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    sameAs: [
      'https://www.linkedin.com/in/muntasir-elagami/',
      'https://www.instagram.com/muntasir_elagami/',
      'https://vimeo.com/muntasirelagami'
    ],
  };

  const setSEO = (newSEO: SEOProps) => {
    Object.assign(seoData, newSEO);
  };

  return (
    <SEOContext.Provider value={{ setSEO }}>
      <Helmet>
        {/* Basic metadata */}
        <html lang={seoData.language} />
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        
        {/* OpenGraph metadata */}
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:type" content={seoData.type} />
        {seoData.canonical && <meta property="og:url" content={seoData.canonical} />}
        {seoData.image && <meta property="og:image" content={seoData.image} />}
        {seoData.imageAlt && <meta property="og:image:alt" content={seoData.imageAlt} />}
        
        {/* Twitter metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        {seoData.twitterUsername && <meta name="twitter:creator" content={seoData.twitterUsername} />}
        <meta name="twitter:title" content={seoData.title} />
        <meta name="twitter:description" content={seoData.description} />
        {seoData.image && <meta name="twitter:image" content={seoData.image} />}
        {seoData.imageAlt && <meta name="twitter:image:alt" content={seoData.imageAlt} />}
        
        {/* Article metadata if type is article */}
        {seoData.type === 'article' && seoData.publishedTime && (
          <meta property="article:published_time" content={seoData.publishedTime} />
        )}
        {seoData.type === 'article' && seoData.modifiedTime && (
          <meta property="article:modified_time" content={seoData.modifiedTime} />
        )}
        
        {/* Canonical and alternate URLs */}
        {alternates.map((link, index) => (
          <link key={index} rel={link.rel} href={link.href} hrefLang={link.hrefLang} />
        ))}
        
        {/* Structured data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      {children}
    </SEOContext.Provider>
  );
}