import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "components/atoms";
import { VenueDetailsModal } from "components/molecules";

import "./CardPlaceInfo.scss";

const CardPlaceInfo = ({ establishmentDetail: e, imgPath }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [venueDetail, setVenueDetail] = useState(true);
  const handleClose = () => setOpen(false);
  const handleOpenDetail = () => {
    setVenueDetail(e);
    setOpen(true);
  };

  return (
    <div className="CardPlaceInfo">
      <div className="image-container">
        <button onClick={handleOpenDetail}>
          <div className="icon-photo">
            <Icon size={2}>photo</Icon>
          </div>
          <img src={imgPath} alt="venue-photo" />
        </button>
      </div>

      <div className="venue-info">
        <div className="venue-head-info">
          <h3 className="venue">{t("games:venueTag")}</h3>
          <h2 className="venue-name">
            <button onClick={handleOpenDetail}>
              <span className="text">{e.name}</span>
              <Icon size={1}>external</Icon>
            </button>
          </h2>
        </div>

        <div className="venue-address-info">
          <div className="icon-container">
            <Icon size={2}>map</Icon>
          </div>
          <div className="address-container">
            <p>
              {e.postalCode} {e.cityDescription},
            </p>
            <p>{e.provinceDescription}</p>
          </div>
        </div>
      </div>
      <VenueDetailsModal
        open={open}
        onClose={handleClose}
        venue={venueDetail}
      />
    </div>
  );
};

export default CardPlaceInfo;
