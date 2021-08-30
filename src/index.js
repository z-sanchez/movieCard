import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/nav.css";
import "./css/addButton.css";
import "./css/card.css";
import "./css/cardDetails.css";
import "./css/addingWindow.css";
import "./css/slider.css";
import "./css/noMovieMessage.css";
import "./css/footer.css";
import App from "./javaScript/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
