import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryName: "Все",
  sortType: {
    name: "популярности ᐁ",
    sortProperty: "rating",
  },
  searchValue: "",
  currentPage: 1,
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
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
      state.categoryName = action.payload.categoryName;
    },
  },
});

export const { setCategoryName, setSortType, setSearchValue, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
