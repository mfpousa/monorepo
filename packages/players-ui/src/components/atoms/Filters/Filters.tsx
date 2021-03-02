import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import classNames from "classnames";
import { Icon } from "components/atoms";
import { CONTEXT } from "globals/context";
import { useClickOutside, useViewport } from "hooks";

import "./Filters.scss";
import { FilterContext } from "globals/FilterContext";
import { useTranslation } from "react-i18next";

interface FiltersProps {
  children: React.ReactNode;
  handleApplyBtn: () => void;
  handleClearBtn: () => void;
  disabled?: boolean;
  filters: Array<{
    query: string;
    value: string;
    type: string;
    description?: string;
  }>;
}

const Filters: React.FC<FiltersProps> = ({
  children,
  handleApplyBtn,
  handleClearBtn,
  disabled = false,
  filters,
}) => {
  const { t } = useTranslation();
  const [viewport] = useViewport();
  const { isModalOpen, setIsModalOpen } = React.useContext(CONTEXT);
  const [showContent, setShowContent] = React.useState(false);
  const filterBgRef = React.useRef();
  const filterContent = React.useRef();

  const handleClickOutside = () => {
    setIsModalOpen(false);
  };
  useClickOutside(filterBgRef, handleClickOutside, !isModalOpen);

  React.useEffect(() => {
    if (disabled) return;
    let timeout = null;
    if (isModalOpen) {
      timeout = setTimeout(() => {
        setShowContent(true);
      }, 100);
    } else {
      setShowContent(false);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isModalOpen]);

  const toggleModal = () => {
    if (disabled) return;

    setIsModalOpen((prev: boolean) => !prev);
    const timeout = setTimeout(() => {
      if (viewport === "desktop" || viewport === "largeDesktop") {
        window.scrollTo(0, 400);
      } else {
        window.scrollTo(0, 300);
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  };

  return (
    <>
      <div className="Filters">
        <motion.button
          whileTap={!disabled ? { scale: 0.9 } : {}}
          onClick={toggleModal}
          className={classNames("filters-btn", { isModalOpen: showContent })}
          ref={filterContent}
        >
          <div className="text">{t("games:filterBtn")}</div>
          {filters?.filter((item) => item.value !== "")?.length > 0 && (
            <div className="status">
              <Icon size={2}>check</Icon>
            </div>
          )}
          <div className="icon">
            <Icon size={2}>filters</Icon>
          </div>
        </motion.button>
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  delay: 0.3,
                },
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              className="filter-content"
              ref={filterBgRef}
            >
              {children}

              <div className="filter-buttons-group">
                <ul>
                  <li>
                    <button
                      className="btn-to-filter apply-btn"
                      onClick={handleApplyBtn}
                    >
                      {t("atoms:applyFiltersBtn")}
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn-to-filter clear-btn"
                      onClick={handleClearBtn}
                    >
                      {t("atoms:clearFiltersBtn")}
                    </button>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <motion.div
        className="modal-bg"
        initial={{
          scale: 0,
          opacity: 0,
        }}
        animate={isModalOpen ? "isModalOpen" : "isModalClose"}
        variants={{
          isModalOpen: {
            scale: 1,
            opacity: 1,
          },
          isModalClose: {
            scale: 0,
            opacity: 0,
            transition: {
              delay: 0.3,
            },
          },
        }}
      ></motion.div>
    </>
  );
};

export default Filters;
