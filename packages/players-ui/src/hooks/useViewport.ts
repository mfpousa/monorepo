import { useState, useEffect } from "react";

const getViewport = () => {
  const viewportWidth = document.getElementsByTagName("html")[0].offsetWidth;

  if (viewportWidth < 768) {
    return "phone";
  }
  if (viewportWidth < 992) {
    return "tablet";
  }
  if (viewportWidth < 1200) {
    return "desktop";
  }

  return "largeDesktop";
};

export default function useViewport() {
  const [viewport, setViewport] = useState(getViewport());
  const oldResize: (a: UIEvent) => any = window.onresize;
  const onResize = (evt?: UIEvent) => {
    evt && oldResize?.(evt);
    return setViewport(getViewport());
  };
  window.onresize = onResize;
  useEffect(() => {
    onResize();
  }, []);
  return [viewport];
}
