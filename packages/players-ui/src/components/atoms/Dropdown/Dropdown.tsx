import React from "react";
import classNames from "classnames";
import { Icon } from "components/atoms";
import { useClickOutside } from "hooks";

import "./Dropdown.scss";
import { AnimatePresence, motion } from "framer-motion";

interface DropdownProps {
  label: string;
  inputName: string;
  color: "dark" | "light";
  options: Array<{
    display: string;
    value: string;
  }>;
  displayText: string;
  selectedValue: {
    value: string;
    labelText: string;
  };
  className?: string;
  disabled?: boolean;
  onChange: (
    event: { name: string; value: string },
    labelText?: string
  ) => void;
}

const Dropdown = ({
  label,
  inputName,
  options,
  selectedValue,
  color = "light",
  displayText,
  disabled = false,
  onChange,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [currentValue, setCurrentValue] = React.useState<{
    value: string;
    labelText: string;
  }>(null);
  const contentRef = React.useRef<HTMLDivElement>();

  const handleClickOutside = () => {
    setIsOpen(false);
  };
  useClickOutside(contentRef, handleClickOutside);

  const toggleOptions = React.useCallback(
    () => !disabled && setIsOpen((prev) => !prev),
    [isOpen, disabled]
  );
  const handleOnChangeValue = React.useCallback(
    (labelText: string, value: string) => {
      if (!disabled) {
        onChange({ name: inputName, value }, labelText);
        setCurrentValue({ value, labelText });
        setIsOpen(false);
      }
    },
    [currentValue, disabled]
  );
  const handleOnClickOption = (labelText: string, value: string) => (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => handleOnChangeValue(labelText, value);

  React.useEffect(
    function handleDisabled() {
      if (disabled) {
        setIsOpen(false);
        setCurrentValue(null);
      }
    },
    [disabled]
  );
  React.useEffect(
    function handleSelectedValueChange() {
      setCurrentValue(selectedValue);
    },
    [selectedValue]
  );

  // TODO: Change size when dropdown height is more than scroll offset
  // React.useEffect(() => {
  //   console.log(
  //     "bounding-" + inputName,
  //     contentRef?.current?.getBoundingClientRect()
  //   );
  // }, [isOpen]);

  return (
    <div
      className={classNames("Dropdown", {
        dark: color === "dark",
        light: color === "light",
        disabled,
      })}
    >
      <p className="dropdown-label">{label}</p>
      <button type="button" className="dropdown-header" onClick={toggleOptions}>
        <p>
          {currentValue?.value === "" || !currentValue
            ? displayText
            : currentValue?.labelText || currentValue?.value}
        </p>
        <Icon size={1.5}>down</Icon>
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
              <li
                onClick={handleOnClickOption("", "")}
                className="dropdown-option"
              >
                {displayText}
              </li>
              {options.map((item) => (
                <li
                  key={item.value}
                  onClick={handleOnClickOption(item.display, item.value)}
                  className="dropdown-option"
                >
                  {item.display}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
