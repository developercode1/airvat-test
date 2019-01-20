import { Action, SortingOptions, SearchOptions } from 'src/types';
import { Db } from 'src/firebase-config';
import { Dispatch } from 'redux';

export const FETCH_USER_LIST_LOADING = 'FETCH_USER_LIST_LOADING';
export const FETCH_USER_LIST_SUCCESS = 'FETCH_USER_LIST_SUCCESS';
export const FETCH_USER_LIST_ERROR = 'FETCH_USER_LIST_ERROR';
export const TOTAL_USER_COUNT = 'TOTAL_USER_COUNT';

const fetchUserListLoading = (isLoading: boolean): Action => ({
  type: FETCH_USER_LIST_LOADING,
  payload: { isLoading }
});

export const fetchUserListSuccess = (
    userList: object, 
    lastVisible: firebase.firestore.QueryDocumentSnapshot,
    firstVisible: firebase.firestore.QueryDocumentSnapshot,
    isPrevPage: boolean
  ): Action => ({
  type: FETCH_USER_LIST_SUCCESS,
  payload: { userList, lastVisible, firstVisible, isPrevPage }
});

export const fetchUserListError = (error: object): Action => ({
  type: FETCH_USER_LIST_ERROR,
  payload: { error }
});

export const fetchTotalUserCount = (numberOfUsers: number): Action => ({
  type: TOTAL_USER_COUNT,
  payload: { numberOfUsers }
})

// tslint:disable:max-line-length
export const fetchUserList = (
    sorting: SortingOptions[],
    key: firebase.firestore.QueryDocumentSnapshot | null, 
    limit: number,
    searching: SearchOptions[],
    isPrevPage: boolean = false
  ) => (
  async (dispatch: Dispatch) => {
    dispatch(fetchUserListLoading(true));
    let usersList: any = [];
    let usersRef: firebase.firestore.CollectionReference | firebase.firestore.Query = Db.collection('users');

    if (searching.length > 0) {
      searching.forEach((item) => usersRef = usersRef.where(item.id, item.condition, item.value))
    } else if (sorting.length > 0)  {
      sorting.forEach((item) => usersRef = usersRef.orderBy(item.id, item.sortDirection))
    }

    // fetch total number of users..
    usersRef.get()
    .then((snapShot) => dispatch(fetchTotalUserCount(snapShot.size)))

    if (key) {
      usersRef = usersRef.startAfter(key)
    };

    if (isPrevPage) {
      usersRef = usersRef.startAt(key);
    }

    // fetch limited number of users..
    usersRef.limit(limit).get()
    .then((snapshot) => {
      snapshot.forEach(doc => { 
        usersList.push(doc.data())
      });
      console.log('USERS_LIST_SUCCESS', usersList);
      const firstVisible: firebase.firestore.QueryDocumentSnapshot = snapshot.docs[0];
      const lastVisible: firebase.firestore.QueryDocumentSnapshot = snapshot.docs[snapshot.docs.length - 1];
      dispatch(fetchUserListSuccess(usersList, lastVisible, firstVisible, isPrevPage));
    })
    .catch((error) => {
      console.log('FETCH_USER_LIST_ERROR', error);
      dispatch(fetchUserListError(error))
    });
  }
)
