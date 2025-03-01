import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import { proxy, useSnapshot } from 'valtio';
import { AnimatePresence } from 'framer-motion';

// Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ThemeProvider from './components/providers/ThemeProvider';
import SEOProvider from './components/providers/SEOProvider';
import ErrorFallback from './components/ui/ErrorFallback';
import LoadingSpinner from './components/ui/LoadingSpinner';
import TianjiScript from './components/TianjiScript';

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Admin = lazy(() => import('./pages/Admin'));
const ContactModal = lazy(() => import('./components/contact/ContactModal'));

// Shared state store
export const store = proxy({
  contactModalOpen: false,
  toggleContactModal: () => {
    store.contactModalOpen = !store.contactModalOpen;
  }
});

// Handle page transitions and scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function AppRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingSpinner />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  const { contactModalOpen, toggleContactModal } = useSnapshot(store);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <SEOProvider>
          <ThemeProvider>
            <Router>
              <ScrollToTop />
              <div className="flex min-h-screen flex-col bg-white dark:bg-dark-800 transition-colors duration-300">
                <Header />
                <main className="flex-grow">
                  <AppRoutes />
                </main>
                <Footer />
                {contactModalOpen && (
                  <Suspense fallback={<LoadingSpinner />}>
                    <ContactModal isOpen={contactModalOpen} onClose={toggleContactModal} />
                  </Suspense>
                )}
              </div>
              <TianjiScript />
            </Router>
          </ThemeProvider>
        </SEOProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
