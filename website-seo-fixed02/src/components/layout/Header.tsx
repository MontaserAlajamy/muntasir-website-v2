import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from '../providers/ThemeProvider';
import { useSnapshot } from 'valtio';
import { store } from '../../App';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { toggleContactModal } = useSnapshot(store);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isDarkMode = theme === 'dark';
  
  // Create a ref for the header observer
  const { ref: headerObserverRef, inView: isHeaderVisible } = useInView({
    threshold: 0,
    rootMargin: '-10px 0px 0px 0px',
  });
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <>
      <div ref={headerObserverRef} className="h-1 absolute top-0 w-full" />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white bg-opacity-95 dark:bg-dark-800 dark:bg-opacity-95 shadow-md backdrop-blur-md'
            : 'bg-white dark:bg-dark-800'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="text-xl md:text-2xl font-bold bg-gradient-to-r from-brand-500 to-brand-700 bg-clip-text text-transparent transition-transform duration-300 hover:scale-105"
              >
                Muntasir Elagami
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
              <nav className="flex space-x-1 lg:space-x-4 mr-4">
                <Link
                  to="/"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/'
                      ? 'text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/portfolio"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/portfolio'
                      ? 'text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                >
                  Portfolio
                </Link>
                <Link
                  to="/admin"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    location.pathname === '/admin'
                      ? 'text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                  aria-label="Admin"
                >
                  <Lock className="w-4 h-4" />
                </Link>
              </nav>
              
              <div className="flex items-center space-x-2 lg:space-x-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:focus:ring-offset-dark-800"
                  aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleContactModal}
                  className="px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-700 text-white text-sm font-medium rounded-md shadow-sm hover:from-brand-600 hover:to-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-dark-800 transition-all duration-300"
                >
                  Contact Me
                </motion.button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-500"
                aria-expanded={isMenuOpen}
                aria-label="Main menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white dark:bg-dark-800 border-t dark:border-gray-700 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-4 space-y-1">
                <Link
                  to="/"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/'
                      ? 'text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/portfolio"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/portfolio'
                      ? 'text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                >
                  Portfolio
                </Link>
                <Link
                  to="/admin"
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    location.pathname === '/admin'
                      ? 'text-brand-800 dark:text-brand-300 bg-brand-50 dark:bg-brand-900/30'
                      : 'text-gray-700 dark:text-gray-300 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-gray-50 dark:hover:bg-dark-700'
                  }`}
                >
                  Admin
                </Link>
                
                <div className="pt-4 pb-2 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Theme</p>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-700"
                    aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                  >
                    {isDarkMode ? (
                      <>
                        <Sun className="w-5 h-5 mr-2" />
                        <span>Light mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5 mr-2" />
                        <span>Dark mode</span>
                      </>
                    )}
                  </button>
                </div>
                
                <button
                  onClick={() => {
                    toggleContactModal();
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-brand-500 to-brand-700 hover:from-brand-600 hover:to-brand-800"
                >
                  Contact Me
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      
      {/* Add space to prevent content from being hidden under fixed header */}
      <div className="h-16"></div>
    </>
  );
}