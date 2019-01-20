import * as React from 'react';
import { Component } from 'react';
import UserList from 'src/components/UserList';
import Loader from 'src/common/Loader';
import { SortType } from 'src/constants';
import { OrderByDirection, SortingOptions, SearchOptions } from 'src/types';

interface Props { 
  loading: boolean;
  userList: any;
  error: any;
  totalItems: number;
  lastVisible: firebase.firestore.QueryDocumentSnapshot | null;
  firstVisible: firebase.firestore.QueryDocumentSnapshot[];
  fetchUserList: (
    sorting: SortingOptions[], 
    key: firebase.firestore.QueryDocumentSnapshot | null, 
    limit: number,
    searching: SearchOptions[],
    isPrevPage?: boolean
  ) => void;
}

interface State {
  userList: any;
  rowsPerPage: number;
  page: number;
  sorting: SortingOptions[];
  searching: SearchOptions[];
  startDate: string | undefined;
  endDate: string | undefined;
}

export default class UserListContainer extends Component<Props, State> {
  state: State = {
    userList: [],
    rowsPerPage: 10,
    page: 0,
    sorting: [
      {
        id: 'firstName',
        sortDirection: SortType.ASC
      }
    ],
    searching: [],
    startDate: undefined,
    endDate: undefined
  }

  componentDidMount() {
    const { rowsPerPage, sorting, searching } = this.state;
    this.props.fetchUserList(sorting, null, rowsPerPage, searching);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (JSON.stringify(this.props.userList) !== JSON.stringify(nextProps.userList)) {
      this.setState({ userList: nextProps.userList });
    }
    if (JSON.stringify(this.props.error) !== JSON.stringify(nextProps.error) && nextProps.error) {
      alert('Somethin Went wrong!');
    }
  }

  onChangePage = (newPage: number) => {
    const { rowsPerPage, page, sorting, searching } = this.state;
    const { lastVisible, firstVisible } = this.props;

    if (page < newPage) {
      this.props.fetchUserList(sorting, lastVisible, rowsPerPage, searching);
    } else {
      this.props.fetchUserList(sorting, firstVisible[newPage], rowsPerPage, searching, true);
    }
    this.setState({ page: newPage });
  }

  onChangeSort = (key: string, isRemove?: boolean) => {
    const { rowsPerPage, sorting, searching } = this.state;
    let newObject: SortingOptions[] = [ ...sorting ];
    
    if (isRemove) {
      newObject = newObject.filter(item => item.id !== key);
    } else {
      const index: number = newObject.findIndex((item) => item.id === key)
      if (index === -1) newObject.push({ id: key, sortDirection: SortType.ASC })
      else {
        let orderType: OrderByDirection = SortType.ASC;
        if (newObject[index].sortDirection === SortType.ASC) {
          orderType = SortType.DSC
        }
  
        newObject[index].sortDirection = orderType;
      }
    }

    this.setState({ sorting: newObject });
    this.props.fetchUserList(newObject, null, rowsPerPage, searching);
  }

  onSearch = (key: string, value: string, condition: firebase.firestore.WhereFilterOp = '==') => {
    const { sorting, rowsPerPage, searching } = this.state;
    let newObject: SearchOptions[] = [ ...searching ];
    const index: number = newObject.findIndex((item) => item.id === key);
    if (index === -1) newObject.push({ id: key, value, condition });
    else if (value === '') newObject.splice(index, 1);
    else newObject[index].value = value;

    this.setState({ searching: newObject });
    this.props.fetchUserList(sorting, null, rowsPerPage, newObject);
  }

  onChangeDates = (key: string, startDate: string, endDate: string) => {
    const { searching, sorting, rowsPerPage } = this.state;
    let newObject: SearchOptions[] = [ ...searching ];
    const startDateIndex: number = newObject.findIndex((item) => item.id === key && item.dateType === 'startDate');
    
    if (startDateIndex === -1) {
      newObject.push({ id: key, value: parseInt(startDate, 10), condition: '>=', dateType: 'startDate' });
    } else {
      newObject[startDateIndex].value = parseInt(startDate, 10);
    }

    const endDateIndex: number = newObject.findIndex((item) => item.id === key && item.dateType === 'endDate');
    if (endDateIndex === -1) {
      newObject.push({ id: key, value: parseInt(endDate, 10), condition: '<=', dateType: 'endDate' });
    } else {
      newObject[endDateIndex].value = parseInt(endDate, 10);
    }

    this.setState({ searching: newObject, startDate, endDate });
    this.props.fetchUserList(sorting, null, rowsPerPage, newObject)
  }

  render() {
    const { userList, sorting, rowsPerPage, page, searching, startDate, endDate } = this.state;
    if (this.props.loading) return <Loader />
    if (!userList) return null;
    return (
      <div>
        <UserList
          userList={userList}
          sorting={sorting}
          rowsPerPage={rowsPerPage}
          page={page}
          searching={searching}
          startDate={startDate}
          endDate={endDate}
          totalItems={this.props.totalItems}
          onChangePage={this.onChangePage}
          onChangeSort={this.onChangeSort}
          onSearch={this.onSearch}
          onChangeDates={this.onChangeDates}
        />
      </div>
    );
  }
}