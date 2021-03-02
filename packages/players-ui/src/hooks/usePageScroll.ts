import { useEffect } from "react";

export default function usePageScroll(callback: () => any) {
  useEffect(() => {
    window.addEventListener("scroll", callback);
    return () => window.removeEventListener("scroll", callback);
  }, []);
}
