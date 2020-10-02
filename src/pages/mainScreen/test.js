import React, { Component } from 'react';

export default class NewChallenge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Start challenging your friends!',
    };
  }

  componentDidMount() {
    this.setState({ title: 'Component did mount' });
  }

  // switchPage = () => {
  //   const { page } = this.state;
  //   switch (page) {
  //     case 0:
  //       return <HowItWorks onAction={(i) => this.setState({ page: i })} />;
  //     case 1:
  //       return (
  //         <WhoToChallenge onAction={(reciever) => this.setState(reciever)} />
  //       );
  //     case 2:
  //       return (
  //         <ConfigureChallenge onAction={(obj) => this.handleSubmit(obj)} />
  //       );
  //     case 3:
  //       return <WellDone />;
  //     default:
  //       break;
  //   }
  // };

  render() {
    return (
      <>
        <div className="Form">
          <h1>{this.state.title}</h1>
          {/* <div className="challenge-modal">{this.switchPage()}</div> */}
        </div>
      </>
    );
  }
}
