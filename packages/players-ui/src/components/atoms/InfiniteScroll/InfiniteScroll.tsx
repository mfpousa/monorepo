import React from "react";
import { useInView } from "react-intersection-observer";

import "./InfiniteScroll.scss";

interface InfiniteScrollProps {
  callback: () => void;
}

const InfiniteScroll = ({ callback }: InfiniteScrollProps) => {
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (!inView) return;
    callback();
  }, [inView]);

  return <div className="InfiniteScroll" ref={ref}></div>;
};

export default InfiniteScroll;
