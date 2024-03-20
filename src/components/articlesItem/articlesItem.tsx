import img from './img.png'
import clasess from './articlesItem.module.scss'
import { ISlug } from '../models/Slug'
import { format } from "date-fns";
import {Link} from 'react-router-dom'
import {AritcleSlice} from '../store/reducers/AritcleSlice';
import { useAppDispatch,} from '../hooks/redux';


interface postsProps {
    posts: ISlug
}
const ArticlesItem = ({posts} : postsProps) => {
    const dispatch = useAppDispatch()
   
    
    return (
        <li className={clasess.articleItem}>
            <div className={clasess.slugInfo}>
                <div className={clasess.slugTitle}>
                <div className={clasess.slugName} onClick={() => {
                    dispatch(AritcleSlice.actions.articleSetCurrentSlug(posts.slug))
                    dispatch(AritcleSlice.actions.articleSetCurrentTagsList(posts.tagList))
                    localStorage.setItem('slug',posts.slug)
                }}><Link className={clasess.slugName}  to ={`/articles/${posts.slug}`} >{posts.title}</Link></div>
                <div className={clasess.slugLikes}><img src={img} className={clasess.imgLikes}/><div className={clasess['slugLikes-count']}>12</div></div>
                </div>
                <div className={clasess.slugTags}>
                    <ul className={clasess['slugTags-list']}>
                    {posts.tagList.map(e => {
                        return <li key={Math.random()} className={clasess['slugTags-item']}><div className={clasess['slugTags-text']}>{e}</div></li>
                    })}
                    </ul>
                </div>
                <div className={clasess['slugItem-text']}>
                {posts.description}
                </div>
            </div>
            <div className={clasess.slugUser}>
                <div className={clasess.userName}>{posts.author.username.length > 8 ? posts.author.username.slice(0,8) : posts.author.username}</div>
                <div className={clasess.slugDate}>{format(new Date(posts.createdAt),`MMMM d,yyyy`)}</div>
                <img src={posts.author.image} className={clasess.userIMG} alt="" />
            </div>
        </li>
    )
}
export default ArticlesItem