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
  name,
  width,
  height,
  fontSize,
}: Props) {
  // VARIABLES
  const letters: Array<string> = (name && name.split(" ")) || ["Chat"];

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
      {letters[0] && (
        <>
          <span style={{ ...lettersStyle, fontSize }}>
            {letters[0][0].toUpperCase()}
          </span>
          {letters[1] && (
            <span style={{ ...lettersStyle, fontSize }}>
              {letters[1][0].toUpperCase()}
            </span>
          )}
        </>
      )}
    </div>
  );
}
