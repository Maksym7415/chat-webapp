import React from "react";
import { useTheme } from "@mui/material/styles";
import useStyles from "./styles";
import UserAvatar from "../../../../components/avatar/userAvatar";
import RenderConditionsList from "../../../../components/renders/renderConditionsList";
import { useAppSelector } from "../../../../hooks/redux";

const SearchMain = ({ onClickContact }: any) => {
  // HOOKS
  const theme = useTheme();

  // STYLES
  const classes = useStyles(theme);

  // SELECTORS
  const { searchContacts, isLoading } = useAppSelector(
    ({ searchSlice }) => searchSlice
  );

  // RENDERS
  const renderSearchContacts = React.useMemo(() => {
    if (!searchContacts?.response?.length) {
      return <></>;
    }

    // чомусь рендередься два рази
    console.log("render - searchContacts");

    return searchContacts?.response?.map((item, index) => {
      return (
        <div
          key={item.id}
          className={classes.wrapperContact}
          onClick={() => onClickContact(item)}
        >
          <div className={classes.avatarView}>
            <UserAvatar
              source={item.userAvatar}
              status={[1, 3].includes(index) ? "online" : ""}
              name={item.fullName}
            />
          </div>
          <div className={classes.wrapperInfo}>
            <p className={classes.fullName}>{item.fullName}</p>
            <p className={classes.login}>{item.login}</p>
          </div>
        </div>
      );
    });
  }, [searchContacts?.response]);

  // RENDER CONDITIONAL
  if (!searchContacts?.response.length || isLoading) {
    return (
      <RenderConditionsList
        list={searchContacts?.response}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      <div className={classes.container}>
        <div className={classes.wrapperContacts}>{renderSearchContacts}</div>
      </div>
    </>
  );
};

export default SearchMain;
