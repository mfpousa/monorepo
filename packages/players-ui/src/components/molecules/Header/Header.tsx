import React, { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import classnames from "classnames";
import { Link } from "react-router-dom";

import "./Header.scss";
import { useAuthorization } from "api/auth";
import { Icon } from "components/atoms";
import { Offline } from "components/molecules";
import { CONTEXT } from "globals/context";
import { useScroll, useViewport } from "hooks";
import { Tip } from "globals/utils";

const Header = ({
  gray = false,
  transparent = false,
  black = false,
  white = false,
  grounded = false,
  scrolledThreshold = 100,
  withSeparator = false,
  notFixed = false,
}) => {
  const { t, i18n } = useTranslation();
  const { isModalOpen } = useContext(CONTEXT);
  const { language, setLanguage } = useContext(CONTEXT);
  const { isLoggedIn, login, register, logout } = useAuthorization();
  const { yOffset } = useScroll();
  const [viewport] = useViewport();
  const [initialScroll, setInitialScroll] = useState(yOffset);
  const [sticky, setSticky] = useState(true);
  const [isTop, setIsTop] = useState(true);
  const [isDown, setIsDown] = useState(true);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    if (initialScroll == 0) {
      setIsTop(true);
      setIsDown(false);
      setSticky(false);
    }
    if (initialScroll == 1 && isTop === false) {
      setIsTop(true);
      setSticky(true);
      setIsDown(false);
    }
    if (initialScroll > 1) {
      setIsTop(false);
      setIsDown(true);
    }
    if (yOffset === 0 && initialScroll > yOffset) {
      setIsDown(false);
      setIsTop(true);
    }
    if (initialScroll > yOffset && yOffset > 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
    setInitialScroll(yOffset);
  }, [yOffset]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const handleLangChange = (lang) => () => {
    if (language === "en-US" && lang === "es-ES") {
      setLanguage("es-ES");
    }
    if (language == "es-ES" && lang === "en-US") {
      setLanguage("en-US");
    }
  };

  const showMenu = () => {
    setMenu((prev) => !prev);
  };

  return (
    <>
      {withSeparator && <div className="header-separator"></div>}
      <div
        className={classnames("Header", {
          scrolled: yOffset > scrolledThreshold && !isModalOpen,
          initialPos: isTop,
          scrollPos: isDown,
          scrollUp: sticky,
          scrollDown: sticky,
          active: menu,
          loggedIn: isLoggedIn,
          gray,
          grounded,
          transparent,
          notFixed: notFixed || isModalOpen,
        })}
      >
        <div className="wrapper">
          <Offline />
          <div className="container">
            <div className="containerLogoIcon">
              <Tip title={t("header:logoToolTip")}>
                {menu ? (
                  <Link
                    to={{
                      pathname: "/",
                      search: "",
                    }}
                    className="logo"
                  >
                    <div>Menu</div>
                  </Link>
                ) : (
                  <Link
                    to={{
                      pathname: "/",
                      search: "",
                    }}
                    className="logo"
                  >
                    <div>{t("header:iBook")}</div>
                    <div>{t("header:wePlay")}</div>
                  </Link>
                )}
              </Tip>

              {viewport === "phone" ? (
                <div className="icon" onClick={showMenu}>
                  <Icon>{menu ? "close" : "menu-right"}</Icon>
                </div>
              ) : null}
            </div>

            <div className="items">
              <div className="items__areYouVenue">
                <Tip title={t("header:areYouVenueToolTip")}>
                  <a href="https://org-dev.ibookweplay.com">
                    {t("header:areYouVenue")}
                  </a>
                </Tip>
              </div>
              <div className="items__games">
                <Tip title={t("header:gamesToolTip")}>
                  <Link
                    to={{
                      pathname: "/games",
                      search: "",
                    }}
                  >
                    {t("header:games")}
                  </Link>
                </Tip>
                <Icon className="arrow-icon">arrow-right</Icon>
              </div>
              <div className="items__venues">
                <Tip title={t("header:venuesToolTip")}>
                  <Link
                    to={{
                      pathname: "/venues",
                      search: "",
                    }}
                  >
                    {t("header:venues")}
                  </Link>
                </Tip>
                <Icon className="arrow-icon">arrow-right</Icon>
              </div>
              <div className="items__divider" />
              {!isLoggedIn && (
                <>
                  <div className="items__signUp">
                    <Tip title={t("header:signUpToolTip")}>
                      <Link to="" className="highlighted" onClick={register}>
                        {t("header:signUp")}
                      </Link>
                    </Tip>
                  </div>
                  <div className="items__login">
                    <Tip title={t("header:loginToolTip")}>
                      <Link to="" onClick={login}>
                        {t("header:login")}
                      </Link>
                    </Tip>
                    <Icon className="arrow-icon">arrow-right</Icon>
                  </div>
                </>
              )}
              {isLoggedIn && (
                <>
                  <div className="items__logOut">
                    <Tip title={t("header:logOutToolTip")}>
                      <Link to="" onClick={logout}>
                        {t("header:logOut")}
                      </Link>
                    </Tip>
                  </div>
                </>
              )}

              <div className="items__flag">
                <ul className="menu-lang">
                  <li>
                    <button aria-label="Current language">
                      {language === "en-US" ? (
                        <img
                          src="https://cdn-dev.ibookweplay.com/images/locale/en_flag.png"
                          alt={t("header:localeFlag")}
                        ></img>
                      ) : (
                        <img
                          src="https://cdn-dev.ibookweplay.com/images/locale/es_flag.png"
                          alt={t("header:localeFlag")}
                        ></img>
                      )}
                    </button>
                    <div className="sub-menu">
                      <ul>
                        <li className="sub-menu__item">
                          {language === "en-US" ? (
                            <Tip title={t("header:selectForSpanishToolTip")}>
                              <button
                                onClick={handleLangChange("es-ES")}
                                aria-label={t("header:spanishFlag")}
                              >
                                <img
                                  src="https://cdn-dev.ibookweplay.com/images/locale/es_flag.png"
                                  alt={t("header:spanishFlag")}
                                ></img>
                              </button>
                            </Tip>
                          ) : (
                            <Tip title={t("header:selectForEnglishToolTip")}>
                              <button
                                onClick={handleLangChange("en-US")}
                                aria-label={t("header:englishFlag")}
                              >
                                <img
                                  src="https://cdn-dev.ibookweplay.com/images/locale/en_flag.png"
                                  alt={t("header:englishFlag")}
                                ></img>
                              </button>
                            </Tip>
                          )}
                        </li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="modal" />
      </div>
    </>
  );
};

export default Header;
