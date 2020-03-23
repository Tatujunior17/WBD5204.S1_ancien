import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Header from "./components/layouts/Header";
import Accueil from "./components/playing/Accueil";
import Inscription from "./components/auth/Inscription";
import Login from "./components/auth/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/inscription" component={Inscription} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/accueil" component={Accueil} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
