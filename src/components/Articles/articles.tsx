import { useEffect,useState,useMemo} from 'react'
import ArticlesItem from '../articlesItem/articlesItem'
import { useAppDispatch, useAppSelector} from '../hooks/redux'
import clasess from './articles.module.scss'
import {fetchArticles} from '../store/reducers/ActionCreators'
import Pages from '../Pagination/pagination'
import Loader from '../loader/loader'
import { ISlug } from '../models/Slug'

const Articles = () => {
    const statusLoad = useAppSelector(state => state.Aritcles.loading)
    const currentPage = useAppSelector(state=> state.Aritcles.currentPage)
    const allPosts = useAppSelector(state => state.Aritcles.articles)
    const dispatch = useAppDispatch()
    const [currentList,setCurrentList] = useState(0)
    useEffect(() => {
      dispatch(fetchArticles())
      setCurrentList(5)
    },[])
    useEffect(() => {
      setCurrentList(5*currentPage)
    }, [currentPage])
    const finalPosts = useMemo<ISlug[]>(() => {
      return [...allPosts].slice(currentList - 5, currentList)
    },[currentPage,[]]) 
    return (
      <>
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