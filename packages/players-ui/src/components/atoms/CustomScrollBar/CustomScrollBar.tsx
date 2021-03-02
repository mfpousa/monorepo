import React, { useEffect, useState, useRef, useCallback } from "react";
import classnames from "classnames";

import "./CustomScrollBar.scss";

interface CustomScreenBarParams {
  children: React.ReactNode;
  barPosition?: "left" | "right";
  maxHeight: Number;
}

const CustomScrollBar: React.FC<CustomScreenBarParams> = ({
  children,
  barPosition = "right",
  maxHeight,
}) => {
  const [scrollBoxHeight, setScrollBoxHeight] = useState(20);
  const [scrollBoxTop, setScrollBoxTop] = useState(0);
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
  const [isDragging, setDragging] = useState(false);

  const handleDocumentMouseUp = useCallback(
    (e) => {
      if (isDragging) {
        e.preventDefault();
        setDragging(false);
      }
    },
    [isDragging]
  );

  const handleDocumentMouseMove = useCallback(
    (e) => {
      if (isDragging) {
        e.preventDefault();
        e.stopPropagation();
        const scrollHostElement: HTMLDivElement = scrollHostRef.current;
        const { scrollHeight, offsetHeight } = scrollHostElement;

        let deltaY = e.clientY - lastScrollThumbPosition;
        let percentage = deltaY * (scrollHeight / offsetHeight);

        setScrollThumbPosition(e.clientY);
        setScrollBoxTop(
          Math.min(
            Math.max(0, scrollBoxTop + deltaY),
            offsetHeight - scrollBoxHeight
          )
        );
        scrollHostElement.scrollTop = Math.min(
          scrollHostElement.scrollTop + percentage,
          scrollHeight - offsetHeight
        );
      }
    },
    [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
  );

  const handleScrollThumbMouseDown = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setScrollThumbPosition(e.clientY);
    setDragging(true);
  }, []);

  const handleScroll = useCallback(() => {
    if (!scrollHostRef) {
      return;
    }
    const scrollHostElement: HTMLDivElement = scrollHostRef.current;
    const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;

    let newTop =
      (parseInt(`${scrollTop}`, 10) / parseInt(`${scrollHeight}`, 10)) *
      offsetHeight;
    // newTop = newTop + parseInt(scrollTop, 10);
    newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
    setScrollBoxTop(newTop);
  }, []);

  const scrollHostRef = useRef();

  useEffect(() => {
    const scrollHostElement: HTMLDivElement = scrollHostRef.current;
    const { clientHeight, scrollHeight } = scrollHostElement;
    const scrollThumbPercentage = clientHeight / scrollHeight;
    const scrollThumbHeight = Math.max(
      scrollThumbPercentage * clientHeight,
      20
    );
    setScrollBoxHeight(scrollThumbHeight);
    scrollHostElement.addEventListener("scroll", handleScroll, true);
    return function cleanup() {
      scrollHostElement.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    //this is handle the dragging on scroll-thumb
    document.addEventListener("mousemove", handleDocumentMouseMove);
    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("mouseleave", handleDocumentMouseUp);
    return function cleanup() {
      document.removeEventListener("mousemove", handleDocumentMouseMove);
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("mouseleave", handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return (
    <div
      className={classnames("CustomScrollBar", { [barPosition]: true })}
      style={{
        height: `${maxHeight}px`,
      }}
    >
      <div className="ScrollBarWrapper">
        <div
          className="ScrollThumb"
          style={{ height: `${scrollBoxHeight}px`, top: `${scrollBoxTop}px` }}
          onMouseDown={handleScrollThumbMouseDown}
        >
          <div className="ThumbShape"></div>
        </div>
        <div className="ScrollPath"></div>
      </div>
      <div className="ContentWrapper" ref={scrollHostRef}>
        {children}
      </div>
    </div>
  );
};

export default CustomScrollBar;
