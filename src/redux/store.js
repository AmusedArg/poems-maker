import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import poemReducer from './poemDucks';
import poemsReducer from './poemsDucks';
import authorsReducer from './authorsDucks';


const rootReducer = combineReducers({
  poems: poemsReducer,
  poem: poemReducer,
  authors: authorsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  return store;
}