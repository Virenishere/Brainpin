"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { AnimatePresence, motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ArrowRight, Brain, Lightbulb, Search, Zap, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

function Home() {
  const [showBrainText, setShowBrainText] = useState<boolean>(false)
  const [brainText, setBrainText] = useState<string>("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState("default")

  const fullText: string = "Brainpower."
  const staticText: string = "Boost Your"
  const chars: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  // Intersection observers for scroll animations
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Refs for interactive elements
  const svgOneRef = useRef(null)
  const svgTwoRef = useRef(null)
  const svgThreeRef = useRef(null)
  const svgFourRef = useRef(null)

  const svgOneControls = useAnimation()
  const svgTwoControls = useAnimation()
  const svgThreeControls = useAnimation()
  const svgFourControls = useAnimation()

  const [svgOneInView] = useInView({ threshold: 0.2 })
  const [svgTwoInView] = useInView({ threshold: 0.2 })
  const [svgThreeInView] = useInView({ threshold: 0.2 })
  const [svgFourInView] = useInView({ threshold: 0.2 })

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Text animation effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>
    let i = 0

    if (showBrainText) {
      interval = setInterval(() => {
        const currentText = fullText
          .split("")
          .map((_, index) => {
            if (index < i) return fullText[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")

        setBrainText(currentText)

        if (i === fullText.length) {
          clearInterval(interval)
          setBrainText(fullText)
        }

        i++
      }, 60)
    }

    return () => clearInterval(interval)
  }, [showBrainText])

  // SVG interactive animations
  useEffect(() => {
    if (svgOneInView) {
      svgOneControls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
      })
    }

    if (svgTwoInView) {
      svgTwoControls.start({
        rotate: [0, 2, 0, -2, 0],
        transition: { duration: 4, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
      })
    }

    if (svgThreeInView) {
      svgThreeControls.start({
        y: [0, -10, 0],
        transition: { duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
      })
    }

    if (svgFourInView) {
      svgFourControls.start({
        filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"],
        transition: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
      })
    }
  }, [
    svgOneInView,
    svgTwoInView,
    svgThreeInView,
    svgFourInView,
    svgOneControls,
    svgTwoControls,
    svgThreeControls,
    svgFourControls,
  ])

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

  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
    },
    hover: {
      x: mousePosition.x - 30,
      y: mousePosition.y - 30,
      height: 60,
      width: 60,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      mixBlendMode: "difference",
    },
  }

  const handleMouseEnter = () => setCursorVariant("hover")
  const handleMouseLeave = () => setCursorVariant("default")

  // Parallax effect for bento grid
  const calculateParallax = (e: React.MouseEvent, strength = 20) => {
    const { currentTarget, clientX, clientY } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()

    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5

    return {
      transform: `perspective(1000px) rotateX(${y * strength}deg) rotateY(${-x * strength}deg)`,
    }
  }

  return (
    <div className="relative px-4 py-6 text-gray-800 dark:text-white overflow-hidden">
      {/* Custom cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-gray-800 dark:bg-white opacity-30 pointer-events-none z-50 hidden md:block"
        variants={cursorVariants}
        animate={cursorVariant}
      />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          <motion.h1
            key="headline"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => setShowBrainText(true)}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium mt-16 md:mt-24"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Pin Your Thoughts,
          </motion.h1>
        </AnimatePresence>

        {/* Animated Text */}
        <AnimatePresence>
          {showBrainText && (
            <motion.h1
              key="brain"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="mt-2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {staticText} <span className="underline text-gray-400 dark:text-gray-500">{brainText}</span>
            </motion.h1>
          )}
        </AnimatePresence>

        {/* Mid Heading */}
        <AnimatePresence>
          {showBrainText && (
            <motion.p
              key="midheading"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="font-medium text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-800 dark:text-gray-300 mt-28 max-w-5xl"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              A smart way to organize, capture, and revisit your best ideas — anytime, anywhere.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Video Hero Section */}
        <AnimatePresence>
          <motion.div
            key="video-section"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 1, ease: "easeOut", delay: 1 }}
            className="relative w-full h-[70vh] flex justify-center rounded-xl items-center mx-auto overflow-hidden mt-12"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img src="/background.webp" alt="Background" className="w-full h-full object-cover rounded-xl" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-auto max-w-full max-h-full rounded-xl shadow-2xl"
            >
              <source src="/brainpindemo.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Feature Cards (Bento Grid) */}
      <motion.div
        ref={featuresRef}
        variants={containerVariants}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        className="mt-24 mx-auto max-w-7xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 px-2">Key Features</h2>

        {/* Improved Bento Grid Layout - Interactive and responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          {/* Box 1 - Tallest */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 shadow-sm h-[600px] sm:h-[680px] md:h-[720px]"
              onMouseMove={(e) => {
                const { transform } = calculateParallax(e, 5)
                if (svgOneRef.current) {
                  ;(svgOneRef.current as HTMLElement).style.transform = transform
                }
              }}
            >
              <div className="flex items-center justify-center h-full p-6 relative">
                <motion.div
                  ref={svgOneRef}
                  animate={svgOneControls}
                  className="w-full h-full transition-transform duration-300 ease-out"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img src="/one.svg" alt="Feature 1" className="w-full h-full object-contain rounded-2xl" />
                </motion.div>
                <motion.div
                  className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </motion.div>
              </div>
            </motion.div>
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Capture Ideas Instantly
              </h3>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                Never lose a thought again – jot ideas as they come and keep them organized.
              </p>
            </div>
          </motion.div>

          {/* Box 2 - Medium height */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/30 shadow-sm h-[380px] sm:h-[420px] md:h-[460px]"
              onMouseMove={(e) => {
                const { transform } = calculateParallax(e, 5)
                if (svgTwoRef.current) {
                  ;(svgTwoRef.current as HTMLElement).style.transform = transform
                }
              }}
            >
              <div className="flex items-center justify-center h-full p-6 relative">
                <motion.div
                  ref={svgTwoRef}
                  animate={svgTwoControls}
                  className="w-full h-full transition-transform duration-300 ease-out"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img src="/two.svg" alt="Feature 2" className="w-full h-full object-contain rounded-2xl" />
                </motion.div>
                <motion.div
                  className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </motion.div>
              </div>
            </motion.div>
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Smart Organization</h3>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                Tags, folders, and smart filters for your notes to find exactly what you need.
              </p>
            </div>
          </motion.div>

          {/* Box 3 - Shortest */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20 border border-rose-200 dark:border-rose-800/30 shadow-sm h-[320px] sm:h-[360px] md:h-[400px]"
              onMouseMove={(e) => {
                const { transform } = calculateParallax(e, 5)
                if (svgThreeRef.current) {
                  ;(svgThreeRef.current as HTMLElement).style.transform = transform
                }
              }}
            >
              <div className="flex items-center justify-center h-full p-6 relative">
                <motion.div
                  ref={svgThreeRef}
                  animate={svgThreeControls}
                  className="w-full h-full transition-transform duration-300 ease-out"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img src="/three.svg" alt="Feature 3" className="w-full h-full object-contain rounded-2xl" />
                </motion.div>
                <motion.div
                  className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                </motion.div>
              </div>
            </motion.div>
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Revisit Effortlessly</h3>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                Find your best thoughts when you need them most with powerful search.
              </p>
            </div>
          </motion.div>

          {/* Box 4 - Medium-tall */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col gap-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/30 dark:to-violet-900/20 border border-violet-200 dark:border-violet-800/30 shadow-sm h-[550px] sm:h-[600px] md:h-[640px]"
              onMouseMove={(e) => {
                const { transform } = calculateParallax(e, 5)
                if (svgFourRef.current) {
                  ;(svgFourRef.current as HTMLElement).style.transform = transform
                }
              }}
            >
              <div className="flex items-center justify-center h-full p-6 relative">
                <motion.div
                  ref={svgFourRef}
                  animate={svgFourControls}
                  className="w-full h-full transition-transform duration-300 ease-out"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img src="/four.svg" alt="Feature 4" className="w-full h-full object-contain rounded-2xl" />
                </motion.div>
                <motion.div
                  className="absolute bottom-6 right-6 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowUpRight className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </motion.div>
              </div>
            </motion.div>
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">Unlock Creativity</h3>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                Connect dots between ideas to spark innovation and discover new insights.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Our Benefits Section */}
      <motion.div
        ref={benefitsRef}
        variants={containerVariants}
        initial="hidden"
        animate={benefitsInView ? "visible" : "hidden"}
        className="mt-24 mx-auto max-w-7xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 px-2">Our Benefits</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <motion.div variants={itemVariants} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card className="h-full border-emerald-200 dark:border-emerald-800/30 shadow-sm">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </motion.div>
                  <CardTitle>Enhanced Productivity</CardTitle>
                  <CardDescription className="font-medium">
                    Streamline your workflow and boost efficiency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">
                    Organize your thoughts in a structured way that helps you work smarter, not harder. Our intuitive
                    system adapts to your thinking style.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1 group">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card className="h-full border-amber-200 dark:border-amber-800/30 shadow-sm">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                  </motion.div>
                  <CardTitle>Spark Creativity</CardTitle>
                  <CardDescription className="font-medium">Connect ideas in new and unexpected ways</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">
                    Discover connections between your thoughts that spark innovation. Our system helps you see patterns
                    and relationships you might otherwise miss.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1 group">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <motion.div
              whileHover={{
                y: -8,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Card className="h-full border-violet-200 dark:border-violet-800/30 shadow-sm">
                <CardHeader>
                  <motion.div
                    className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Search className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                  </motion.div>
                  <CardTitle>Find Anything Fast</CardTitle>
                  <CardDescription className="font-medium">Powerful search that understands context</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">
                    Never lose an important thought again. Our advanced search understands context and relationships,
                    helping you find exactly what you need when you need it.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" size="sm" className="gap-1 group">
                    Learn more{" "}
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Use It Now CTA Section */}
      <motion.div
        ref={ctaRef}
        variants={containerVariants}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        className="mt-24 mb-16 mx-auto max-w-7xl"
      >
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/30 border border-gray-200 dark:border-gray-700/30 rounded-3xl p-8 md:p-12 shadow-sm mx-4"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Zap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Ready to Boost Your Brainpower?</h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-medium text-center">
            Join thousands of thinkers, creators, and professionals who have transformed how they capture and develop
            their best ideas. and professionals who have transformed how they capture and develop their best ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gray-800 hover:bg-gray-900 text-white"
                onClick={() => (window.location.href = "/signup")}
              >
                Get Started Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" onClick={() => (window.location.href = "/login")}>
                Sign In
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating elements for visual interest */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-emerald-300/10 dark:bg-emerald-700/10"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
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
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{ top: "30%", right: "10%" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-amber-300/10 dark:bg-amber-700/10"
          animate={{
            x: [0, 120, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          style={{ bottom: "15%", left: "15%" }}
        />
      </div>
    </div>
  )
}

export default Home
