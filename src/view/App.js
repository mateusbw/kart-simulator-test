import React from "react";
import { Provider } from "react-redux";
import "./styles/reset.scss";
import "./styles/main.scss";
import store from "../state/store";
import Routes from "./routes/Routes";

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

export default App;
