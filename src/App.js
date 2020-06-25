import React from 'react';
import MobilelandingPage from "./MobileLandingPage"
import MobileOnetoOnePage from "./MobileOnetoOnePage"
import MobileListConversionPage from "./MobileListConversionPage"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar d-flex justify-content-center border-bottom">
        <h2>Currency Converter</h2>
      </nav>
      <Switch>
        <Route path="/" exact component={MobilelandingPage} />
        <Route path="/mobileonetoonepage/" component={MobileOnetoOnePage} />
        <Route path="/mobilelistconversionpage/" component={MobileListConversionPage} />
      </Switch>
      <footer className="d-flex flex-column align-items-center border-top pt-2 mt-2">
        <p>Produced by Kohei Oishi</p>
        <p>More about him at
          <a href="https://www.facebook.com/kohei.oishi.9/" className="mx-2"><i class="fab fa-facebook-square"></i></a>
          <a href="https://github.com/Payoshika" className="mx-2"><i class="fab fa-github-square"></i></a>
        </p>
      </footer>
    </Router>
  );
}

export default App;
