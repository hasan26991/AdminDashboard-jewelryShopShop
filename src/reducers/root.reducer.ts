import { combineReducers } from "@reduxjs/toolkit";
import { testApi } from "../services/test.service";

const rootReducer = combineReducers({
  [testApi.reducerPath]: testApi.reducer,
});

export default rootReducer;
