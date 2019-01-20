export type OrderByDirection = 'desc' | 'asc';

export type FilterType = 'search' | 'date';

export type DateRangePickerType = 'startDate' | 'endDate' | null;

export type SearchValues = string | number | undefined;

export interface Action {
  type: string;
  payload?: any;
}

export interface TableHeadOptions {
  id: string;
  title: string;
  filterType: FilterType;
}

export interface SearchOptions {
  id: string;
  value: SearchValues;
  condition: firebase.firestore.WhereFilterOp;
  dateType?: DateRangePickerType
}

export interface SortingOptions {
  id: string;
  sortDirection: OrderByDirection;
}