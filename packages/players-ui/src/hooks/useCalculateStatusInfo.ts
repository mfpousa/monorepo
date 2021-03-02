import { useState, useEffect } from "react";
import moment from "globals/moment";

export default function useCalculateStatusInfo(dateB = "") {
  const [diff, setDiff] = useState(0);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const b = moment(dateB).startOf("day");
    if (b.isValid()) {
      const a = moment().startOf("day");
      const days = b.diff(a, "days");
      calculateDiff(days);
    }
  }, [dateB]);

  const calculateDiff = (days) => {
    if (days >= 6) {
      setDiff(days);
      setStatus("distant");
      return;
    }

    if (2 <= days && days < 6) {
      setDiff(days);
      setStatus("close");
      return;
    }

    if (0 <= days && days < 2) {
      setDiff(days);
      setStatus("nearby");
      return;
    }

    if (days < 0) {
      setDiff(0);
      setStatus("nearby");
      return;
    }
  };

  return {
    days: diff,
    status,
  };
}
