import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './redux/store/configureStore'
const clikHandler = (e: any, setValue: any) => {
  setValue((el: number): number => el)

}

const changeHandler = (e: any) => {
  console.log(e.target.value[e.target.value.length - 1])
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App name={'1'} onClick={clikHandler} data={[{ a: 3 }]} changeHandler={changeHandler} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
