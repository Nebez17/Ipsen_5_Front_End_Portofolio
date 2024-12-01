import {User} from "./user";

export interface UserNotification{
  id: number,
  message: string,
  timestamp: Date,
  read: boolean,
  user: User,
}
