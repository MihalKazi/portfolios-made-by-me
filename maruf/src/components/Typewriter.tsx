// src/components/Typewriter.tsx
"use client";

import { motion } from 'framer-motion';

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function Typewriter({ text, delay = 0, className = "" }: TypewriterProps) {
  // Split the text into an array of individual characters
  const characters = Array.from(text);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03, // Speed of the typing (lower is faster)
        delayChildren: delay,  // When to start typing
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.1 } 
    },
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`inline-block ${className}`}
    >
      {characters.map((char, index) => (
        <motion.span key={index} variants={childVariants} className="inline-block">
          {/* If the character is a space, we need to render a non-breaking space so it doesn't collapse */}
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}