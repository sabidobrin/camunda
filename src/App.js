import React, { Component } from "react";
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ModelerPage from './pages/ModelerPage';
import FrameworksPage from './pages/FrameworksPage';
import HackSessionPage from "./pages/HacksessionPage";

export default class App extends Component {
    render() {
        return (
          <div className="App">
              <Navigation />
              <hr />
              <Routes>
                  <Route path="/modeler"><ModelerPage /></Route>
                  <Route path="/frameworks"><FrameworksPage /></Route>
                  <Route path="/hacksession"><HackSessionPage /></Route>
                  <Route exact path="/"><HomePage /></Route>
              </Routes>
          </div>
        );
    }   
}