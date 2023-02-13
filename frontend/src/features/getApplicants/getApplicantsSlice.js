import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getApplicantsService from "./getApplicantsService";

// const items = JSON.parse(localStorage.getItem("items"));
const initialState = {
  applicants: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get Applicants Info
export const getInfo = createAsyncThunk(
  "item/getInfo",
  async (itemInfo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await getApplicantsService.getInfo(token);
    } catch (error) {
      console.log("I got here instead");

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getApplicantsSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("action.payload", action.payload);
        state.applicants = action.payload;
      })
      .addCase(getInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = getApplicantsSlice.actions;
export default getApplicantsSlice.reducer;
