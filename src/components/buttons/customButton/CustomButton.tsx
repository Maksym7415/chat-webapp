import React from "react";
import { ThemeButton } from "./styles";

interface IProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  style: React.CSSProperties;
  children: React.ReactNode;
}

const CustomButton = ({ children, onClick, style }: IProps) => (
  <ThemeButton onClick={onClick} style={style}>
    {children}
  </ThemeButton>
);

export default CustomButton;
