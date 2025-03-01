import { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO } from '../components/providers/SEOProvider';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BackgroundEffect from '../components/ui/BackgroundEffect';

// Lazy load components
const PortfolioGrid = lazy(() => import('../components/portfolio/ProjectGrid'));

// Structured data for portfolio page
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Muntasir Elagami Portfolio',
  description: 'Collection of professional video editing work by Muntasir Elagami, including commercial, documentary and narrative projects.',
  creator: {
    '@type': 'Person',
    name: 'Muntasir Elagami',
    jobTitle: 'Video Editor',
    url: 'https://www.muntasirelagami.com'
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        url: 'https://www.muntasirelagami.com/portfolio#commercial'
      },
      {
        '@type': 'ListItem',
        position: 2,
        url: 'https://www.muntasirelagami.com/portfolio#documentary'
      },
      {
        '@type': 'ListItem',
        position: 3,
        url: 'https://www.muntasirelagami.com/portfolio#narrative'
      }
    ]
  }
};

export default function Portfolio() {
  const { setSEO } = useSEO();
  
  // Set SEO metadata for portfolio page
  useEffect(() => {
    setSEO({
      title: 'Portfolio | Muntasir Elagami Video Editing',
      description: 'Explore my portfolio of professional video editing work including commercial, documentary, narrative projects and motion graphics.',
      canonical: 'https://www.muntasirelagami.com/portfolio',
      image: 'https://www.muntasirelagami.com/images/og-portfolio.jpg',
      type: 'website',
    });
  }, [setSEO]);
  
  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <BackgroundEffect className="opacity-25" />
      
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Portfolio
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            A collection of my professional video editing work across various genres and clients.
          </p>
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <PortfolioGrid />
        </Suspense>
      </div>
    </>
  );
}