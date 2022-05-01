import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom"
import { PostProvider, LoginUserProvider } from "./contexts/index"

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <LoginUserProvider>
      <BrowserRouter>
        <PostProvider>
          <App />
        </PostProvider>
      </BrowserRouter>
    </LoginUserProvider>

  </React.StrictMode>,
  document.getElementById("root")
);
