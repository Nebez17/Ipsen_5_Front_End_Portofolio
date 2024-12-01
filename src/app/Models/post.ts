import {User} from "./user";

export interface Post{
  id: string,
  title: string,
  text: string,
  imageUrl: string,
  localDate: string,
  genres: string[],
  averageRating: number,
  user: User
}

