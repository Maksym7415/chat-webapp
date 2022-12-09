import React from "react";
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { useAppSelector } from "../../hooks/redux";
import { eContextMenuId } from "../../ts/enums/app";

export default function ContextMenu() {
  const contextMenuConfig: any = useAppSelector(
    ({ appSlice }) => appSlice.contextMenuConfig
  );
  return (
    <Menu id={eContextMenuId.main}>
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
