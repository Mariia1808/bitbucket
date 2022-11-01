import logo from "./logo.svg";
import "./App.css";
import React from 'react';
import AppRouter from "./component/AppRouter";
import { BrowserRouter } from "react-router-dom";


const App = () => {
   
    return (
      <BrowserRouter>
          <AppRouter />
      </BrowserRouter>
    );
};

export default App;
