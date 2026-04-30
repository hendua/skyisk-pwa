import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { QuizService, QuizResult } from '../../quiz.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <section class="pageShell">
      <div class="resultCard" *ngIf="result; else noResult">
        <div class="resultHeader">
          <p class="finalLabel">Result</p>
          <h2>{{ result.score }} / {{ result.total }}</h2>
          <p class="percentage">Readiness {{ result.percentage }}%</p>
        </div>

        <div class="resultBody">
          <p class="weakLabel">Weak area</p>
          <p class="weakText">{{ result.weakArea }}</p>
        </div>

        <div class="buttonGroup">
          <button mat-raised-button color="primary" class="wideButton" (click)="retry()">
            Retry Same Topic
          </button>
          <button mat-stroked-button class="wideButton secondary" routerLink="/topics">
            Change Topic
          </button>
        </div>
      </div>

      <ng-template #noResult>
        <p class="emptyState">No quiz result available yet.</p>
        <a routerLink="/topics" class="actionLink">Choose a topic</a>
      </ng-template>
    </section>
  `,
  styles: [
    `
      .pageShell {
        min-height: 100vh;
        padding: 1.5rem 1rem 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .resultCard {
        width: min(100%, 430px);
        padding: 2rem;
        background: #f8fafc;
        border-radius: 28px;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
      }

      .resultHeader {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .finalLabel {
        margin: 0;
        color: #005b92;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-weight: 700;
        font-size: 0.78rem;
      }

      h2 {
        margin: 0;
        font-size: 3rem;
        color: #0f172a;
      }

      .percentage {
        margin: 0;
        color: #475569;
        font-size: 1rem;
      }

      .resultBody {
        padding: 1.5rem;
        border-radius: 22px;
        background: white;
      }

      .weakLabel {
        margin: 0 0 0.5rem;
        font-weight: 600;
        color: #0f172a;
      }

      .weakText {
        margin: 0;
        color: #334155;
        line-height: 1.7;
      }

      .buttonGroup {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .wideButton {
        width: 100%;
        border-radius: 18px;
        padding: 1rem 1.25rem;
        font-weight: 700;
      }

      .secondary {
        border-color: #dbeafe;
        color: #0f172a;
        background: white;
      }

      .emptyState {
        margin: 0 0 1rem;
        color: #475569;
        text-align: center;
      }

      .actionLink {
        display: inline-flex;
        justify-content: center;
        width: 100%;
        padding: 0.95rem 1.2rem;
        border-radius: 18px;
        background: #005b92;
        color: white;
        text-decoration: none;
        font-weight: 600;
        text-align: center;
      }
    `
  ]
})
export class ResultComponent {
  result: QuizResult | null = null;

  constructor(private router: Router, private quizService: QuizService) {
    this.result = this.quizService.getResult();

    if (!this.result) {
      this.router.navigate(['/topics']);
    }
  }

  retry(): void {
    if (!this.result) {
      this.router.navigate(['/topics']);
      return;
    }

    this.router.navigate(['/quiz', this.result.topicId]);
  }
}
