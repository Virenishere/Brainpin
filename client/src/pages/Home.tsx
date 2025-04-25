"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Brain, Lightbulb, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function Home() {
  const [showBrainText, setShowBrainText] = useState<boolean>(false);
  const [brainText, setBrainText] = useState<string>("");

  const fullText: string = "Brainpower.";
  const staticText: string = "Boost Your";
  const chars: string =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // Intersection observers for scroll animations
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [ctaRef, ctaInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [footerRef, footerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let i = 0;

    if (showBrainText) {
      interval = setInterval(() => {
        const currentText = fullText
          .split("")
          .map((_, index) => {
            if (index < i) return fullText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        setBrainText(currentText);

        if (i === fullText.length) {
          clearInterval(interval);
          setBrainText(fullText);
        }

        i++;
      }, 60);
    }

    return () => clearInterval(interval);
  }, [showBrainText]);

  // Animation variants for the bento grid items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="px-6 py-8 text-gray-800 dark:text-white m-20">
      {/* Headline */}
      <AnimatePresence>
        <motion.h1
          key="headline"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          onAnimationComplete={() => setShowBrainText(true)}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-medium"
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
            className="mt-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium"
          >
            {staticText}{" "}
            <span className="underline text-gray-400 dark:text-gray-500">
              {brainText}
            </span>
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
            className="font-medium text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-800 dark:text-gray-300 mt-40 max-w-5xl"
          >
            A smart way to organize, capture, and revisit your best ideas —
            anytime, anywhere.
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
          className="relative w-full h-screen flex justify-center rounded-xl items-center mx-auto overflow-hidden mt-12"
        >
          <img
            src="/background.webp"
            alt="Background"
            className="w-full h-full object-cover"
          />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-auto max-w-full max-h-full rounded-xl"
          >
            <source src="/hero-dark-sm.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </motion.div>
      </AnimatePresence>

      {/* Feature Cards (Bento Grid) */}
      <motion.div
        ref={featuresRef}
        variants={containerVariants}
        initial="hidden"
        animate={featuresInView ? "visible" : "hidden"}
        className="mt-20 mx-auto w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Key Features</h2>

        {/* Improved Bento Grid Layout - Tighter spacing, better proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Box 1 - Tallest */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 shadow-sm h-[720px] sm:h-[680px] md:h-[820px]"
            >
              <div className="flex items-center justify-center h-full p-6">
                <img
                  src="https://images.pexels.com/photos/31588108/pexels-photo-31588108/free-photo-of-curious-dog-on-balcony-with-succulent-plant.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Feature 1"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Capture Ideas Instantly
              </h3>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                Never lose a thought again – jot ideas as they come and keep
                them organized.
              </p>
            </div>
          </motion.div>

          {/* Box 2 - Medium height */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/20 border border-amber-200 dark:border-amber-800/30 shadow-sm h-[380px] sm:h-[420px] md:h-[460px]"
            >
              <div className="flex items-center justify-center h-full p-6">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Feature 2"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Smart Organization
              </h3>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                Tags, folders, and smart filters for your notes to find exactly
                what you need.
              </p>
            </div>
          </motion.div>

          {/* Box 3 - Shortest */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950/30 dark:to-rose-900/20 border border-rose-200 dark:border-rose-800/30 shadow-sm h-[320px] sm:h-[360px] md:h-[400px]"
            >
              <div className="flex items-center justify-center h-full p-6">
                <img
                  src="https://images.pexels.com/photos/31623877/pexels-photo-31623877/free-photo-of-idyllic-wooden-cabin-in-mountain-landscape-at-sunset.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Feature 3"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Revisit Effortlessly
              </h3>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                Find your best thoughts when you need them most with powerful
                search.
              </p>
            </div>
          </motion.div>

          {/* Box 4 - Medium-tall */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="rounded-3xl overflow-hidden bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950/30 dark:to-violet-900/20 border border-violet-200 dark:border-violet-800/30 shadow-sm h-[650px] sm:h-[600px] md:h-[840px]"
            >
              <div className="flex items-center justify-center h-full p-6">
                <img
                  src="https://images.pexels.com/photos/31620812/pexels-photo-31620812/free-photo-of-chilled-iced-coffee-outdoors-on-sunny-day.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Feature 4"
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
            </motion.div>
            <div className="px-2">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                Unlock Creativity
              </h3>
              <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300 mt-2">
                Connect dots between ideas to spark innovation and discover new
                insights.
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
        className="mt-32 mx-auto w-full"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Benefits</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants}>
            <Card className="h-full border-emerald-200 dark:border-emerald-800/30 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <CardTitle>Enhanced Productivity</CardTitle>
                <CardDescription className="font-medium">
                  Streamline your workflow and boost efficiency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  Organize your thoughts in a structured way that helps you work
                  smarter, not harder. Our intuitive system adapts to your
                  thinking style.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full border-amber-200 dark:border-amber-800/30 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle>Spark Creativity</CardTitle>
                <CardDescription className="font-medium">
                  Connect ideas in new and unexpected ways
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  Discover connections between your thoughts that spark
                  innovation. Our system helps you see patterns and
                  relationships you might otherwise miss.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full border-violet-200 dark:border-violet-800/30 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-violet-600 dark:text-violet-400" />
                </div>
                <CardTitle>Find Anything Fast</CardTitle>
                <CardDescription className="font-medium">
                  Powerful search that understands context
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-medium">
                  Never lose an important thought again. Our advanced search
                  understands context and relationships, helping you find
                  exactly what you need when you need it.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" size="sm" className="gap-1">
                  Learn more <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </motion.div>

      {/* Use It Now CTA Section */}
      <motion.div
        ref={ctaRef}
        variants={containerVariants}
        initial="hidden"
        animate={ctaInView ? "visible" : "hidden"}
        className="mt-32 mb-20 mx-auto w-full max-w-4xl text-center"
      >
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-emerald-950/30 dark:to-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 rounded-3xl p-12 shadow-sm"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Boost Your Brainpower?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto font-medium">
            Join thousands of thinkers, creators, and professionals who have
            transformed how they capture and develop their best ideas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gray-800 hover:bg-gray-900 text-white"
              onClick={() => (window.location.href = "/signup")}
            >
              Get Started Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => (window.location.href = "/login")}
            >
              Sign In
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
