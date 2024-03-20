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
  currentArticle: ISlug,
  createFinal : boolean,
  owner : boolean
  statusDelete: boolean
  articleEditStatus: boolean

}

const initialState: IinitialState = {
  articles: [],
  articleEditStatus: false,
  statusDelete: false,
  loading:true,
  owner: false,
  createFinal: false,
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
    articleSetCurrentTagsList(state,action: PayloadAction<string[]>){
      state.currentArticle.tagList = action.payload
    },
    currentArticleFetch(state, action: PayloadAction<ISlug>){
      state.currentArticle = action.payload
      state.loading = false
    },
    createAritcleSucsess(state) {
     state.createFinal = true
    },
    createAritcleClose(state) {
      state.createFinal = false
    },
    setOwnerStatus(state) {
      state.owner = true
    },
    unOwner(state) {
      state.owner = false
    },
    setDeleteStatus (state) {
      state.statusDelete = true
    },
    unDeleteStatus(state) {
      state.statusDelete = false
    },
    setEditStatus(state) {
      state.articleEditStatus = true
    },
    unEditStatus(state) {
      state.articleEditStatus = false
    }

  },
});

export default AritcleSlice.reducer;
