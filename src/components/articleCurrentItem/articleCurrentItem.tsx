import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { Button, Popconfirm } from 'antd';
import imgLike from '../articlesItem/imgLike.png';
import imgUnLike from '../articlesItem/img.png';
import clasess from './articleCurrentItem.module.scss';
import format from 'date-fns/format';
import Markdown from 'react-markdown';
import { currentArticleFetch } from '../store/reducers/ActionCreators';
import Loader from '../loader/loader';
import { AritcleSlice } from '../store/reducers/AritcleSlice';
import { deleteArticle } from '../store/reducers/ActionCreators';
import { Link } from 'react-router-dom';
import { LikeCurrentArticle } from '../store/reducers/ActionCreators';
import { UnLikeCurrentArticle } from '../store/reducers/ActionCreators';
import Alert from 'antd/es/alert/Alert';
const ArticleCurrentItem = () => {
  const slug = localStorage.getItem('slug');
  const statusLoad = useAppSelector((state) => state.Aritcles.loading);
  const currentSlug = useAppSelector((state) => state.Aritcles.currentSlug);
  const currentToken = useAppSelector((state) => state.UserSlice.currentUser.token);
  const token = useAppSelector((state) => state.UserSlice.currentUser.token);
  const favorited = useAppSelector((state) => state.Aritcles.currentArticle.favorited);
  const favoritesCount = useAppSelector((state) => state.Aritcles.currentArticle.favoritesCount);
  const dispatch = useAppDispatch();
  const currentArticle = useAppSelector((state) => state.Aritcles.currentArticle);
  const currentUserName = useAppSelector((state) => state.UserSlice.currentUser.username);
  const errorLikeStatus = useAppSelector((state) => state.Aritcles.errorLike);
  useEffect(() => {
    dispatch(currentArticleFetch(slug, token));
    if (currentArticle.author.username === currentUserName) {
      dispatch(AritcleSlice.actions.setOwnerStatus());
    } else dispatch(AritcleSlice.actions.unOwner());
  }, [currentArticle.author.username]);
  const checkStatusOwner = useAppSelector((state) => state.Aritcles.owner);
  return (
    <>
      {statusLoad ? (
        <Loader />
      ) : (
        <>
          <div className={clasess.slugBox}>
            {errorLikeStatus ? (
              <Alert
                className={clasess.alertMessage}
                message="Лайк поста"
                description="Авторизуйтесь, чтобы оставлять лайки."
                type="error"
                showIcon
              />
            ) : null}
            <div className={clasess['slugBox-contanier']}>
              <div className={clasess.slugInfo}>
                <div className={clasess.slugTitle}>
                  <div className={clasess.slugName}> {currentArticle.title} </div>
                  {!favorited ? (
                    <div onClick={() => dispatch(LikeCurrentArticle(currentSlug, token))} className={clasess.slugLikes}>
                      <img src={imgUnLike} className={clasess.imgLikes} />
                      <div className={clasess['slugLikes-count']}>{favoritesCount}</div>
                    </div>
                  ) : (
                    <div
                      onClick={() => dispatch(UnLikeCurrentArticle(currentSlug, token))}
                      className={clasess.slugLikes}
                    >
                      <img src={imgLike} className={clasess.imgLikes} />
                      <div className={clasess['slugLikes-count']}>{favoritesCount}</div>
                    </div>
                  )}
                </div>
                <div className={clasess.slugTags}>
                  <ul className={clasess['slugTags-list']}>
                    {currentArticle.tagList.map((e) => {
                      return (
                        <li key={Math.random()} className={clasess['slugTags-item']}>
                          <div className={clasess['slugTags-text']}>{e}</div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className={clasess['slugItem-text']}>{currentArticle.description}</div>
              </div>
              <div className={clasess.slugUser}>
                <div className={clasess.userName}>
                  {currentArticle.author.username.length > 8
                    ? currentArticle.author.username.slice(0, 8)
                    : currentArticle.author.username}
                </div>
                <div className={clasess.slugDate}>
                  {format(
                    new Date(currentArticle.createdAt.length === 0 ? 2024 : currentArticle.createdAt),
                    `MMMM d,yyyy`
                  )}
                </div>
                <img src={currentArticle.author.image} className={clasess.userIMG} alt="" />
                {checkStatusOwner ? (
                  <div className={clasess.buttonsEdit}>
                    <Popconfirm
                      title="Delete the article"
                      description="Are you sure to delete this article?"
                      okText="Yes"
                      cancelText="No"
                      onConfirm={() => dispatch(deleteArticle(currentSlug, currentToken))}
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                    <Link className={clasess.buttonEdit} to={`/article/${currentSlug}/edit`}>
                      Edit
                    </Link>
                  </div>
                ) : null}
              </div>
              <Markdown className={clasess.mainText}>{currentArticle.body}</Markdown>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ArticleCurrentItem;
