import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import store from "./reduxToolkit";
import Router from "./routing";
import "./App.css";
import { SnackbarUtilsConfigurator } from "./helpers/notistack";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3}>
          <SnackbarUtilsConfigurator />
          <Router />
        </SnackbarProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
