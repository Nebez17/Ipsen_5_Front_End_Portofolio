import {User} from "./user";
import {Rubric} from "./rubric";

export interface Feedback {
  id: string,
  general_text: string,
  user: User,
  rubric: Rubric
}
