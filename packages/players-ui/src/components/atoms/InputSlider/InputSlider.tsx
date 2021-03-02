import React from "react";

import "./InputSlider.scss";

interface InputSliderProps {
  inputMinLabel: string;
  inputMinName: string;
  inputMaxLabel: string;
  inputMaxName: string;
  minSelectedValue: string;
  maxSelectedValue: string;
  step?: string;
  inputOnChange: (
    descriptionText: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSlider = ({
  inputMinLabel,
  inputMaxLabel,
  inputMinName,
  inputMaxName,
  minSelectedValue,
  maxSelectedValue,
  step = "0.5",
  inputOnChange,
}: InputSliderProps) => {
  const [gameMinLevel, setGameMinLevel] = React.useState<number>(
    parseInt(minSelectedValue, 10)
  );
  const [gameMaxLevel, setGameMaxLevel] = React.useState<number>(
    parseInt(maxSelectedValue, 10)
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case inputMinName:
        if (
          parseFloat(value) > gameMaxLevel ||
          parseFloat(value) === gameMaxLevel
        )
          return;
        setGameMinLevel(parseFloat(value));
        inputOnChange(`Min Level ${value}`)(event);
        break;

      case inputMaxName:
        if (
          parseFloat(value) < gameMinLevel ||
          parseFloat(value) === gameMinLevel
        )
          return;
        inputOnChange(`Max Level ${value}`)(event);
        setGameMaxLevel(parseFloat(value));
        break;
    }
  };

  React.useEffect(() => {
    if (minSelectedValue) {
      setGameMinLevel(parseFloat(minSelectedValue));
    }
    if (maxSelectedValue) {
      setGameMaxLevel(parseFloat(maxSelectedValue));
    }
  }, [minSelectedValue, maxSelectedValue]);

  return (
    <>
      <div
        className="wrap"
        role="group"
        aria-labelledby="multi-lbl"
        style={
          {
            "--a": gameMinLevel,
            "--b": gameMaxLevel,
            "--min": 1,
            "--max": 7,
          } as React.CSSProperties
        }
      >
        <input
          id="a"
          name={inputMinName}
          type="range"
          step={step}
          min="1"
          value={gameMinLevel}
          max="7"
          onChange={onChange}
        />
        <input
          id="b"
          name={inputMaxName}
          type="range"
          step={step}
          min="1"
          value={gameMaxLevel}
          max="7"
          onChange={onChange}
        />
      </div>
      <p>
        {inputMinLabel}: {gameMinLevel}
      </p>
      <p>
        {inputMaxLabel}: {gameMaxLevel}
      </p>
      <p></p>
    </>
  );
};

export default InputSlider;
