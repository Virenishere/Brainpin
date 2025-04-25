"use client"

import { motion, Variants } from "framer-motion"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom" // If using react-router-dom in Vite
// OR use `import { Link } from "next/link"` if you're in a Next.js + Vite hybrid setup (not common)

const NotFound = () => {
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 text-gray-800 dark:text-white overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl w-full text-center"
      >
        <motion.div
          variants={itemVariants}
          className="w-24 h-24 rounded-full bg-rose-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-8"
        >
          <Search className="w-12 h-12 text-purple-500 dark:text-purple-400" />
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-8xl sm:text-9xl font-bold text-purple-500 dark:text-purple-400 mb-6"
        >
          404
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-medium mb-6"
        >
          Page Not Found
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-xl mx-auto font-medium"
        >
          Oops! It seems like the page you're looking for has wandered off. Maybe it's brainstorming new ideas somewhere else.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated background elements */}
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
          <motion.div
            className="absolute w-64 h-64 rounded-full bg-rose-300/10 dark:bg-rose-700/10"
            animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
            style={{ top: "10%", left: "5%" }}
          />
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-violet-300/10 dark:bg-violet-700/10"
            animate={{ x: [0, -150, 0], y: [0, 100, 0] }}
            transition={{ duration: 25, repeat: Infinity, repeatType: "reverse" }}
            style={{ top: "30%", right: "10%" }}
          />
          <motion.div
            className="absolute w-80 h-80 rounded-full bg-amber-300/10 dark:bg-amber-700/10"
            animate={{ x: [0, 120, 0], y: [0, -80, 0] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse" }}
            style={{ bottom: "15%", left: "15%" }}
          />
        </div>

        {/* 404 SVG Illustration */}
        <motion.div
          variants={itemVariants}
          className="mt-12 max-w-md mx-auto"
          animate={{
            y: [0, -10, 0],
            transition: { duration: 3, repeat: Infinity, repeatType: "reverse" },
          }}
        >
          {/* [SVG remains unchanged] */}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound
