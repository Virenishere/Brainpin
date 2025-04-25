"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { ArrowRight, Users, Award, Heart, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

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
};

const About: React.FC = () => {
  // Intersection observers for scroll animations
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, {
    once: false,
    amount: 0.1,
  });

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, {
    once: false,
    amount: 0.1,
  });

  // SVG animation controls
  const svgRef = useRef<HTMLDivElement>(null);
  const svgControls = useAnimationControls();
  const svgInView = useInView(svgRef, { amount: 0.2 });

  // SVG interactive animations
  useEffect(() => {
    if (svgInView) {
      svgControls.start({
        scale: [1, 1.02, 1],
        transition: { duration: 2, repeat: Infinity, repeatType: "reverse" },
      });
    } else {
      svgControls.stop();
    }
  }, [svgInView, svgControls]);

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
          About <span className="text-violet-500 dark:text-violet-400">BrainPin</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-12 max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-800 p-8 md:p-12"
        >
          <Separator className="mb-8" />
          <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl leading-relaxed font-medium mb-6">
            <strong>BrainPin</strong> is a platform designed to ignite curiosity, encourage learning, and empower
            creativity. Whether you're a student, professional, or lifelong learner, BrainPin provides the tools and
            inspiration to help you unlock your full potential.
          </p>
          <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl leading-relaxed font-medium mb-6">
            Our mission is to create a space where ideas meet innovation. From educational resources to real-world
            project applications, BrainPin bridges the gap between knowledge and action.
          </p>
          <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl leading-relaxed font-medium">
            Built with passion and purpose, BrainPin aims to make learning fun, engaging, and impactful. Join us on this
            journey of discovery and let's grow together!
          </p>
          <Separator className="mt-8" />
        </motion.div>
      </div>

      {/* Our Values Section */}
      <motion.div
        ref={valuesRef}
        variants={containerVariants}
        initial="hidden"
        animate={valuesInView ? "visible" : "hidden"}
        className="mt-24 mx-auto max-w-7xl"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 px-2 text-center">Our Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Value 1 */}
          <motion.div variants={itemVariants}>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Community First</h3>
                <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                  We believe in the power of community. BrainPin is built around fostering connections between thinkers
                  and creators, enabling collaboration and shared growth.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Value 2 */}
          <motion.div variants={itemVariants}>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Excellence in Design
                </h3>
                <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                  We're committed to creating beautiful, intuitive experiences. Every feature is crafted with care to
                  ensure it's both powerful and a joy to use.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Value 3 */}
          <motion.div variants={itemVariants}>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Passion for Learning
                </h3>
                <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                  We're lifelong learners ourselves. We're constantly exploring, experimenting, and evolving to bring
                  you the best tools for your own learning journey.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Value 4 */}
          <motion.div variants={itemVariants}>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-rose-600 dark:text-rose-400" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Innovation at Heart
                </h3>
                <p className="text-base md:text-lg font-medium text-gray-600 dark:text-gray-300">
                  We push boundaries and challenge conventions. BrainPin is built on innovative approaches to organizing
                  and connecting ideas in ways that spark creativity.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

    

      {/* Floating elements for visual interest */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full bg-violet-300/10 dark:bg-violet-700/10"
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
          className="absolute w-96 h-96 rounded-full bg-emerald-300/10 dark:bg-emerald-700/10"
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
  );
};

export default About;