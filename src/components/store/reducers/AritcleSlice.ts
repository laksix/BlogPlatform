import { createSlice } from '@reduxjs/toolkit';
import { ISlug, LikeSlug } from '../../models/Slug';
import { PayloadAction } from '@reduxjs/toolkit';

export interface IinitialState {
  articles: ISlug[];
  loading: boolean;
  error: string;
  totalPages: number;
  currentPage: number;
  currentSlug: string;
  currentArticle: ISlug;
  createFinal: boolean;
  owner: boolean;
  statusDelete: boolean;
  articleEditStatus: boolean;
  errorLike: boolean;
}

const initialState: IinitialState = {
  articles: [],
  errorLike: false,
  articleEditStatus: false,
  statusDelete: false,
  loading: true,
  owner: false,
  createFinal: false,
  error: '',
  totalPages: 0,
  currentPage: 1,
  currentSlug: '',
  currentArticle: {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [''],
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  },
};

export const AritcleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    articleStartFetch(state) {
      state.loading = true;
    },
    articleSetTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    articleFetchSuccess(state, action: PayloadAction<ISlug[]>) {
      state.articles = action.payload;
      state.loading = false;
    },
    articleFetchError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    articleSetCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    articleSetCurrentSlug(state, action: PayloadAction<string>) {
      state.currentSlug = action.payload;
    },
    articleSetCurrentTagsList(state, action: PayloadAction<string[]>) {
      state.currentArticle.tagList = action.payload;
    },
    currentArticleFetch(state, action: PayloadAction<ISlug>) {
      state.currentArticle = action.payload;
      state.loading = false;
    },
    createAritcleSucsess(state) {
      state.createFinal = true;
    },
    createAritcleClose(state) {
      state.createFinal = false;
    },
    setOwnerStatus(state) {
      state.owner = true;
    },
    unOwner(state) {
      state.owner = false;
    },
    setDeleteStatus(state) {
      state.statusDelete = true;
    },
    unDeleteStatus(state) {
      state.statusDelete = false;
    },
    setEditStatus(state) {
      state.articleEditStatus = true;
    },
    unEditStatus(state) {
      state.articleEditStatus = false;
    },
    changePost(state, action: PayloadAction<LikeSlug>) {
      state.currentArticle.favorited = true;
      state.articles.map((e) => {
        if (e.slug === action.payload.article.slug) {
          e.favorited = true;
          e.favoritesCount = action.payload.article.favoritesCount;
          state.currentArticle.favoritesCount = action.payload.article.favoritesCount;
        }
      });
    },
    errorLike(state) {
      state.errorLike = true;
    },
    unErrorLike(state) {
      state.errorLike = false;
    },
    changePostUn(state, action: PayloadAction<LikeSlug>) {
      state.currentArticle.favorited = false;
      state.articles.map((e) => {
        if (e.slug === action.payload.article.slug) {
          e.favorited = false;
          e.favoritesCount = action.payload.article.favoritesCount;
          state.currentArticle.favoritesCount = action.payload.article.favoritesCount;
        }
      });
    },
  },
});

export default AritcleSlice.reducer;
