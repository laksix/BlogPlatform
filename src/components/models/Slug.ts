export interface ISlugs {
  articlesCount: number;
  articles: ISlug[];
}
export interface ICurrentSlug {
  article: ISlug;
}
export interface LikeSlug {
  article: CurrentSlug;
}

export interface CurrentSlug {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}
export interface ISlug {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: IAuthor;
}
export interface IAuthor {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}
