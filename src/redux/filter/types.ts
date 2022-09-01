import { SortItemType } from "../../components";

export enum SortPropertyEnum {
  RATING_ASC = "rating",
  RATING_DESC = "-rating",
  TITLE_ASC = "title",
  TITLE_DESC = "-title",
  PRICE_ASC = "price",
  PRICE_DESC = "-price",
}

export type SortTypes = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryName: string;
  sortType: SortItemType;
  currentPage: number;
}
