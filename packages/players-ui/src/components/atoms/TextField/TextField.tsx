import React from "react";
import { useLocation } from "react-router";

import "./TextField.scss";

const TextField = ({ icon, setFilters, ...otherProps }) => {
  const location = useLocation();
  const [value, setValue] = React.useState<string>("");

  React.useEffect(() => {
    setFilters((prev) => [
      ...prev.filter(({ query }) => query !== "name"),
      {
        query: "name",
        value,
        type: location.pathname.replace("/", ""),
        description: "",
      },
    ]);
  }, [value]);

  const handleOnChange = (event) => {
    const { value } = event.target;
    setValue(value);
  };

  return (
    <div className="TextField">
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleOnChange}
        value={value}
        {...otherProps}
      />
      <button type="submit">
        {icon && <div className="icon">{icon}</div>}
      </button>
    </div>
  );
};

export default TextField;
