import React from "react";
import { ThemeButton } from "./styles";

const CustomButton = ({ children, onClick, style }: any) => (
  <ThemeButton onClick={onClick} style={style}>
    {children}
  </ThemeButton>
);

export default CustomButton;
