export interface User {
  user: IUser;
}
export interface IUser {
  username: string;
  email: string;
  password: string;
}

export interface CurrentUser {
  user: ICurrentUser;
}
export interface ICurrentUser {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}
export interface Errors {
  errors: IErrors;
}
export interface IErrors {
  username: string;
  email: string;
}
