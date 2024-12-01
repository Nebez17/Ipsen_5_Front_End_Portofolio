import {Submission} from "./submission";
import {Criteria} from "./criteria";

export interface FeedbackPerElement {
  grade: number,
  feedback: string,
  id: {
    submissionId: Submission,
    criteriaId: Criteria
  }
}
