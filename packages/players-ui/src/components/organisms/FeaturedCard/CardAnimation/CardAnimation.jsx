import React, { useEffect, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";

const CardAnimation = ({
  children,
  delayPerPixel,
  idx,
  originIndex,
  originOffset,
}) => {
  const delayRef = useRef(0);
  const offset = useRef({ top: 0, left: 0 });
  const ref = useRef();

  useLayoutEffect(() => {
    const element = ref?.current;
    const elementDelayRef = delayRef?.current;
    const elementOffset = offset?.current;
    if (!element || !elementDelayRef || !elementOffset) return;

    offset.current = {
      top: element.offsetTop,
      left: element.offsetLeft,
    };

    if (idx === originIndex) {
      originOffset.current = offset.current;
    }
  }, [ref, originOffset, delayPerPixel]);

  useEffect(() => {
    const element = delayRef?.current;

    if (!element) return;

    const dx = Math.abs(offset.current.left - originOffset.current.left);
    const dy = Math.abs(offset.current.top - originOffset.current.top);
    const d = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
    delayRef.current = d * delayPerPixel;
  }, [delayPerPixel]);

  return (
    <motion.div
      ref={ref}
      variants={{
        closed: {
          opacity: 0,
          scale: 0.5,
        },
        open: (delayRef) => ({
          opacity: 1,
          scale: 1,
          transition: { delay: delayRef.current },
        }),
      }}
      custom={delayRef}
    >
      {children}
    </motion.div>
  );
};

export default CardAnimation;
