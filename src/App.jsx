import React, { Fragment } from 'react';
import { Provider, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";
import './styles/App.scss';
import Poems from './components/Poems';
import AuthorsPage from './pages/AuthorsPage';
import Header from './pages/Header';
import Home from './pages/Home';
import PoemAuthorPage from './pages/PoemAuthorPage';
import PoemPage from './pages/PoemPage';
import RandomPoemPage from './pages/RandomPoemPage';
import generateStore from './redux/store';
import PageNotFound from './pages/PageNotFound';
import Footer from './pages/Footer';
import SignUpPage from './pages/SignUpPage';
import { authorizeUserAction } from './redux/authorizerDucks';
import firebase from './Firebase';

const AppWrapper = () => {
  const store = generateStore();
  
  return (
    <Provider store={store}> 
      <App />
    </Provider>
  )
}

function App() {
  const dispatch = useDispatch();
  firebase.auth().onAuthStateChanged(
    (user) => dispatch(authorizeUserAction(user))
  );
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
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route component={PageNotFound} />
        </Switch>      
      </Router>
      <Footer />
    </Fragment>
  );
}

export default AppWrapper;
