import React from "react";
import classNames from "classnames";
import { Icon } from "components/atoms";
import { useClickOutside } from "hooks";

import "./DropdownCheckboxes.scss";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownCheckboxesProps {
  label: string;
  color: "dark" | "light";
  options: Array<{
    display: string;
    value: string;
  }>;
  displayText: string;
  selectedValues: Array<{
    value: string;
    labelText: string;
  }>;
  className?: string;
  disabled?: boolean;
  settingUpFilters: (
    values: Array<{ labelText: string; value: string }>
  ) => void;
}

const DropdownCheckboxes = ({
  label,
  options,
  selectedValues = [],
  color = "light",
  displayText,
  disabled = false,
  settingUpFilters,
}: DropdownCheckboxesProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const contentRef = React.useRef<HTMLDivElement>();

  React.useEffect(
    function handleDisabled() {
      if (disabled) {
        setIsOpen(false);
      }
    },
    [disabled]
  );

  const handleClickOutside = () => setIsOpen(false);
  useClickOutside(contentRef, handleClickOutside);

  const toggleOptions = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleInputChange = (labelText: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (disabled) return;

    const { value } = event.currentTarget;

    if (selectedValues.some((item) => item.value === value)) {
      settingUpFilters([
        ...selectedValues.filter((item) => item.value !== value),
      ]);
      return;
    }

    settingUpFilters([
      ...selectedValues.filter((item) => item.value !== value),
      { labelText, value },
    ]);
  };

  // TODO: Change size when dropdown height is more than scroll offset
  // React.useEffect(() => {
  //   console.log(
  //     "bounding-" + label,
  //     contentRef?.current?.getBoundingClientRect()
  //   );
  // }, [isOpen]);

  return (
    <div
      className={classNames("DropdownCheckboxes", {
        dark: color === "dark",
        light: color === "light",
        disabled,
      })}
    >
      <p className="dropdown-label">{label}</p>
      <button type="button" className="dropdown-header" onClick={toggleOptions}>
        <p className="display-text">{displayText}</p>{" "}
        <div className="btn-icon">
          <Icon size={1.5}>down</Icon>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && !disabled && (
          <motion.div
            initial={{
              y: -40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 40,
              opacity: 0,
            }}
            className="dropdown-options-container"
            ref={contentRef}
          >
            <ul className="dropdown-options">
              {options.map((item, idx) => (
                <li className="dropdown-option" key={idx}>
                  <label htmlFor={`${item.value}-${idx}`} className="label">
                    <input
                      type="checkbox"
                      name={`${item.value}-${idx}`}
                      value={item.value}
                      className="checkbox"
                      id={`${item.value}-${idx}`}
                      onChange={handleInputChange(item.display)}
                      checked={selectedValues.some(
                        ({ value }) => value === item.value
                      )}
                    />
                    <span>{item.display}</span>
                  </label>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropdownCheckboxes;
