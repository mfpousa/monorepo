import React from "react";
import { Icon, ResourceCard } from "components/atoms";
import "./ResourceTypeList.scss";

interface ResourceTypeListProps {
  courts: {
    tennis?: Array<{
      surfaceType: string;
      locationType: string;
      count: number;
      description: string;
    }>;
    tableTennis?: Array<{
      surfaceType: string;
      locationType: string;
      count: number;
      description: string;
    }>;
  };
}

const ResourceTypeList: React.FC<ResourceTypeListProps> = ({ courts }) => {
  return (
    <div className="courts">
      <div className="title">Courts</div>
      {Object.entries(courts).map(([sportName, sportCourts]) => (
        <div className="sport">
          <Icon>{sportName.replace(/([A-Z])/g, "-$1").toLowerCase()}</Icon>
          <div className="connector">
            <div className="title">{sportName} courts</div>
            {sportCourts.length > 1 &&
              sportCourts.slice(1).map(() => <div className="piece"></div>)}
            {sportCourts.length === 1 && <div className="single-piece"></div>}
          </div>
          <ul className="list">
            {sportCourts.map((value, index) => (
              <ResourceCard
                key={index}
                surfaceType={value.surfaceType}
                locationType={value.locationType}
                count={value.count}
                description={value.description}
              />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ResourceTypeList;
