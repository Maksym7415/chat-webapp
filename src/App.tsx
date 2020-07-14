import React, { useState, useEffect } from 'react';
import { loginRequest } from './redux/actionCreators/loginAction';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from './redux/reducers/rootReducer'
import './App.css';

interface Prop {
  name: string,
  data: object[],
  onClick: (e: React.MouseEvent, setValue: any) => void
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function App({ name, data, onClick, changeHandler }: Prop) {
  const buttonName: string = 'click'
  const dispatch = useDispatch()
  const tokens = useSelector((state: AppState) => state.loginReducer.tokens)
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    dispatch(loginRequest({ login: 'popovmaksim7415@gmail.com', verificationCode: 12345 }))
  }, [dispatch])

  return (
    <div className="App">
      {name}
      {console.log(tokens)}
      {[1, 2, 3, 4, 5].map((el) => <button value={el} key={el} onClick={(e) => onClick(e, setValue)}>{buttonName}</button>)}
      <input onChange={changeHandler}></input>
    </div>
  );
}

export default App;
