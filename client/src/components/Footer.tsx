import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const Footer = () => {
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true });

  return (
    <>
      {/* Footer */}
      <motion.footer
        ref={footerRef}
        variants={containerVariants}
        initial="hidden"
        animate={footerInView ? "visible" : "hidden"}
        className="py-8 border-t border-gray-200 dark:border-gray-800 mt-12"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                © {new Date().getFullYear()} ThoughtPin. All rights reserved.
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Designed by <span className="text-gray-800 dark:text-gray-500 font-bold">Virender</span>
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
