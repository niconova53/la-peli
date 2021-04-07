import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import {
  CurrentMovies,
  MovieSelected,
  ComingSoon,
  Genres,
  GenreSelected,
  SearchMovie,
} from "./routes";
import { Header, Body, Footer } from "./components";

const App = () => {
  return (
    <Router>
      <Body>
        <Header />

        <Switch>
          <Route exact path="/buscar" component={SearchMovie} />
          <Route exact path="/cartelera" component={CurrentMovies} />
          <Route exact path="/proximamente" component={ComingSoon} />
          <Route exact path="/generos" component={Genres} />
          <Route exact path="/generos/:name/:id" component={GenreSelected} />

          <Route exact path="/movie/:id" component={MovieSelected} />

          <Redirect exact from="/" to="/cartelera" />
        </Switch>

        <Footer />
      </Body>
    </Router>
  );
};
export default App;
