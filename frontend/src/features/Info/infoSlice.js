import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import infoService from "./infoService";

const info = JSON.parse(localStorage.getItem("info"));
const initialState = {
  info: info ? info : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new applicant
export const createInfo = createAsyncThunk(
  "info/createInfo",
  async (user, thunkAPI) => {
    try {
      console.log("started here");
      // const token = thunkAPI.getState().auth.user.token;
      return await infoService.createInfo(user);
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

export const infoSlice = createSlice({
  name: "info",
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
      .addCase(createInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("action.payload", action.payload);
        state.info = action.payload;
      })
      .addCase(createInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = infoSlice.actions;
export default infoSlice.reducer;
