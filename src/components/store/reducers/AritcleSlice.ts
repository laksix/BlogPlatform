import { createSlice } from '@reduxjs/toolkit';
import { ISlug } from '../../models/Slug';
import { PayloadAction } from '@reduxjs/toolkit';


export interface IinitialState {
  articles: ISlug[];
  loading: boolean;
  error: string
  totalPages: number
  currentPage: number
  currentSlug : string
  currentArticle: ISlug

}

const initialState: IinitialState = {
  articles: [],
  loading:true,
  error: '',
  totalPages: 0,
  currentPage: 1,
  currentSlug: '',
  currentArticle: {
    slug: '',
    title:'',
    description:'',
    body:'',
    tagList: [''],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false
    }
  }
};

export const AritcleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articleStartFetch (state){
      state.loading = true
    },
    articleSetTotalPages(state, action: PayloadAction<number>){
      state.totalPages = action.payload
    },
    articleFetchSuccess (state, action: PayloadAction<ISlug[]>){
      state.articles = action.payload;
      state.loading = false
    },
    articleFetchError (state, action: PayloadAction<string>){
      state.error = action.payload
    },
    articleSetCurrentPage(state, action: PayloadAction<number>){
      state.currentPage = action.payload
    },
    articleSetCurrentSlug(state,action: PayloadAction<string>){
      state.currentSlug = action.payload
    },
    currentArticleFetch(state, action: PayloadAction<ISlug>){
      state.currentArticle = action.payload
      state.loading = false
    }

  },
});

export default AritcleSlice.reducer;
