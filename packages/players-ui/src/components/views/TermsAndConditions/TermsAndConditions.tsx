import React from "react";
import { useTranslation } from "react-i18next";
import { Header, Footer, Heading } from "components/molecules";

import "./TermsAndConditions.scss";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  return (
    <div className="TermsAndConditions">
      <Header gray withSeparator />
      <div className="wrapper">
        <Heading
          title={t("termsAndConditions:title")}
          description={t("termsAndConditions:description")}
        />
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
