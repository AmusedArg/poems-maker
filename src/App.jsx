import './App.scss';
import React, { Fragment } from 'react';
import generateStore from './redux/store';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import Home from './pages/Home';
import Poems from './components/Poems';
import PoemPage from './pages/PoemPage';
import RandomPoemPage from './pages/RandomPoemPage';

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
              <NavLink to="/random" className="nav-link" activeClassName="active">Aleatorio</NavLink>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="text" placeholder="Ej: Elvira" />
            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Buscar</button>
          </form> */}
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
        <Route path="/poems/:id">
          <PoemPage />
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
