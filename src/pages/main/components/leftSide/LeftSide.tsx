import React from "react";
import { makeStyles } from "@mui/styles";
import Conversations from "../../../conversations";
import SearchPage from "../../../search";
import Header from "./components/header";
import { useAppSelector } from "../../../../hooks/redux";
import { eSideLeftConfigPage } from "../../../../ts/enums/app";
import { TYPES_FROM_TO_SEARCH_SCREEN } from "../../../../config/constants/general";

// need ts

// STYLES
const useStyles = makeStyles((theme) => ({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    background: "#ffffff",
  },
}));

const LeftSide = () => {
  // HOOKS
  const classes = useStyles();

  // REFS
  const refHeader = React.useRef(null);

  // SELECTORS
  const sideLeftConfig = useAppSelector(
    ({ appSlice }) => appSlice.sideLeftConfig
  );

  // RENDERS
  const renderContent: JSX.Element = React.useMemo(() => {
    const heightContent = `calc(100vh - ${
      refHeader?.current?.clientHeight || 0
    }px)`;

    switch (sideLeftConfig.page) {
      case eSideLeftConfigPage.conversations:
        return <Conversations heightContent={heightContent} />;
      case eSideLeftConfigPage.searchContacts:
        return (
          <SearchPage
            params={{
              from: TYPES_FROM_TO_SEARCH_SCREEN.main,
            }}
            heightContent={heightContent}
          />
        );
      default:
        return <></>;
    }
  }, [sideLeftConfig, refHeader?.current?.clientHeight]);

  return (
    <div className={classes.container}>
      <Header ref={refHeader}>
        <></>
      </Header>
      {renderContent}
    </div>
  );
};
export default React.memo(LeftSide);
