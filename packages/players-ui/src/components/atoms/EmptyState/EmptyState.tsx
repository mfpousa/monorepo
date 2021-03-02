import React from "react";

import "./EmptyState.scss";

interface EmptyStateProps {
  title: string;
}

const EmptyState = ({ title }: EmptyStateProps) => {
  return <div className="no-items-container">{title}</div>;
};

export default EmptyState;
