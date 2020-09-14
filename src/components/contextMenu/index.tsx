import React from 'react';
import { connect } from 'react-redux';
import { ContextMenuProps } from './interfaces';
import { RootState } from '../../redux/reducer';

class ContextMenu extends React.Component<ContextMenuProps> {
  // constructor(props: ContextMenuProps) {
  //   super(props);
  //   // this.state = {
  //   //   xPos: '0px',
  //   //   yPos: '0px',
  //   //   isShowMenu: false,
  //   // };
  // }

  componentDidMount() {
    // document.addEventListener('click', this.handleClick);
    // document.addEventListener('contextmenu', this.handleContextMenu);
  }

  componentWillUnmount() {
    // document.removeEventListener('click', this.handleClick);
    // document.removeEventListener('contextmenu', this.handleContextMenu);
  }

  // handleClick = (e) => {
  //   // ...
  // };

  // handleContextMenu = (e) => {
  //   e.preventDefault();

  //   // ...
  // };

  render() {
    if (this.props.isShowMenu) {
      return (
        <ul
          className="menu"
          style={{
            top: this.props.yPos,
            left: this.props.xPos,
          }}
        >
          <li>Login</li>
          <li>Register</li>
          <li>Open Profile</li>
        </ul>
      );
    }
    return null;
  }
}

const mapStateToProps = (state: RootState) => ({
  data: state.commonReducer.contextMenu,
});

export default connect(mapStateToProps, null)(ContextMenu);
