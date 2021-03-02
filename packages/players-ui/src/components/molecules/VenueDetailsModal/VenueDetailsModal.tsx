import React from "react";
import { VenueDetails } from "components/views";
import { Modal } from "@material-ui/core";

const VenueDetailsModal = ({ open, venue, ...otherProps }) => {
  return (
    <Modal open={open} {...otherProps} style={{ overflow: "scroll" }}>
      <VenueDetails venue={venue} />
    </Modal>
  );
};

export default VenueDetailsModal;
