import React from "react";
import {
  Menu,
  Item,
  // Separator,
  // Submenu,
  // useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useAppSelector } from "../../hooks/redux";

// redux
import { ContextMenuConfig } from "../../redux/common/interafaces";

const MENU_ID = "menu-id";

export default function ContextMenu() {
  const contextMenuConfig: any = useAppSelector(
    ({ appSlice }) => appSlice.contextMenuConfig
  );

  // console.log(contextMenuConfig, "contextMenuConfig");

  function handleItemClick({ event, props, triggerEvent, data }) {
    console.log(event, props, triggerEvent, data, "ssss");
  }

  return (
    <Menu id={MENU_ID}>
      {/* <Item onClick={handleItemClick}>Item 1</Item>
      <Item onClick={handleItemClick}>Item 2</Item>
      <Separator />
      <Item disabled>Disabled</Item>
      <Separator />
      <Submenu label="Submenu">
        <Item onClick={handleItemClick}>Sub Item 1</Item>
        <Item onClick={handleItemClick}>Sub Item 2</Item>
      </Submenu> */}

      {contextMenuConfig.config.map((item: any) => (
        <Item
          key={item.id}
          onClick={() => contextMenuConfig.callBackItem(item)}
          closeOnClick={item?.NoCloseOnClick ? false : true}
        >
          {item.title}
        </Item>
      ))}
    </Menu>
  );
}
