import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/constants';
import { useSnapshot } from 'valtio';
import { store } from '../../App';
import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { toggleContactModal } = useSnapshot(store);

  // Animation variants for footer elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <footer className="bg-gray-50 dark:bg-dark-800 pt-16 pb-8 border-t border-gray-200 dark:border-dark-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Brand */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Muntasir Elagami</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Professional Video Editor & Filmmaker specializing in commercial, narrative, and documentary projects.
            </p>
            <button
              onClick={toggleContactModal}
              className="text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 font-medium text-sm flex items-center transition-colors"
            >
              <Icons.Mail className="w-4 h-4 mr-2" />
              Get in touch
            </button>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <nav className="space-y-2">
              <Link to="/" className="block text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm">
                Home
              </Link>
              <Link to="/portfolio" className="block text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm">
                Portfolio
              </Link>
              <a 
                href="#services" 
                className="block text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm"
              >
                Services
              </a>
              <a
                href="#about"
                className="block text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm"
              >
                About
              </a>
            </nav>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Services</h4>
            <nav className="space-y-2">
              <a href="#editing" className="block text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm">
                Video Editing
              </a>
              <a href="#color-grading" className="block text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm">
                Color Grading
              </a>
              <a href="#motion-graphics" className="block text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm">
                Motion Graphics
              </a>
              <a href="#consultation" className="block text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 text-sm">
                Consultation
              </a>
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-base font-semibold mb-4 text-gray-900 dark:text-white">Connect</h4>
            <div className="flex flex-wrap gap-4">
              {SOCIAL_LINKS.map(({ platform, url, icon }) => {
                const Icon = Icons[icon as keyof typeof Icons];
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    aria-label={platform}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Muntasir Elagami. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-xs">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 text-xs">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}