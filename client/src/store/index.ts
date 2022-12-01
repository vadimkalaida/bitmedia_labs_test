import { createStore, applyMiddleware, compose } from "redux";
import rootReducers from "./reducers";
import thunk from 'redux-thunk';

const store = createStore(
  rootReducers,
  undefined,
  compose(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;