import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSliceState, SortPropertyEnum, SortTypes } from "./types";

const initialState: FilterSliceState = {
  searchValue: "",
  categoryName: "Все",
  sortType: {
    name: "популярности ᐁ",
    sortProperty: SortPropertyEnum.TITLE_ASC,
  },
  currentPage: 1,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setCategoryName(state, action: PayloadAction<string>) {
      state.categoryName = action.payload;
    },

    setSortType(state, action: PayloadAction<SortTypes>) {
      state.sortType = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.sortType = action.payload.sortType;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryName = String(action.payload.categoryName);
    },
  },
});

export const { setCategoryName, setSortType, setSearchValue, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
