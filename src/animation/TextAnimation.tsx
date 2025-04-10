"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type TProsType = {
  children: string;
  duration: number;
  className?: string;
  x?: number | string; // Allow numbers or strings for flexibility
  y?: number | string; // Allow numbers or strings for flexibility
  delay: number;
};

const TextAnimation = ({
  children,
  duration,
  className,
  x = 0, // Default to 0 if not provided
  y = 0, // Default to 0 if not provided
  delay,
}: TProsType) => {
  return (
    <>
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, x, y }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x, y }}
          transition={{
            duration,
            delay: index * delay,
            ease: "easeInOut",
            type: "tween",
          }}
          className={cn("inline-block", className)}
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.span>
      ))}
    </>
  );
};

export default TextAnimation;
