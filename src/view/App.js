import Routes from "./routes/Routes";
import "./styles/reset.scss"
import "./styles/main.scss"
import { Provider } from 'react-redux';
import store from "../state/store"

function App() {
  return (
    <Provider store={store}>
      <Routes></Routes>
    </Provider>
  );
}

export default App;
