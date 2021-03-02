export const gameCardContainerAnimation = {
  variants: {
    open: {
      height: "auto",
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    close: {
      height: "64px",
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  },
};

export const gameCardIconAnimation = {
  variants: {
    open: {
      rotateZ: 180,
    },
    close: { rotateZ: 0 },
  },
};

export const gameCardSpotsAnimation = {
  variants: {
    open: {
      transformOrigin: "top",
      scaleY: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    close: {
      transformOrigin: "top",
      scaleY: 0,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  },
};
