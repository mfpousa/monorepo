export const venueCard = {
  variants: {
    open: {
      y: -40,
      boxShadow: "0 10px 30px 0 rgba(141, 151, 158, 0.7)",
      transition: {
        delayChildren: 0.05,
      },
    },
    closed: {
      y: 0,
      boxShadow: "0 10px 30px 0 rgba(141, 151, 158, 0.4)",
      transition: {
        delay: 0.05,
      },
    },
  },
  transition: {
    type: "spring",
    damping: 10,
    stiffness: 100,
    easings: "easeInOut",
  },
};

export const venueCardCTA = {
  variants: {
    open: {
      display: "block",
      opacity: 1,
      y: 0,
      boxShadow: "0 10px 10px 0px rgba(141, 151, 158, 0.4)",
      transformOrigin: "center center",
    },
    closed: {
      display: "none",
      opacity: 0,
      y: 20,
      transformOrigin: "center center",
      boxShadow: "0 10px 10px 0px rgba(141, 151, 158, 0.0)",
    },
  },
};
