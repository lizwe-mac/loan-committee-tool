import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import itemService from "./itemService";

const items = JSON.parse(localStorage.getItem("items"));
const initialState = {
  items: items ? items : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createInfo = createAsyncThunk(
  "item/createInfo",
  async (itemInfo, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await itemService.createInfo(itemInfo, token);
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

export const itemSlice = createSlice({
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
      .addCase(createInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log("action.payload", action.payload);
        state.items = action.payload;
      })
      .addCase(createInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = itemSlice.actions;
export default itemSlice.reducer;
