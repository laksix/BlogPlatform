import axios from 'axios';
import { AppDispatch } from '../store';
import { ISlugs, ICurrentSlug} from '../../models/Slug';
import {AritcleSlice} from './AritcleSlice';
import { IFormInput} from '../../createNewUser/createNewUser';
import {CurrentUser} from '../../models/User'
import {UserSlice} from './UserSlice';

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

export const createNewUser = (data: IFormInput) => async (dispatch: AppDispatch) => {
  try{
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: {
        "user": {
            "username": `${data.username}`,
            "email": `${data.email}`,
            "password": `${data.password}`
        }
    },
    };
    const response = await axios.post<CurrentUser>('https://blog.kata.academy/api/users',options)
    dispatch(UserSlice.actions.fetchUserComplete(response.data))
  }
  catch(e: any) {
    dispatch(UserSlice.actions.fetchUserError(e.response.data))
}
}

export const signUser = (data: IFormInput) => async(dispatch:AppDispatch) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: {
        "user": {
            "email": `${data.email.toLowerCase()}`,
            "password": `${data.password}`
        }
    },
    };
    const response = await axios.post<CurrentUser>('https://blog.kata.academy/api/users/login',options.body)
    dispatch(UserSlice.actions.fetchUserComplete(response.data))
  }
  catch(e: any){
   dispatch(UserSlice.actions.fetchLoginError())
  }
}
export const updateUser = (data: IFormInput,currentToken: string) => async(dispatch:AppDispatch) => {
  try {
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${currentToken}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: {
      "user": {
          "username": `${data.username}`,
          "email": `${data.email}`,
          "password": `${data.password}`,
          "image": `${data.url}`
   }
  },
  };
    const response = await axios.put<CurrentUser>('https://blog.kata.academy/api/user',options.body,options)
    dispatch(UserSlice.actions.fetchUserComplete(response.data))
    dispatch(UserSlice.actions.userEditComplete())
    setTimeout(() => {
      dispatch(UserSlice.actions.userEditClose())
    },2000)
  }
  catch(e: any){
    dispatch(UserSlice.actions.fetchUserError(e.response.data))
  }

}



export const createArticle = (data: IFormInput,tags : string[],currentToken: string) => async (dispatch:AppDispatch) => {
  try {
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Token ${currentToken}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: {
        "article": {
            "title": `${data.nameOfArticle}`,
            "description": `${data.decriptionOfAritcle}`,
            "body": `${data.textOfAritcle}`,
            "tagList": tags
     }
    },
  }
  
  await axios.post<ICurrentSlug>(`https://blog.kata.academy/api/articles/`,options.body,options);
  dispatch(AritcleSlice.actions.createAritcleSucsess())
  setTimeout(() => {
    dispatch(AritcleSlice.actions.createAritcleClose())
  },2000)
  }
  catch (e:any) {
   console.log(e)
  }
}
export const deleteArticle = (currentSlug:string,currentToken: string) => async (dispatch:AppDispatch) => {
 try {
  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${currentToken}`,
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
    },
}
  await axios.delete(`https://blog.kata.academy/api/articles/${currentSlug}`,options)
  dispatch(AritcleSlice.actions.setDeleteStatus());
  setTimeout(() => {
    dispatch(AritcleSlice.actions.unDeleteStatus())
  },2000)
 }
 catch(e:any) {
  console.log(e)
 }
}

export const EditCurrentArticle = (data: IFormInput, slug : string,tags : string[],currentToken: string) => async (dispatch:AppDispatch) => {
  try {
    const options = {
      method: 'PUT',
      headers: {
        Authorization: `Token ${currentToken}`,
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: {
        "article": {
            "title": `${data.nameOfArticle}`,
            "description": `${data.decriptionOfAritcle}`,
            "body": `${data.textOfAritcle}`,
            "tagList": tags
     }
    },
  }
  
  await axios.put<ICurrentSlug>(`https://blog.kata.academy/api/articles/${slug}`,options.body,options);
  dispatch(AritcleSlice.actions.setEditStatus())
  setTimeout(() => {
    dispatch(AritcleSlice.actions.unEditStatus())
  },2000)
  }
  catch (e:any) {
   console.log(e)
  }
}