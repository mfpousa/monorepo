import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Tip } from "globals/utils";

import "./Footer.scss";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <div className="Footer">
      <div className="slice-container"></div>
      <div className="wrapper">
        <Link to="/" className="logo">
          <div>{t("header:iBook")}</div>
          <div>{t("header:wePlay")}</div>
        </Link>
        <div className="links">
          <div className="social">
            <Tip title="Facebook">
              <Link to="https://www.facebook.com/ibookweplay">
                <FacebookIcon />
              </Link>
            </Tip>
            <Tip title="Twitter">
              <Link to="https://twitter.com/iBookWePlay">
                <TwitterIcon />
              </Link>
            </Tip>
            <Tip title="LinkedIn">
              <Link to="https://www.linkedin.com/company/ibookweplay">
                <LinkedInIcon />
              </Link>
            </Tip>
            <Tip title="Instagram">
              <Link to="https://www.instagram.com/ibookweplay">
                <InstagramIcon />
              </Link>
            </Tip>
          </div>
          <div className="divider" />
          <div className="other">
            <Link to="/terms-and-conditions">
              {t("footer:termsAndConditions")}
            </Link>
            <Link to="/privacy-policy">{t("footer:privacyPolicy")}</Link>
            <Link to="/">{t("footer:faqs")}</Link>
            <Link to="/">{t("footer:helpAndSupport")}</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
