export const fadeUpWithBlurVariants = (stiffness?: number, damping?: number, mass?: number) => ({
  initial: {
    y: 50,
    opacity: 0,
    filter: "blur(3px)",
  },

  animate: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      stiffness: stiffness || 190,
      damping: damping || 40,
      mass: mass || 0.3,
      staggerChildren: 0.09,
      when: "beforeChildren",
    },
  },
});