import { contextMenuAction } from '../../redux/common/commonActions';

export default (event: React.MouseEvent<HTMLElement>, id: number, component: Function, dispatch: any) => {
  event.preventDefault();
  if (event.type === 'click') {
    dispatch(contextMenuAction({
      yPos: '',
      xPos: '',
      isShowMenu: false,
      messageId: 0,
      component,
    }));
  }
  if (event.type === 'contextmenu') {
    dispatch(contextMenuAction({
      yPos: `${event.pageY}px`,
      xPos: `${event.pageX}px`,
      isShowMenu: true,
      messageId: id,
      component,
    }));
  }
};
