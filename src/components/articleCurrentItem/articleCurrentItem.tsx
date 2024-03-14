import { useEffect} from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux"

import img from './img.png'
import clasess from './articleCurrentItem.module.scss'
import format from "date-fns/format";
import Markdown from "react-markdown";
import { currentArticleFetch } from "../store/reducers/ActionCreators";
import Loader from "../loader/loader";
const ArticleCurrentItem = () => {
    const slug = localStorage.getItem('slug')
    const statusLoad = useAppSelector(state => state.Aritcles.loading)
    const dispatch = useAppDispatch();
    useEffect(() => {
       dispatch(currentArticleFetch(slug))
    },[])
    const currentArticle = useAppSelector(state => state.Aritcles.currentArticle);
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