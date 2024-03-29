import { createSlice } from '@reduxjs/toolkit';

import { PayloadAction } from '@reduxjs/toolkit';
import { ICurrentUser, CurrentUser, Errors, IErrors } from '../../models/User';

export interface IinitialState {
  currentUser: ICurrentUser;
  errors: IErrors;
  isAuth: boolean;
  errorMessage: string;
  editProfile: boolean;
}

const initialState: IinitialState = {
  editProfile: false,
  currentUser: {
    email: '',
    token: '',
    username: '',
    bio: '',
    image: '',
  },
  isAuth: false,
  errors: {
    username: '',
    email: '',
  },
  errorMessage: '',
};
if (localStorage.getItem('userInfo')) {
  initialState.isAuth = true;
  initialState.currentUser = JSON.parse(localStorage.getItem('userInfo') || `{}`).userInfo;
}

export const UserSlice = createSlice({
  name: 'newUsers',
  initialState,
  reducers: {
    fetchUserComplete(state, action: PayloadAction<CurrentUser>) {
      state.isAuth = true;
      state.errorMessage = '';
      state.errors.username = '';
      state.errors.email = '';
      state.currentUser = { ...action.payload.user };
      if (action.payload.user.image !== undefined) {
        state.currentUser.image = action.payload.user.image;
      } else {
        state.currentUser.image = 'https://static.productionready.io/images/smiley-cyrus.jpg';
      }
      localStorage.setItem(
        'userInfo',
        JSON.stringify({
          userInfo: {
            ...action.payload.user,
            bio: '',
            image: state.currentUser.image,
          },
        })
      );
    },
    fetchUserError(state, action: PayloadAction<Errors>) {
      state.errors.username = action.payload.errors.username;
      state.errors.email = action.payload.errors.email;
    },
    userEditComplete(state) {
      state.editProfile = true;
    },
    userEditClose(state) {
      state.editProfile = false;
    },
    fetchLoginError(state) {
      state.errorMessage = 'Пароль или e-mail неверны';
    },
    userLogout(state) {
      state.currentUser.bio = '';
      state.currentUser.email = '';
      state.currentUser.image = '';
      state.currentUser.token = '';
      state.currentUser.username = '';
      state.isAuth = false;
      localStorage.setItem('userInfo', '');
    },
  },
});

export default UserSlice.reducer;
