import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCountries = createAsyncThunk("fetchCountries", async () => {
  const response = await fetch("../../data.json");
  return await response.json();
});


const fetchSlice = createSlice({
  name: "fetch",
  initialState: {
    loading: false,
    data: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCountries.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default fetchSlice.reducer;
