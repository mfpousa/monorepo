import React from "react";

import "./Heading.scss";

interface HeadingProps {
  title: string;
  description: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div className="Heading">
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export default Heading;
