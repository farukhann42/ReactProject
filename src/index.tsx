import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
// @ts-ignore
import UserDetails from "./pages/UserDetails.tsx";
import { BrowserRouter as Router, Route } from "react-router-dom";


ReactDOM.render(
    <Router>
        <Route exact path="/" component={App} />
        <Route path="/user-details/:id" component={UserDetails} />
    </Router>,
  document.getElementById('root')
);

reportWebVitals();
