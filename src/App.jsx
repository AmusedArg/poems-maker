import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './App.scss';
import Poems from './components/Poems';
import AuthorsPage from './pages/AuthorsPage';
import Header from './pages/Header';
import Home from './pages/Home';
import PoemAuthorPage from './pages/PoemAuthorPage';
import PoemPage from './pages/PoemPage';
import RandomPoemPage from './pages/RandomPoemPage';
import generateStore from './redux/store';
import PageNotFound from './pages/PageNotFound';

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
        <Header />
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
        <Route component={PageNotFound} />
      </Switch>      
      </Router>
    </Fragment>
  );
}

export default AppWrapper;
