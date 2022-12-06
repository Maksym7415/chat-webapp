import React from "react";
import { configure } from "enzyme";
import { render } from "@testing-library/react";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { RouteComponentProps } from "react-router-dom";
// import MainScreen from '../../pages/mainScreen';

configure({ adapter: new Adapter() });

describe("MainContent", () => {
  let wrapper;
  const mockedStore = configureStore();
  const store = mockedStore({
    userConversationReducer: {
      userHistoryConversation: {
        success: {
          data: [],
          pagination: {
            allItems: 0,
            currentPage: 0,
          },
        },
        error: null,
      },
      conversationsList: {
        success: {
          data: [],
        },
        error: null,
      },
      conversations: {
        message: "",
        id: 0,
        sendDate: "",
      },
      currentChat: {
        id: 0,
      },
      lastMessages: {},
    },
  });

  let props: RouteComponentProps;

  it("must rendered", () => {
    wrapper = render(
      <Provider store={store}>{/* <MainScreen {...props} /> */}</Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
