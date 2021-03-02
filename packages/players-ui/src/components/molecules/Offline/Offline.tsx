import React, { useState, useEffect } from "react";
import { Icon } from "components/atoms";
import { useTranslation } from "react-i18next";

import "./Offline.scss";

const Offline = () => {
  const { t } = useTranslation();
  const [online, setOnline] = useState(navigator ? navigator.onLine : true);

  useEffect(() => {
    if (!window) return;
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  function goOnline() {
    setOnline(true);
  }

  function goOffline() {
    setOnline(false);
  }

  if (online) {
    return null;
  }

  return (
    <div className="offline">
      <Icon size={2}>no-internet</Icon>
      <div>{t("translation:offline")}</div>
    </div>
  );
};

export default Offline;
