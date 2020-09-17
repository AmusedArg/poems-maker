import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,


  NavLink, Route, Switch
} from "react-router-dom";
import './App.scss';
import Poems from './components/Poems';
import Home from './pages/Home';
import PoemAuthorPage from './pages/PoemAuthorPage';
import PoemPage from './pages/PoemPage';
import RandomPoemPage from './pages/RandomPoemPage';
import generateStore from './redux/store';
import AuthorsPage from './pages/AuthorsPage';

const AppWrapper = () => {
  const store = generateStore();
  
  return (
    <Provider store={store}> 
      <App />
    </Provider>
  )
}

function App() {
  return (
    <Fragment>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <a className="navbar-brand" href="/">Poems Maker</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/poems" className="nav-link" activeClassName="active">Poemas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/authors" className="nav-link" activeClassName="active">Autores</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/random" className="nav-link" activeClassName="active">Aleatorio</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/poems">
          <div className="container poems-container">
            <Poems showFull={true} />
          </div>
        </Route>
        <Route exact path="/poems/:id">
          <PoemPage />
        </Route>
        <Route exact path="/poems/author/:name">
          <PoemAuthorPage />
        </Route>
        <Route path="/authors">
          <div className="container poems-container">
            <AuthorsPage />
          </div>
        </Route>
        <Route path="/random">
          <RandomPoemPage />
        </Route>
      </Switch>      
      </Router>
    </Fragment>
  );
}

export default AppWrapper;
