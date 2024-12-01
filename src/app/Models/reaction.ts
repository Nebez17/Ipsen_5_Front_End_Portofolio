import {User} from "./user";
import {Post} from "./post";

export interface Reaction{
  id: string,
  text: string,
  user_id: User,
  postId: Post
}

