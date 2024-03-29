import { useAppDispatch, useAppSelector } from '../hooks/redux';
import clasess from './navigation.module.scss';
import { Link } from 'react-router-dom';
import { UserSlice } from '../store/reducers/UserSlice';
const Navigation = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.UserSlice.isAuth);
  const nameOfProfile = useAppSelector((state) => state.UserSlice.currentUser.username);
  const imgOfProfile = useAppSelector((state) => state.UserSlice.currentUser.image);
  return (
    <div className={clasess.title}>
      <div className={clasess['title-name']}>
        <Link className={clasess['title-name']} to="/articles">
          Realworld Blog
        </Link>
      </div>
      {isAuth ? (
        <div className={clasess.isAuth}>
          <Link className={clasess.createPost} to="/new-article">
            Create article
          </Link>

          <Link className={clasess.profile} to="/profile">
            <div className={clasess.profileName}>
              {nameOfProfile.length > 10 ? `${nameOfProfile.slice(0, 10)}...` : nameOfProfile}
            </div>
            <img src={imgOfProfile} className={clasess.profileImg} />
          </Link>

          <div onClick={() => dispatch(UserSlice.actions.userLogout())} className={clasess.logout}>
            Log Out
          </div>
        </div>
      ) : (
        <div className={clasess.auth}>
          <div className={clasess.authOff}>
            <Link className={clasess.authIn} to="/sign-in">
              Sign In
            </Link>
          </div>
          <Link to="/sign-up" className={clasess['title-signUp']}>
            {' '}
            <div className={clasess.authOn}>Sign Up </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navigation;
