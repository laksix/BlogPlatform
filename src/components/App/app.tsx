import React from "react";
import MainSection from "../MainSection";
import { Provider } from 'react-redux';
import { setupStore } from "../store/store";


const App = () => {
  
const store = setupStore()
    return (
      <Provider store = {store}>
      <MainSection/>
      </Provider>
    )
}
export default App