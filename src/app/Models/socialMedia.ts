import {User} from "./user";

export interface SocialMedia{
  id: string,
  socialMediaCategory: string,
  socialMediaLink: string,
  user: User
}

