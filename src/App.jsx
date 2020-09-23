import React, { Fragment, useContext } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route, Switch
} from "react-router-dom";
import Poems from './components/poems/Poems';
import AuthorsPage from './pages/AuthorsPage';
import Footer from './pages/Footer';
import Header from './pages/Header';
import Home from './pages/Home';
import PageNotFound from './pages/PageNotFound';
import PoemAuthorPage from './pages/PoemAuthorPage';
import PoemPage from './pages/PoemPage';
import RandomPoemPage from './pages/RandomPoemPage';
import SignUpPage from './pages/SignUpPage';
import { firebaseAuth } from './provider/AuthProvider';
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
            {isUserValid() ? <Redirect to="/" /> : <SignUpPage />}
          </Route>
          <Route component={PageNotFound} />
        </Switch>      
      </Router>
      <Footer />
    </Fragment>
  );
}

export default AppWrapper;
