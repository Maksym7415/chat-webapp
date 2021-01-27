import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Router from './routing';
import store from './redux';
import { SocketOnwrapper } from './socket';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SocketOnwrapper>
          <Router/>
        </SocketOnwrapper>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
