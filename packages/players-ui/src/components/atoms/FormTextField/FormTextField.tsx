import React from "react";

import "./FormTextField.scss";

interface FormTextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    event: { name: string; value: string },
    labelText?: string
  ) => void;
}

const FormTextField = ({ value, label, onChange }: FormTextFieldProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    onChange({ name, value }, label);
  };

  return (
    <div className="FormTextField">
      <label htmlFor="" className="label">
        {label}
      </label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleOnChange}
        value={value}
      />
    </div>
  );
};

export default FormTextField;
