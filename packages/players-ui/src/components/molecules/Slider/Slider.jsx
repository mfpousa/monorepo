import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const Slider = ({ children, bounceStiffness = 100, bounceDamping = 10 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);

  const [sliderWidth, setSliderWidth] = useState(0);
  const [sliderChildrenWidth, setSliderChildrenWidth] = useState(0);

  useEffect(() => {
    const element = ref?.current;

    if (!element) return;

    setSliderChildrenWidth(
      Array.from(ref.current.childNodes).reduce(
        (acc, node) => acc + node.clientWidth,
        0
      )
    );

    const calcSliderWidth = () => {
      setSliderWidth(ref.current.clientWidth);
    };

    calcSliderWidth();
    window.addEventListener("resize", calcSliderWidth);

    return () => {
      window.removeEventListener("resize", calcSliderWidth);
    };
  }, [ref, sliderChildrenWidth, sliderWidth]);

  return (
    <div className="SliderContainer" style={{ overflowX: "hidden" }}>
      <motion.div
        className="wrapper"
        ref={ref}
        drag="x"
        initial={{ x: 0 }}
        style={{
          x,
          cursor: "grab",
          display: "flex",
          justifyContent: "space-between",
        }}
        dragConstraints={{
          left: -(sliderChildrenWidth - sliderWidth) - 80,
          right: 0,
        }}
        dragTransition={{ bounceStiffness, bounceDamping }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Slider;
