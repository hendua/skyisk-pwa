import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { QuizService, QuizResult } from '../../quiz.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pageShell">
      @if (result(); as result) {
        <mat-card class="resultCard">
          <div class="resultHeader">
            <p class="finalLabel">Result</p>
            <h1>{{ result.score }} / {{ result.total }}</h1>
            <p class="percentage">Readiness {{ result.percentage }}%</p>
          </div>

          <div class="resultBody">
            <p class="weakLabel">Weak area</p>
            <p class="weakText">{{ result.weakArea }}</p>
          </div>

          <div class="buttonGroup">
            <button mat-raised-button class="wideButton primaryButton" (click)="retry()">
              Retry Same Topic
            </button>
            <button mat-stroked-button class="wideButton secondaryButton" routerLink="/topics">
              Change Topic
            </button>
          </div>
        </mat-card>
      }
    </section>
  `,
  styles: [
    `
      .pageShell {
        min-height: 100vh;
        background: #f8fafc;
        padding: 1.5rem 1rem 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .resultCard {
        width: min(100%, 430px);
        padding: 2rem;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
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

      h1 {
        margin: 0;
        font-size: 3rem;
        line-height: 1;
        color: #0f172a;
      }

      .percentage {
        margin: 0;
        color: #475569;
        font-size: 1rem;
      }

      .resultBody {
        padding: 1.5rem;
        border-radius: 12px;
        background: #f8fafc;
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
        min-height: 52px;
        border-radius: 12px;
        font-weight: 700;
      }

      .primaryButton {
        background: #005b92;
        color: #ffffff;
      }

      .secondaryButton {
        border-color: #dbeafe;
        color: #0f172a;
        background: #ffffff;
      }
    `
  ]
})
export class ResultComponent {
  private readonly router = inject(Router);
  private readonly quizService = inject(QuizService);

  readonly result = signal<QuizResult | null>(this.quizService.getResult());

  constructor() {
    if (!this.result()) {
      this.router.navigate(['/topics']);
    }
  }

  retry(): void {
    const result = this.result();

    if (!result) {
      this.router.navigate(['/topics']);
      return;
    }

    this.quizService.startTopic(result.topicId);
    this.router.navigate(['/quiz', result.topicId]);
  }
}
