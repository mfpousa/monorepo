import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "components/atoms";
import "./ResourceCard.scss";

interface ResourceCardProps {
  surfaceType: string;
  locationType: string;
  count: number;
  description: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  surfaceType,
  locationType,
  count,
  description,
}) => {
  return (
    <li className="court">
      <img src="/images/court-placeholder.png" className="image"></img>
      <div className="content">
        <div className="features">
          <div className="surface-type">
            <Icon size={1.25}>surface</Icon>
            <span>{surfaceType}</span>
          </div>
          <div className="location-type">
            <Icon size={1.25}>indoor</Icon>
            <span>{locationType}</span>
          </div>
        </div>
        <div className="count">{count}</div>
      </div>
      <div className="description">{description}</div>
      <Link to="/book" className="highlighted bold">
        Book
      </Link>
    </li>
  );
};

export default ResourceCard;
