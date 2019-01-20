export interface UserState {
  isLoading: boolean;
  error: any;
  users: [];
  totalItems: number;
  lastVisible: firebase.firestore.QueryDocumentSnapshot | null;
  firstVisible: firebase.firestore.QueryDocumentSnapshot[];
};