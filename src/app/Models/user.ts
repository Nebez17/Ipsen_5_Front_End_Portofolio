import {Role} from "./role";

export interface User{
  id: string,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  donation_link: string,
  imageUrl: string,
  role: Role
}
