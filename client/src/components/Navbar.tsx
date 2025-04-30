import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import useThemeStore from "@/store/useThemeStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useThemeStore();

  return (
    <header className="relative px-6 py-4 dark:bg-gray-900 duration-300">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300 cursor-pointer"
        >
          <img src="/logowhite.png" alt="logo" className="h-10"/>
          <span className="text-2xl font-bold text-gray-800 dark:text-white">
            BrainPin
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-14 text-gray-700 dark:text-gray-200">
          <Link
            to="/how-it-works"
            className="relative group hover:text-gray-500 font-bold"
          >
            How it Works
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gray-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/benefits"
            className="relative group hover:text-gray-500 font-bold"
          >
            Benefits
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gray-500 transition-all group-hover:w-full"></span>
          </Link>
          <Link
            to="/about"
            className="relative group hover:text-gray-500 font-bold"
          >
            About
            <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gray-500 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <Button
            onClick={toggleDarkMode}
            variant="ghost"
            className="transition-colors duration-300 cursor-pointer"
          >
            {darkMode ? (
              <Sun className="text-yellow-500" />
            ) : (
              <Moon className="text-gray-700" />
            )}
          </Button>

          <Link to="/login">
            <Button
              variant="ghost"
              className="font-bold transition-all duration-300 cursor-pointer"
            >
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-black hover:text-white font-bold transition-all duration-300">
              Signup
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 z-50 md:hidden border-b border-gray-300 dark:border-gray-700"
          >
            <div className="flex flex-col items-center text-center font-medium text-gray-700 dark:text-gray-200">
              <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              <Link
                to="/how-it-works"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 hover:text-gray-500 transition-colors duration-300 border-b border-gray-300 dark:border-gray-700"
              >
                How it Works
              </Link>
              <Link
                to="/benefits"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 hover:text-gray-500 transition-colors duration-300 border-b border-gray-300 dark:border-gray-700"
              >
                Benefits
              </Link>
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 hover:text-gray-500 transition-colors duration-300 border-b border-gray-300 dark:border-gray-700"
              >
                About
              </Link>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 hover:text-gray-500 transition-colors duration-300 border-b border-gray-300 dark:border-gray-700"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="w-full py-2 hover:text-gray-500 transition-colors duration-300 border-b border-gray-300 dark:border-gray-700"
              >
                Signup
              </Link>

              <button
                onClick={() => {
                  toggleDarkMode();
                  setIsOpen(false);
                }}
                className="w-full py-2 flex items-center justify-center gap-2 hover:text-gray-500 transition-colors duration-300"
              >
                {darkMode ? <Sun className="text-yellow-500" /> : <Moon />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
