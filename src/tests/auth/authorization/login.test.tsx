import React from 'react';
import { configure } from 'enzyme';
import { render } from '@testing-library/react';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { RouteComponentProps } from 'react-router-dom';
import Login from '../../../pages/auth/authorization';

configure({ adapter: new Adapter() });

describe('MainContent', () => {
  let wrapper;
  const mockedStore = configureStore();
  const store = mockedStore({
    authReducer: {
      login: {
        success: {
          status: false,
        },
        error: null,
      },
    },
  });
  let props: RouteComponentProps;

  it('must rendered', () => {
    wrapper = render(
        <Provider store={store}>
          <Login {...props} />
        </Provider>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
