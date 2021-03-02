import React from "react";
import { Button, ButtonProps } from "@/atoms/Button";

export interface OtherProps extends ButtonProps {
  foo: string;
}
export const Other = ({ foo }: OtherProps) => <Button>{foo}</Button>;
