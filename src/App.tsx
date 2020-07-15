import React from 'react';
import './App.css';
import Router from './routing';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './redux';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
          <Router/>
      </Provider>
    </BrowserRouter>
  );
}

export default App;