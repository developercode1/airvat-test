import { Action } from 'src/types';
import { UserState } from 'src/states/UserState';
import { 
  FETCH_USER_LIST_LOADING, 
  FETCH_USER_LIST_SUCCESS, 
  FETCH_USER_LIST_ERROR, 
  TOTAL_USER_COUNT 
} from 'src/actions/UserListActions';

const intitialState: UserState = {
  isLoading: false,
  error: null,
  users: [],
  totalItems: 0,
  lastVisible: null,
  firstVisible: [],
}

const reducer = (state: UserState = intitialState, action: Action) => {
  if (action.type === FETCH_USER_LIST_LOADING) {
    return {
      ...state,
      isLoading: action.payload.isLoading
    }
  };

  if (action.type === FETCH_USER_LIST_SUCCESS) {
    const { lastVisible, userList, firstVisible, isPrevPage } = action.payload;
    let newFirstVisibleKeys: firebase.firestore.QueryDocumentSnapshot[] = [ ...state.firstVisible];
    if (isPrevPage) newFirstVisibleKeys.pop();
    else newFirstVisibleKeys.push(firstVisible);

    return {
      ...state,
      users: [ ...userList ],
      lastVisible,
      firstVisible: newFirstVisibleKeys,
      isLoading: false,
      error: null
    }
  }

  if (action.type === FETCH_USER_LIST_ERROR) {
    return {
      ...state,
      error: action.payload.error,
      isLoading: false
    }
  }

  if (action.type === TOTAL_USER_COUNT) {
    return {
      ...state,
      totalItems: action.payload.numberOfUsers
    }
  }
  return state;
}

export default reducer;