import React from "react";
import { useTranslation } from "react-i18next";
import { Header, Footer, Heading } from "components/molecules";

import "./PrivacyPolicy.scss";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <div className="PrivacyPolicy">
      <Header gray withSeparator />
      <div className="wrapper">
        <Heading
          title={t("privacyPolicy:title")}
          description={t("privacyPolicy:description")}
        />
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
