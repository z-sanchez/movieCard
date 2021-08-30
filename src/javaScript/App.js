import React from "react";
import AddCards from "./AddCards";
import logo from "../images/logo.png";
import { getConfig } from "./tmdbFunctions";

class App extends React.Component {
  render() {
    getConfig();
    return (
      <div className="grid">
        <nav className="navFlex">
          <ul>
            <li>
              <h2>Your List</h2>
            </li>
            <li>
              <h2>New Releases</h2>
            </li>
            <li>
              <h2>Watchlist</h2>
            </li>
          </ul>
          <img className="logo" src={logo} alt="logo"></img>
        </nav>
        <AddCards />
        <footer className="footer">
          <h1>A site by Bruhdot777</h1>
        </footer>
      </div>
    );
  }
}

export default App;
