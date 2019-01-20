import { connect } from 'react-redux';
import { StoreState } from 'src/states';
import UserListContainer from './UserList';
import { fetchUserList } from 'src/actions/UserListActions';
import { SortingOptions, SearchOptions } from 'src/types';

const mapStateToProps = (state: StoreState) => ({
  loading: state.userReducer.isLoading,
  error: state.userReducer.error,
  userList: state.userReducer.users,
  totalItems: state.userReducer.totalItems,
  lastVisible: state.userReducer.lastVisible,
  firstVisible: state.userReducer.firstVisible
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserList: (
    sorting: SortingOptions[], 
    key: firebase.firestore.QueryDocumentSnapshot | null, 
    limit: number,
    searching: SearchOptions[],
    isPrevPage?: boolean
  ) => (
    dispatch(fetchUserList(sorting, key, limit, searching, isPrevPage))
  )
});  

export default connect(mapStateToProps, mapDispatchToProps)(UserListContainer)