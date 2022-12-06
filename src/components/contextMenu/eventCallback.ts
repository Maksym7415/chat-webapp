import { contextMenuAction } from "../../redux/common/commonActions";
import { ContextMenuConfig } from "../../redux/common/interafaces";
import { AppDispatch } from "../../redux";

export default (
  event: React.MouseEvent<HTMLElement>,
  id: number,
  config: Array<ContextMenuConfig>,
  dispatch: AppDispatch
) => {
  event.preventDefault();
  if (event.type === "click") {
    dispatch(
      contextMenuAction({
        yPos: "",
        xPos: "",
        isShowMenu: false,
        messageId: 0,
        config,
      })
    );
  }
  if (event.type === "contextmenu") {
    dispatch(
      contextMenuAction({
        yPos: `${event.pageY}px`,
        xPos: `${event.pageX}px`,
        isShowMenu: true,
        messageId: id,
        config,
      })
    );
  }
};
