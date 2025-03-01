import { lazy, Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSEO } from '../components/providers/SEOProvider';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import BackgroundEffect from '../components/ui/BackgroundEffect';

// Lazy load components for better performance
const Hero = lazy(() => import('../components/Hero'));
const Features = lazy(() => import('../components/Features'));
const FeaturedVideos = lazy(() => import('../components/featured/FeaturedVideos'));
const Profile = lazy(() => import('../components/Profile'));

// Structured data for JSON-LD
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Muntasir Elagami Video Editing',
  description: 'Professional video editing services including commercial, documentary, and narrative filmmaking.',
  image: 'https://www.muntasirelagami.com/images/profile.jpg',
  telephone: '+971-123456789',
  email: 'contact@muntasirelagami.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dubai',
    addressRegion: 'Dubai',
    addressCountry: 'UAE'
  },
  url: 'https://www.muntasirelagami.com',
  priceRange: '$$',
  openingHours: 'Mo-Fr 09:00-18:00',
  sameAs: [
    'https://www.instagram.com/muntasir_elagami/',
    'https://vimeo.com/muntasirelagami',
    'https://www.linkedin.com/in/muntasir-elagami/'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Video Editing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Commercial Video Editing'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Documentary Editing'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Motion Graphics'
        }
      }
    ]
  }
};

export default function Home() {
  const { setSEO } = useSEO();
  const { ref: featuresRef, inView: featuresInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  // Set SEO metadata for the home page
  useEffect(() => {
    setSEO({
      title: 'Muntasir Elagami | Professional Video Editor & Filmmaker',
      description: 'Professional video editor with expertise in commercial, documentary and narrative filmmaking based in Dubai, UAE.',
      canonical: 'https://www.muntasirelagami.com',
      image: 'https://www.muntasirelagami.com/images/og-home.jpg',
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
      
      <BackgroundEffect />
      
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
      </Suspense>
      
      <div ref={featuresRef}>
        {(featuresInView || typeof window === 'undefined') && (
          <Suspense fallback={<LoadingSpinner />}>
            <Features />
          </Suspense>
        )}
      </div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <FeaturedVideos />
      </Suspense>
      
      <Suspense fallback={<LoadingSpinner />}>
        <Profile />
      </Suspense>
    </>
  );
}