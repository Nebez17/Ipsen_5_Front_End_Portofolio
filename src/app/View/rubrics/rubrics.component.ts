import { Component, Input, OnInit } from '@angular/core';
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Criteria } from "../../Models/criteria";
import { RubricElementComponent } from "../rubric-element/rubric-element.component";
import {routes} from "../../app.routes";
import {RouterLink} from "@angular/router";
import {Submission} from "../../Models/submission";

@Component({
  selector: 'app-rubrics',
  templateUrl: './rubrics.component.html',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    NgForOf,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    RubricElementComponent,
    RouterLink
  ],
  styleUrls: ['./rubrics.component.scss']
})
export class RubricsComponent implements OnInit {
  @Input() criteria: Criteria[];
  public groupedCriterias: { mainName: string, criterias: Criteria[], averageScore: number }[] = [];
  public categoryVisibility: boolean[] = [];
  @Input() isUserReviewer: boolean;
  @Input() submission: Submission;

  private scoreMap: { [key: string]: number } = {
    "Very bad": 0,
    "Bad": 1,
    "Decent": 2,
    "Really good": 3,
    "Very good": 4,
    "Excellent": 5
  };

  public ngOnInit(): void {
    this.groupCriteriaByMainName();
    this.groupedCriterias.sort((a, b) => a.mainName.localeCompare(b.mainName));
    this.categoryVisibility = this.groupedCriterias.map(() => false);
  }

  public toggleCategoryVisibility(index: number): void {
    this.categoryVisibility[index] = !this.categoryVisibility[index];
  }

  private groupCriteriaByMainName(): void {
    const criteriaMap = new Map<string, { criterias: Criteria[], totalScore: number, count: number }>();

    for (const criteria of this.criteria) {
      const criteriaScore = this.getCriteriaScore(criteria);

      if (criteriaMap.has(criteria.mainName)) {
        const group = criteriaMap.get(criteria.mainName)!;
        group.criterias.push(criteria);
        group.totalScore += criteriaScore;
        group.count += 1;
      } else {
        criteriaMap.set(criteria.mainName, {
          criterias: [criteria],
          totalScore: criteriaScore,
          count: 1
        });
      }
    }

    this.groupedCriterias = Array.from(criteriaMap, ([mainName, { criterias, totalScore, count }]) => ({
      mainName,
      criterias,
      averageScore: totalScore / count
    }));
  }

  private getCriteriaScore(criteria: Criteria): number {
    const scoreProperties = [
      criteria.zeroPoints,
      criteria.onePoints,
      criteria.twoPoints,
      criteria.threePoints,
      criteria.fourPoints,
      criteria.fivePoints
    ];

    for (const score of scoreProperties) {
      if (score === undefined && score === null) {
        continue
      }

      return this.scoreMap[score] || 0;
    }
    return 0;
  }


  protected readonly routes = routes;
}
