import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import List from "./views/List/List";
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />

          <Route exact path="/list" component={List} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
