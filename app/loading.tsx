"use client"

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-blue-950 flex flex-col items-center justify-center z-50">
      {/* Conference Logo Animation */}
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-blue-400"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset="70"
            />
          </svg>
        </motion.div>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white font-bold text-xl">NITC</div>
        </div>
      </div>

      {/* Animated Loading Text */}
      <motion.div
        initial={{ opacity: 0.5, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1.5,
          ease: "easeInOut"
        }}
        className="text-blue-200 text-lg font-medium tracking-wider"
      >
        PREPARING CONFERENCE
      </motion.div>

      {/* Progress Indicator */}
      <div className="w-64 h-1.5 bg-blue-800 rounded-full overflow-hidden mt-8">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear"
          }}
          className="h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent w-1/2"
        />
      </div>

      {/* Subtle Footer */}
      <div className="absolute bottom-8 text-blue-300 text-sm">
        43RD NATIONAL IT CONFERENCE - 2025
      </div>
    </div>
  );
}