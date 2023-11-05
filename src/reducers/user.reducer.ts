import { createReducer, isAnyOf } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
// import { cleanSelectedPTWP } from "actions/construction/preTaskWorkPlan.action";
// import { PTWP } from "models/construction/preTaskWorkPlan/PTWP";
import { userApi } from "../services/user.service";
import { cleanSelectedUser } from "../actions/user.action";

interface UserState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  currentUser: any;
}

const initialState: UserState = {
  currentUser: null,
};

const updateWorkflowActions = isAnyOf(userApi.endpoints.login.matchFulfilled);

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(cleanSelectedUser, (state) => {
      state.currentUser = null;
    })
    .addMatcher(updateWorkflowActions, (state, action) => {
      state.currentUser = action.payload;
    });
});

const persisted = persistReducer(
  { key: "user", storage, whitelist: ["currentUser"] },
  user
);

export const useUserState = () => useSelector(({ userReducer }) => userReducer);
export default persisted;
