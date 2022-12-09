import React from "react";
import { Divider } from "@mui/material";
import useStyles from "./styles";
import SvgMaker from "../../../../components/svgMaker";
import { uuid } from "../../../../helpers";
import { useAppSelector } from "../../../../hooks/redux";

const ListMenu = ({ title, list, onPress }: any) => {
  // HOOKS
  const classes = useStyles();

  // SELECTORS
  const { lang } = useAppSelector(({ settingSlice }) => settingSlice);

  // FUNCTIONS
  const ListItem = ({ item }) => {
    return (
      <div
        onClick={() => onPress(item)}
        className={classes.wrapperListItem}
        // disabled={item.disabled}
      >
        {item.icon?.name && <SvgMaker name={item.icon?.name} />}
        <p className={classes.listItemTitle}>{item.title}</p>
      </div>
    );
  };

  // VARIABLES
  const items = list(lang);

  return (
    <div className={classes.wrapperList}>
      <p className={classes.listTitle}>{title}</p>
      <div className={classes.list}>
        {items.map((item, index) => {
          return items.length > index + 1 ? (
            <React.Fragment key={uuid()}>
              <ListItem item={item} />
              <Divider className={classes.divider} />
            </React.Fragment>
          ) : (
            <ListItem item={item} key={uuid()} />
          );
        })}
      </div>
    </div>
  );
};

export default ListMenu;
