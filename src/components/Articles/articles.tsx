import { useEffect,useState,useMemo} from 'react'
import ArticlesItem from '../articlesItem/articlesItem'
import { useAppDispatch, useAppSelector} from '../hooks/redux'
import clasess from './articles.module.scss'
import {fetchArticles} from '../store/reducers/ActionCreators'
import Pages from '../Pagination/pagination'
import Loader from '../loader/loader'
import { ISlug } from '../models/Slug'
import Alert from 'antd/es/alert/Alert'


const Articles = () => {
    const statusLoad = useAppSelector(state => state.Aritcles.loading)
    const currentPage = useAppSelector(state=> state.Aritcles.currentPage)
    const allPosts = useAppSelector(state => state.Aritcles.articles)
    const token = useAppSelector(state => state.UserSlice.currentUser.token)
    const dispatch = useAppDispatch()
    const [currentList,setCurrentList] = useState(0)
    useEffect(() => {
      dispatch(fetchArticles(token))
      setCurrentList(5)
    },[])
    useEffect(() => {
      setCurrentList(5*currentPage)
    }, [currentPage])
    const finalPosts = useMemo<ISlug[]>(() => {
      return [...allPosts].slice(currentList - 5, currentList)
    },[currentPage,[]]) 
   const statusCreateArticle = useAppSelector(state => state.Aritcles.createFinal)
   const statusDeleteArticle = useAppSelector(state => state.Aritcles.statusDelete)
   const statusEditArticle = useAppSelector(state => state.Aritcles.articleEditStatus)
   const errorLikeStatus = useAppSelector(state => state.Aritcles.errorLike)
    return (
      <>
       <div className={clasess.box}>
          {statusCreateArticle ? <Alert
          className={clasess.alertMessage}
      message="Создание поста"
      description="Пост успешно создан."
      type="success"
      showIcon
    /> : null}
    {statusDeleteArticle  ? <Alert
          className={clasess.alertMessage}
      message="Удаление поста"
      description="Пост успешно удален."
      type="success"
      showIcon
    /> : null}
          {statusEditArticle ? <Alert
          className={clasess.alertMessage}
      message="Редактирование поста"
      description="Пост успешно изменен."
      type="success"
      showIcon
    /> : null}
    {errorLikeStatus ? <Alert
          className={clasess.alertMessage}
      message="Лайк поста"
      description="Авторизуйтесь, чтобы оставлять лайки."
      type="error"
      showIcon
    /> : null}
    </div>
        {statusLoad ? <Loader/> : 
        <ul className={clasess.articles}>
         {finalPosts.map(e => {
           return <ArticlesItem posts = {e} key = {e.slug}/>
         })}
         <Pages/>
        </ul>}
        </>
    )
}
export default Articles