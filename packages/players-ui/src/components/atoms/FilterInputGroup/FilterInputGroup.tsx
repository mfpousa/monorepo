import React from "react";
import { Icon } from "components/atoms/Icon";

import "./FilterInputGroup.scss";

interface FilterInputGroupProps {
  inputType: string;
  inputLabel: string;
  inputName: string;
  inputId: string;
  inputPlaceholder: string;
  value: string;
  icon?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilterInputGroup = ({
  inputType,
  inputLabel,
  inputName,
  inputId,
  inputPlaceholder,
  value: _value,
  icon = null,
  onChange,
  ...props
}: FilterInputGroupProps) => {
  const [value, setValue] = React.useState(_value);

  React.useEffect(() => {
    setValue(_value);
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <div className="filter-input-group">
      <label htmlFor={inputId} className="filter-input-label">
        {inputLabel}
      </label>
      <div className="filter-input-container">
        <input
          type={inputType}
          name={inputName}
          id={inputId}
          placeholder={inputPlaceholder}
          onChange={handleOnChange}
          className="filter-input"
          value={value}
          {...props}
        />
        {icon && <Icon size={2}>{icon}</Icon>}
      </div>
    </div>
  );
};

export default FilterInputGroup;
