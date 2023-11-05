import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "./user.reducer";
import { userApi } from "../services/user.service";
import { testApi } from "../services/test.service";

const rootReducer = combineReducers({
  userReducer,

  [userApi.reducerPath]: userApi.reducer,
  [testApi.reducerPath]: testApi.reducer,
});

export default rootReducer;
