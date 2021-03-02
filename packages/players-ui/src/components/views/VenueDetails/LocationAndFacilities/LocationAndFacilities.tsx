import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "components/atoms";
import { OpeningHours } from "components/molecules";

import { Venue } from "api/venues/Venue";

import "./LocationAndFacilities.scss";

interface FacilityProps {
  icon: string;
  text: string;
}

const Facility: React.FC<FacilityProps> = ({ icon, text }) => (
  <div className="facility">
    <Icon size={1.5}>{icon}</Icon>
    <span>{text}</span>
  </div>
);

const LocationAndFacilities: React.FC<Venue> = ({
  establishmentUuid,
  phoneNumber,
  email,
  hasChangingRooms,
  hasShowers,
  hasLockers,
  hasParking,
  hasCafeBar,
  hasSteam,
  hasSauna,
  hasJacuzzi,
  hasSolarium,
}) => {
  return (
    <div className="LocationAndFacilities">
      <div className="title">Location and facilities</div>
      <div className="contact-us">
        <div className="map"></div>
        <div className="details">
          <div className="title">Contact us</div>
          <div className="contact-details">
            <div className="phone">
              <div className="icon">
                <Icon size={2.75}>phone</Icon>
              </div>
              <span>{phoneNumber || "No phone available"}</span>
            </div>
            <div className="email">
              <div className="icon">
                <Icon size={2.75}>email</Icon>
              </div>
              <span>{email || "No email available"}</span>
            </div>
            <div className="chat">
              <div className="icon">
                <Icon size={2.75}>chat</Icon>
              </div>
              <span>Click here to start chatting to us</span>
            </div>
          </div>
          <div className="links">
            <Link
              to={`/book/${establishmentUuid}`}
              className="highlighted padded bold"
            >
              Book venue
            </Link>
            <Link
              to={`/book/${establishmentUuid}`}
              className="outlined padded bold"
            >
              See live games
            </Link>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="facilities">
          <div className="title">Facilities</div>
          <div className="facilities-container">
            {hasChangingRooms && (
              <Facility icon="changing-rooms" text="Changing Rooms" />
            )}
            {hasShowers && <Facility icon="showers" text="Showers" />}
            {hasLockers && <Facility icon="lockers" text="Lockers" />}
            {hasParking && <Facility icon="parking" text="Parking" />}
            {hasCafeBar && <Facility icon="cafe-bar" text="Food" />}
            {hasSteam && <Facility icon="steam" text="Steam" />}
            {hasSauna && <Facility icon="sauna" text="Sauna" />}
            {hasJacuzzi && <Facility icon="jacuzzi" text="Jacuzzi" />}
            {hasSolarium && <Facility icon="solarium" text="Solarium" />}
          </div>
        </div>
        <OpeningHours />
      </div>
    </div>
  );
};

export default LocationAndFacilities;
