import {User} from "./user";
import {Status} from "./status";
import {Feedback} from "./feedback";
import {Rubric} from "./rubric";

export interface Submission{
  id: string,
  name: string,
  story_title: string,
  online_profiles: string,
  platform_presence: boolean,
  prefferd_destination: string,
  additional_notes: string,
  email: boolean,
  express_experience: boolean,
  extra_feedback: boolean,
  genre: string,
  type: string,
  feedbackID: Feedback,
  statusID: Status,
  rubric: Rubric,
  user_id: User,
}
