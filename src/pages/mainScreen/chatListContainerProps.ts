export default [
  {
    style: {
      position: 'relative',
      background: '#dcf2ed',
    },
  },
  {
    default: {
      x: 0,
      y: 0,
      //   width: containerWidth,
      height: '100%',
    },
  },
  {
    minWidth: 80,
  },
  {
    maxWidth: '60vw',
  },
  // {
  //   onResize: (e, direction, ref, delta, position) => {
  //     // ref.offsetWidth < 200 && setContainerWidth(80);
  //   //   setIsHideChatListPanel(false);
  //   },
  // },
  {
    disableDragging: true,
  },
  {
    enableResizing: {
      top: false,
      right: true,
      bottom: false,
      left: false,
      topRight: false,
      bottomRight: false,
      bottomLeft: false,
      topLeft: false,
    },
  },
];
