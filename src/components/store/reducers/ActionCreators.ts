import axios from 'axios';
import { AppDispatch } from '../store';
import { ISlugs, ICurrentSlug } from '../../models/Slug';
import {AritcleSlice} from './AritcleSlice';
export const fetchArticles= () => async (dispatch: AppDispatch) => {
  try {
    dispatch(AritcleSlice.actions.articleStartFetch())
    const response = await axios.get<ISlugs>(`https://blog.kata.academy/api/articles?limit=5?page=1`);
    dispatch(AritcleSlice.actions.articleSetTotalPages(response.data.articlesCount))
    dispatch(AritcleSlice.actions.articleFetchSuccess(response.data.articles))
  } catch (e: any) {
    dispatch(AritcleSlice.actions.articleFetchError(e.message))
  }
};

export const currentArticleFetch = (slug) => async(dispatch : AppDispatch) => {
  try{
    dispatch(AritcleSlice.actions.articleStartFetch())
   const response = await axios.get<ICurrentSlug>(`https://blog.kata.academy/api/articles/${slug}`);
   dispatch(AritcleSlice.actions.currentArticleFetch(response.data.article))
  }
  catch(e: any){
    dispatch(AritcleSlice.actions.articleFetchError(e.message))
  }
}
