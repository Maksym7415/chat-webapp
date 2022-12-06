import React from "react";
import useStyles from "./styles";
import ConversationList from "./components/conversationList";
import SearchPage from "../../../search";
import Header from "./components/header";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { eSideLeftConfigPage } from "../../../../ts/enums/app";
import { TYPES_FROM_TO_SEARCH_SCREEN } from "../../../../config/constants/general";

export default function LeftSide() {
  // HOOKS
  const dispatch = useAppDispatch();
  const classes = useStyles();

  // SELECTORS
  const sideLeftConfig = useAppSelector(
    ({ appSlice }) => appSlice.sideLeftConfig
  );

  // RENDERS
  const renderContent = React.useMemo(() => {
    switch (sideLeftConfig.page) {
      case eSideLeftConfigPage.conversationList:
        return <ConversationList />;
      case eSideLeftConfigPage.searchContacts:
        return (
          <SearchPage
            params={{
              from: TYPES_FROM_TO_SEARCH_SCREEN.main,
            }}
          />
        );
      default:
        return <></>;
    }
  }, [sideLeftConfig]);

  return (
    <div className={classes.container}>
      <Header>
        <></>
      </Header>
      {renderContent}
    </div>
  );
}
