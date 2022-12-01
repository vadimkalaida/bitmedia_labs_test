import { combineReducers } from "redux";
import filter from "./filter.reducer";
import data from "./data.reducer";

const rootReducers = combineReducers({
  filter,
  data
});

export default rootReducers;