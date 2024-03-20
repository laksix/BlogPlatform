import { createSlice } from '@reduxjs/toolkit';
import { LikeSlug, CurrentSlug } from '../../models/Slug';
import { PayloadAction } from '@reduxjs/toolkit';

export interface IinitialState {
  article: CurrentSlug;
}

const initialState: IinitialState = {
  article: {
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

export const LikesArticles = createSlice({
  name: 'likesArticles',
  initialState,
  reducers: {
    LikeCurrentArticle(state, action: PayloadAction<LikeSlug>) {
      state.article = action.payload.article;
    },
    unLikeCurrentArticle(state, action: PayloadAction<LikeSlug>) {
      state.article = action.payload.article;
    },
  },
});

export default LikesArticles.reducer;
