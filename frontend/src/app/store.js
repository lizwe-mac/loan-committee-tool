import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import infoSlice from "../features/Info/infoSlice";
import getApplicantsReducer from "../features/getApplicants/getApplicantsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    applicants: getApplicantsReducer,
    info: infoSlice,
  },
});
