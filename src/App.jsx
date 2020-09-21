import React, { Fragment } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route, Switch
} from "react-router-dom";
import './styles/App.scss';
import Poems from './components/Poems';
import firebase from './Firebase';
import AuthorsPage from './pages/AuthorsPage';
import Footer from './pages/Footer';
import Header from './pages/Header';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import PoemAuthorPage from './pages/PoemAuthorPage';
import PoemPage from './pages/PoemPage';
import RandomPoemPage from './pages/RandomPoemPage';
import SignUpPage from './pages/SignUpPage';
import { authorizeUserAction } from './redux/authorizerDucks';
import generateStore from './redux/store';

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
  let user = useSelector(state => state.user);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(
      (user) => dispatch(authorizeUserAction(user))
    );
  }, [dispatch, user]);
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
          <Route path="/register">
            {user.data?.emailVerified ? <Redirect to="/" /> : <SignUpPage />}
          </Route>
          <Route component={PageNotFound} />
        </Switch>      
      </Router>
      <Footer />
    </Fragment>
  );
}

export default AppWrapper;
