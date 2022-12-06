import React from "react";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";

const RITitleWithSubtitleAndRightComponent = ({
  title = "",
  subTitle = "",
  renderRightComponent = null,
  onPressWrapperItemLeft = () => {},
  styles = {
    wrapperItem: {},
    wrapperItemLeft: {},
    title: {},
    subTitle: {},
  },
}: any) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classesRoot = useStyles(theme);

  return (
    <div
      className={classesRoot.wrapperItem}
      style={{
        justifyContent: renderRightComponent ? "space-between" : null,
        ...styles.wrapperItem,
      }}
    >
      <div
        onClick={onPressWrapperItemLeft}
        className={classesRoot.wrapperItemLeft}
        style={{
          ...styles.wrapperItemLeft,
        }}
      >
        <p
          className={classesRoot.title}
          style={{
            ...styles.title,
          }}
        >
          {title}
        </p>
        {subTitle ? (
          <p
            className={classesRoot.subTitle}
            style={{
              ...styles.subTitle,
            }}
          >
            {subTitle}
          </p>
        ) : null}
      </div>
      {renderRightComponent ? renderRightComponent() : null}
    </div>
  );
};
export default RITitleWithSubtitleAndRightComponent;
