import {Criteria} from "./criteria";

export interface Rubric{
  id: string,
  title: string,
  criteria: Criteria[]
}
