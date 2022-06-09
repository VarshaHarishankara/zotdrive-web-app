import React, { Component } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {ZDHome} from './views/ZDHome';
import { ZDDashboard } from './views/ZDDashboard';
import { ZDSignUp } from './views/ZDSignUp';
import { ZDLogin } from './views/ZDLogin';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ZDLogin/>}/>
            <Route path="/dashboard" element={<ZDDashboard/>}/>
            <Route path="/signup" element={<ZDSignUp/>} />
            <Route path="/login" element={<ZDLogin/>} />
        </Routes>
    </BrowserRouter>
    );
  }
}
export default App;