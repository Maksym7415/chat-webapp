import React from "react";

interface IProps {
  name: string;
  width: string;
  height: string;
  fontSize?: string;
}

const lettersStyle = {
  fontWeight: 700,
  color: "#ffffff",
};

const DefaultAvatar = ({ name = "Chat", width, height, fontSize }: IProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#48b7db",
        borderRadius: "50%",
        width,
        height,
        flexShrink: 0,
      }}
    >
      <span style={{ ...lettersStyle, fontSize }}>{name}</span>
    </div>
  );
};

export default DefaultAvatar;
