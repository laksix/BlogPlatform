import {  useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { Button, Popconfirm } from 'antd';
import img from './img.png'
import clasess from './articleCurrentItem.module.scss'
import format from "date-fns/format";
import Markdown from "react-markdown";
import { currentArticleFetch } from "../store/reducers/ActionCreators";
import Loader from "../loader/loader";
import {AritcleSlice}from "../store/reducers/AritcleSlice";
import { deleteArticle } from "../store/reducers/ActionCreators";
import { Link } from "react-router-dom";
const ArticleCurrentItem = () => {
    const slug = localStorage.getItem('slug')
    const statusLoad = useAppSelector(state => state.Aritcles.loading)
    const currentSlug = useAppSelector(state => state.Aritcles.currentSlug);
    const currentToken = useAppSelector(state => state.UserSlice.currentUser.token)
    const dispatch = useAppDispatch();
    const currentArticle = useAppSelector(state => state.Aritcles.currentArticle);
    const currentUserName = useAppSelector(state => state.UserSlice.currentUser.username)
    useEffect(() => {
        dispatch(currentArticleFetch(slug))
        if (currentArticle.author.username === currentUserName){
            dispatch(AritcleSlice.actions.setOwnerStatus())
        } else dispatch(AritcleSlice.actions.unOwner())
     },[currentArticle.author.username])
     const checkStatusOwner = useAppSelector(state => state.Aritcles.owner)
    return (
        <>
        {statusLoad ? <Loader/> : <>
        <div className={clasess.slugBox}>
            <div className={clasess['slugBox-contanier']}>
            <div className={clasess.slugInfo}>
                <div className={clasess.slugTitle}>
                <div className={clasess.slugName}> {currentArticle.title} </div>
                <div className={clasess.slugLikes}><img src={img} className={clasess.imgLikes}/><div className={clasess['slugLikes-count']}>12</div></div>
                </div>
                <div className={clasess.slugTags}>
                    <ul className={clasess['slugTags-list']}>
                    {currentArticle.tagList.map(e => {
                         return <li key={Math.random()} className={clasess['slugTags-item']}><div className={clasess['slugTags-text']}>{e}</div></li>
                    })}
                    </ul>
                </div>
                <div className={clasess['slugItem-text']}>
                {currentArticle.description}
                </div>
            </div>
            <div className={clasess.slugUser}>
                <div className={clasess.userName}>{currentArticle.author.username.length > 8 ? currentArticle.author.username.slice(0,8) : currentArticle.author.username}</div>
                <div className={clasess.slugDate}>{format(new Date(currentArticle.createdAt.length === 0 ? 2024: currentArticle.createdAt),`MMMM d,yyyy`)}</div>
                <img src={currentArticle.author.image} className={clasess.userIMG} alt="" />
                {checkStatusOwner ? 

<div className={clasess.buttonsEdit}>
<Popconfirm
    title="Delete the article"
    description="Are you sure to delete this article?"
    okText="Yes"
    cancelText="No"
    onConfirm={() => dispatch(deleteArticle(currentSlug,currentToken))}
  >
    <Button danger>Delete</Button>
  </Popconfirm>
    <Link className={clasess.buttonEdit} to = {`/article/${currentSlug}/edit`}>Edit</Link>
</div>

: null}
            </div>
            <Markdown className={clasess.mainText}>
            {currentArticle.body}
        </Markdown>
        </div>
        </div>
        </>}
        
        </>
    )
}

export default ArticleCurrentItem