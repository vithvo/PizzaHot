import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: "Все",
  sortType: {
    name: "выберите",
    sortProperty: "rating",
  },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setCategoryName(state, action) {
      state.categoryName = action.payload;
    },
    setSortType(state, action) {
      state.sortType = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
  },
});

export const { setCategoryName, setSortType, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
