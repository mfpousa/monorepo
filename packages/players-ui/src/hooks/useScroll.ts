import { useState, useEffect } from "react";

const onScrollHandlers = [];
window.onscroll = function () {
  onScrollHandlers.forEach((h) => h());
};
export default function useScroll() {
  const [xOffset, setXOffset] = useState(window.pageXOffset);
  const [yOffset, setYOffset] = useState(window.pageYOffset);
  useEffect(() => {
    const handle = () => {
      setXOffset(window.pageXOffset);
      setYOffset(window.pageYOffset);
    };
    onScrollHandlers.push(handle);
    return () => {
      const handleIndex = onScrollHandlers.indexOf(handle);
      onScrollHandlers[handleIndex] = onScrollHandlers.pop();
    };
  });
  return { xOffset, yOffset };
}
