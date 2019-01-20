import * as React from 'react';
import { PureComponent }  from 'react';
import { TableHeadOptions, SortingOptions, SearchOptions } from 'src/types';
import PaginatedTable from 'src/common/PaginatedTable';
import { FilterType } from 'src/constants';

interface Props {
  userList: any;
  sorting: SortingOptions[];
  rowsPerPage: number;
  page: number;
  totalItems: number;
  searching: SearchOptions[];
  startDate: string | undefined;
  endDate: string | undefined;
  onChangePage: (page: number) => void;
  onChangeSort: (key: string, isRemove?: boolean) => void;
  onSearch: (key: string, text: string) => void;
  onChangeDates?: (key: string, startDate: string, endDate: string) => void;
}

interface State {

}

export const UserTableHeadColumns: TableHeadOptions[] = [
  {
    id: 'firstName',
    title: 'First Name',
    filterType: FilterType.Search_box
  },
  {
    id: 'surname',
    title: 'Last Name',
    filterType: FilterType.Search_box
  },
  {
    id: 'email',
    title: 'Email',
    filterType: FilterType.Search_box
  },
  {
    id: 'phoneNo.',
    title: 'Phone No.',
    filterType: FilterType.Search_box
  },
  {
    id: 'account.residenceCountry',
    title: 'Residence Country',
    filterType: FilterType.Search_box
  },
  {
    id: 'account.residenceCountry',
    title: 'Residence City',
    filterType: FilterType.Search_box
  },
  {
    id: 'lastActive',
    title: 'Last Active',
    filterType: FilterType.Date_Picker
  }
];

export default class UserList extends PureComponent<Props, State> {
  state: State = {

  };

  onChangePage = (page: number) => {
    this.props.onChangePage(page);
  }

  onChangeSort = (key: string, isRemove: boolean) => {
    this.props.onChangeSort(key, isRemove);
  }

  onSearch = (key: string, value: string) => {
    this.props.onSearch(key, value);
  }

  onChangeDates = (key: string, startDate: string, endDate: string) => {
    this.props.onChangeDates!(key, startDate, endDate);
  }

  render() {
    const { userList, sorting, rowsPerPage, page, totalItems, searching, startDate, endDate } = this.props;
    return (
      <div>
        <PaginatedTable 
          tableHeadOptions={UserTableHeadColumns}
          sorting={sorting}
          items={userList}
          rowsPerPage={rowsPerPage}
          page={page}
          totalItems={totalItems}
          onSearch={this.onSearch}
          searching={searching}
          startDate={startDate}
          endDate={endDate}
          onChangePage={this.onChangePage}
          onChangeSort={this.onChangeSort}
          onChangeDates={this.onChangeDates}
        />
      </div>
    );
  }
}