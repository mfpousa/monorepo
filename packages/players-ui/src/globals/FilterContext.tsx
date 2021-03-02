import React, { createContext, useState } from "react";
import moment from "moment";
import { calculateStartDateInGames } from "globals/utils";
import { CONTEXT } from "globals/context";

interface FilterContextType {
  queryStrings?: any;
  setQueryStrings?: React.Dispatch<React.SetStateAction<any>>;
  // filters?: Array<{
  //   query: string;
  //   value: string;
  //   type: string;
  //   description: string;
  // }>;
  handleApplyBtn?: (
    values: {
      query: string;
      value: string;
      type: string;
      description?: string;
    }[],
    setFilters: React.Dispatch<
      React.SetStateAction<
        Array<{
          query: string;
          value: string;
          type: string;
          description?: string;
        }>
      >
    >,
    callback?: () => void
  ) => () => void;
  dropdownOnChange?: (
    type: string,
    setValues: (
      value: React.SetStateAction<
        {
          query: string;
          value: string;
          type: string;
          description?: string;
        }[]
      >
    ) => void
  ) => (
    {
      name,
      value,
    }: {
      name: string;
      value: string;
    },
    labelText: string
  ) => void;
  findValueByQueryName?: (
    values: {
      query: string;
      value: string;
      type: string;
      description?: string;
    }[]
  ) => (
    query: string
  ) => {
    labelText: string;
    value: string;
  };
  inputOnChange?: (
    type: string,
    setValues: (
      value: React.SetStateAction<
        {
          query: string;
          value: string;
          type: string;
          description?: string;
        }[]
      >
    ) => void
  ) => (
    descriptionText: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  transformHasString?: (
    value: string,
    length: number,
    start?: number
  ) => string;
  dropdownCheckboxesChange?: (
    type: string,
    setValues: (
      value: React.SetStateAction<
        {
          query: string;
          value: string;
          type: string;
          description?: string;
        }[]
      >
    ) => void
  ) => (
    _values: Array<{
      labelText: string;
      value: string;
    }>
  ) => void;
}

export const FilterContext = createContext<FilterContextType>({});

interface FilterContextProviderProps {
  children: React.ReactNode;
}

const FilterContextProvider = ({ children }: FilterContextProviderProps) => {
  const { setIsModalOpen } = React.useContext(CONTEXT);
  const [queryStrings, setQueryStrings] = useState({});

  const handleApplyBtn = (
    values: Array<{
      query: string;
      value: string;
      type: string;
      description?: string;
    }>,
    setFilters: React.Dispatch<
      React.SetStateAction<
        Array<{
          query: string;
          value: string;
          type: string;
          description?: string;
        }>
      >
    >,
    callback?: () => void
  ) => () => {
    const newFilters = values.map((item) =>
      item.value.startsWith("has") ? { ...item, value: "true" } : { ...item }
    );

    setFilters(newFilters);
    setIsModalOpen(false);
    if (callback) {
      callback();
    }
  };

  const dropdownOnChange = (
    type: string,
    setValues: (
      value: React.SetStateAction<
        {
          query: string;
          value: string;
          type: string;
          description?: string;
        }[]
      >
    ) => void
  ) => (
    {
      name,
      value,
    }: {
      name: string;
      value: string;
    },
    labelText: string
  ) => {
    setValues((prev) => [
      ...prev.filter((item) => item.query !== name),
      { query: name, value, type, description: labelText },
    ]);
  };

  const findValueByQueryName = (
    values: {
      query: string;
      value: string;
      type: string;
      description?: string;
    }[]
  ) => (query: string) => {
    const obj = values.find((item) => item.query === query);
    return { labelText: obj?.description || "", value: obj?.value || "" };
  };

  const settingValues = (
    type: string,
    setValues: (
      value: React.SetStateAction<
        {
          query: string;
          value: string;
          type: string;
          description?: string;
        }[]
      >
    ) => void
  ) => (query: string, value: string, description: string) => {
    setValues((prev) => [
      ...prev.filter((item) => item.query !== query),
      { query, value, type, description },
    ]);
  };

  const settingDateValues = (
    type: string,
    setValues: (
      value: React.SetStateAction<
        {
          query: string;
          value: string;
          type: string;
          description?: string;
        }[]
      >
    ) => void
  ) => (name: string, value: string, descriptionText: string) => {
    const m = moment(value);
    if (!m.isValid()) {
      return;
    }
    const date = m.format();
    settingValues(type, setValues)(
      name,
      m.toISOString(),
      `${descriptionText} ${calculateStartDateInGames(date)}`
    );
  };

  const inputOnChange = (
    type: string,
    setValues: (
      value: React.SetStateAction<
        {
          query: string;
          value: string;
          type: string;
          description?: string;
        }[]
      >
    ) => void
  ) => (descriptionText: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    switch (name) {
      case "gameMinLevel":
        settingValues(type, setValues)(name, value, descriptionText);
        break;

      case "gameMaxLevel":
        settingValues(type, setValues)(name, value, descriptionText);
        break;

      case "startDate":
        settingDateValues(type, setValues)(name, value, descriptionText);
        break;

      case "endDate":
        settingDateValues(type, setValues)(name, value, descriptionText);
        break;

      default:
        settingValues(type, setValues)(name, value, descriptionText);
        break;
    }
  };

  const transformHasString = (
    value: string,
    length: number,
    start: number = 1
  ): string => {
    if (value.indexOf("_")) {
      const valueArr = value.split("_");
      const almostString = [];
      valueArr.map((value) => {
        almostString.push(
          `${value.charAt(0)}${value.toLowerCase().slice(start, length)}`
        );
      });
      const finalString = almostString.join("");
      return `has${finalString}`;
    } else {
      const txt = value.replace(" ", "");
      return `has${txt.charAt(0)}${txt.toLowerCase().slice(start, length)}`;
    }
  };

  const dropdownCheckboxesChange = (
    type: string,
    setValues: (
      value: React.SetStateAction<
        {
          query: string;
          value: string;
          type: string;
          description?: string;
        }[]
      >
    ) => void
  ) => (_values: Array<{ labelText: string; value: string }>) => {
    setValues((prev) => {
      return [
        ...prev.filter((item) => item.type !== type),
        ..._values.map((item) => {
          return {
            query: item.value,
            value: item.value,
            type,
            description: item.labelText,
          };
        }),
      ];
    });
  };

  return (
    <FilterContext.Provider
      value={{
        queryStrings,
        setQueryStrings,
        handleApplyBtn,
        dropdownOnChange,
        findValueByQueryName,
        inputOnChange,
        transformHasString,
        dropdownCheckboxesChange,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContextProvider;
