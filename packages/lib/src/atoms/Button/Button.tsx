import React from "react";
import "./Button.scss";

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;
export const Button = (props: ButtonProps) => <button className="Button" {...props} />;
