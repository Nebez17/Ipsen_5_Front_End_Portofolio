import {User} from "./user";
import {Post} from "./post";

export interface Rating{
  grade: number,
  user_id: User,
  postId: Post
}

