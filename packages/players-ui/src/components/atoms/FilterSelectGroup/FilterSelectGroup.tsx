import React, { useState } from "react";

import "./FilterSelectGroup.scss";

interface FilterSelectGroupProps {
  inputLabel: string;
  inputName: string;
  inputId: string;
  inputPlaceholder: string;
  selectedValue: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  values?: Array<{ title: string; value: string }>;
  disabled?: boolean;
}

const FilterSelectGroup = ({
  inputLabel,
  inputName,
  inputId,
  inputPlaceholder,
  selectedValue = "",
  onChange,
  values = [],
  disabled = false,
}: FilterSelectGroupProps) => {
  return (
    <div className="filter-input-group">
      <label htmlFor={inputId} className="filter-input-label">
        {inputLabel}
      </label>
      <div className="filter-input-container">
        <select
          name={inputName}
          id={inputId}
          placeholder={inputPlaceholder}
          onChange={(e) => {
            if (!disabled) {
              onChange(e);
            }
          }}
          className="filter-input-select"
          value={selectedValue}
          disabled={disabled}
        >
          <option value="">{inputPlaceholder}</option>
          {values.map((item) => (
            <option
              value={item.value}
              key={item.value}
              selected={selectedValue === item.value}
            >
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSelectGroup;
