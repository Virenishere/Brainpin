import React from "react";
import { Separator } from "@/components/ui/separator";

const About = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-100 to-white px-6 md:px-20 py-12 flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
          About BrainPin
        </h1>
        <Separator className="mb-8" />
        <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium mb-6">
          <strong>BrainPin</strong> is a platform designed to ignite curiosity, encourage learning, and empower creativity.
          Whether you're a student, professional, or lifelong learner, BrainPin provides the tools and inspiration
          to help you unlock your full potential.
        </p>
        <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium mb-6">
          Our mission is to create a space where ideas meet innovation. From educational resources to real-world project
          applications, BrainPin bridges the gap between knowledge and action.
        </p>
        <p className="text-gray-800 text-lg md:text-xl leading-relaxed font-medium">
          Built with passion and purpose, BrainPin aims to make learning fun, engaging, and impactful. Join us on this
          journey of discovery and let’s grow together!
        </p>
      </div>
    </div>
  );
};

export default About;
