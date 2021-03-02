import React from "react";

import "./OpeningHours.scss";

const OpeningHours = () => {
  return (
    <div className="OpeningHours">
      <div className="title">Opening hours</div>
      <div className="days">
        <div className="day">
          <div className="name">Mon</div>
          <div className="time">9:00 AM to 8:00 PM</div>
        </div>
        <div className="day">
          <div className="name">Tue</div>
          <div className="time">9:00 AM to 8:00 PM</div>
        </div>
        <div className="day">
          <div className="name">Wed</div>
          <div className="time">9:00 AM to 8:00 PM</div>
        </div>
        <div className="day">
          <div className="name">Thu</div>
          <div className="time">9:00 AM to 8:00 PM</div>
        </div>
        <div className="day">
          <div className="name">Fri</div>
          <div className="time">9:00 AM to 8:00 PM</div>
        </div>
        <div className="day">
          <div className="name">Sat</div>
          <div className="time">9:00 AM to 8:00 PM</div>
        </div>
        <div className="day">
          <div className="name">Sun</div>
          <div className="time">9:00 AM to 8:00 PM</div>
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
