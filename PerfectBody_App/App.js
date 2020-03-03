import * as React from "react";
import { Provider} from "react-redux";
import { store } from "./src/redux/store";
// import TabMenu from "./src/components/TabMenu";
// import AuthFrom from "./src/components/AuthForm/authForm";
import InitialInfo from "../PerfectBody_App/src/components/initialInfo/InitialInfo";
import AppContainer from './src/AppContainer';

function App() {
  return (
<Provider store={store}>

    <AppContainer/>
</Provider>
  );
}


export default App;
