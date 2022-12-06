import React from "react";

interface Props {
  name: string;
  width: string;
  height: string;
  fontSize: string;
}

const lettersStyle = {
  fontWeight: 700,
  color: "#ffffff",
};

export default function DefaultAvatar({
  name = "Chat",
  width,
  height,
  fontSize,
}: any) {
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
}
