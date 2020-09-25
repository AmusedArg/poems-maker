import React, { Fragment, useContext, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route, Switch
} from "react-router-dom";
import Poems from './components/poems/Poems';
import AuthorsPage from './pages/authors/AuthorsPage';
import PoemsAuthorPage from './pages/authors/PoemsAuthorPage';
import ContactPage from './pages/ContactPage';
import Footer from './pages/home/Footer';
import Header from './pages/home/Header';
import Home from './pages/home/Home';
import PageNotFound from './pages/PageNotFound';
import PoemPage from './pages/poems/PoemPage';
import RandomPoemPage from './pages/poems/RandomPoemPage';
import ProfilePage from './pages/user/ProfilePage';
import SignUpPage from './pages/user/SignUpPage';
import { firebaseAuth } from './provider/AuthProvider';
import { configAction } from './redux/appConfigDucks';
import generateStore from './redux/store';
import './styles/App.scss';

const AppWrapper = () => {
  const store = generateStore();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function App() {
  const { isUserValid } = useContext(firebaseAuth)
  const dispatch = useDispatch();
  useEffect(() => {
    const getConfig = () => {
      dispatch(configAction());
    };
    getConfig();
  }, [dispatch])

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
            <PoemsAuthorPage />
          </Route>
          <Route path="/authors">
            <div className="container poems-container">
              <AuthorsPage />
            </div>
          </Route>
          <Route path="/random">
            <RandomPoemPage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/register">
            {isUserValid() ? <Redirect to="/" /> : <SignUpPage />}
          </Route>
          <Route path="/profile">
            {isUserValid() && <ProfilePage />}
          </Route>
          <Route component={PageNotFound} />
        </Switch>
        <Footer />
      </Router>
    </Fragment>
  );
}

export default AppWrapper;
