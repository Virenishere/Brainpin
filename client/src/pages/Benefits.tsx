import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { ArrowRight, Brain, Lightbulb, Search, Clock, Globe, Shield, Sparkles } from 'lucide-react'

const Benefits = () => {
  // Intersection observers for scroll animations
  const benefitsRef = useRef(null)
  const benefitsInView = useInView(benefitsRef, {
    triggerOnce: false,
    threshold: 0.1,
  })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
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

  // SVG animation controls
  const svgRef = useRef(null)
  const svgControls = useAnimation()
  const svgInViewRef = useRef(null)
  const svgInView = useInView(svgInViewRef, { threshold: 0.2 })

  // SVG interactive animations
  useEffect(() => {
    if (svgInView) {
      svgControls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
      })
    }
  }, [svgInView, svgControls])

  return (
    <div className="relative px-4 py-12 text-gray-800 dark:text-white overflow-hidden">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl font-medium mt-16 md:mt-24 text-center"
        >
          Why Choose <span className="text-purple-500 dark:text-purple-400">BrainPin</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="font-medium text-xl sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mt-8 max-w-3xl mx-auto text-center"
        >
          Discover how BrainPin transforms the way you capture, organize, and develop your ideas.
        </motion.p>
      </div>

      {/* Main Illustration */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="mt-16 mx-auto max-w-2xl"
      >
        <div ref={svgInViewRef} className="relative h-64 md:h-80">
          <motion.div
            ref={svgRef}
            animate={svgControls}
            className="w-full h-full transition-transform duration-300 ease-out"
          >
            <img src="/two.svg" alt="Benefits" className="w-full h-full object-contain" />
          </motion.div>
        </div>
      </motion.div>

      {/* Benefits Cards */}
      <motion.div
        ref={benefitsRef}
        variants={containerVariants}
        initial="hidden"
        animate={benefitsInView ? "visible" : "hidden"}
        className="mt-24 mx-auto max-w-7xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-emerald-200 dark:border-emerald-800/30 h-full"
            >
              <div className="p-6">
                <motion.div
                  className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Enhanced Productivity</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Streamline your workflow</p>
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  Organize your thoughts in a structured way that helps you work smarter, not harder. Our intuitive
                  system adapts to your thinking style.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:underline">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-amber-200 dark:border-amber-800/30 h-full"
            >
              <div className="p-6">
                <motion.div
                  className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Spark Creativity</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Connect ideas in new ways</p>
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  Discover connections between your thoughts that spark innovation. Our system helps you see patterns
                  and relationships you might otherwise miss.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-amber-600 dark:text-amber-400 hover:underline">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-violet-200 dark:border-violet-800/30 h-full"
            >
              <div className="p-6">
                <motion.div
                  className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Search className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Find Anything Fast</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Powerful contextual search</p>
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  Never lose an important thought again. Our advanced search understands context and relationships,
                  helping you find exactly what you need when you need it.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-rose-200 dark:border-rose-800/30 h-full"
            >
              <div className="p-6">
                <motion.div
                  className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Clock className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Save Time</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Efficient idea management</p>
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  Spend less time organizing and more time creating. Our streamlined interface and smart features help
                  you capture and develop ideas with minimal friction.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-rose-600 dark:text-rose-400 hover:underline">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 5 */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-cyan-200 dark:border-cyan-800/30 h-full"
            >
              <div className="p-6">
                <motion.div
                  className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Globe className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Access Anywhere</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Seamless cross-device sync</p>
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  Your ideas follow you everywhere. Access your thoughts from any device with perfect synchronization,
                  ensuring you're never without your best ideas.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:underline">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 6 */}
          <motion.div variants={itemVariants}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-indigo-200 dark:border-indigo-800/30 h-full"
            >
              <div className="p-6">
                <motion.div
                  className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Privacy First</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Your thoughts stay yours</p>
                <p className="font-medium text-gray-600 dark:text-gray-300">
                  We prioritize your privacy with end-to-end encryption and secure storage. Your ideas remain private
                  and protected, giving you peace of mind.
                </p>
                <div className="mt-4">
                  <button className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      

      {/* Floating elements for visual interest */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-amber-300/10 dark:bg-amber-700/10"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ top: "10%", left: "5%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-violet-300/10 dark:bg-violet-700/10"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{ top: "30%", right: "10%" }}
        />
      </div>
    </div>
  )
}

export default Benefits
