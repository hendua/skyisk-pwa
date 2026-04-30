import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuizService, QuizQuestion } from '../../quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule, MatProgressBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pageShell">
      @if (currentQuestion(); as question) {
        <header class="quizHeader">
          <a class="backLink" routerLink="/topics">Change Topic</a>
          <div>
            <p class="progressLabel">{{ currentIndex() + 1 }} / {{ questions().length }}</p>
            <h1>{{ topicTitle() }}</h1>
          </div>
        </header>

        <mat-progress-bar
          class="progressBar"
          mode="determinate"
          [value]="progressValue()"
        ></mat-progress-bar>

        <mat-card class="questionCard">
          <p class="questionText">{{ question.text }}</p>
        </mat-card>

        <div class="optionList">
          @for (option of question.options; track $index; let idx = $index) {
            <button
              mat-stroked-button
              class="optionButton"
              [class.selected]="selectedOption() === idx"
              (click)="selectOption(idx)"
            >
              {{ option }}
            </button>
          }
        </div>

        <button
          mat-raised-button
          class="nextButton"
          [disabled]="selectedOption() === null"
          (click)="goNext()"
        >
          {{ isLastQuestion() ? 'See Results' : 'Next Question' }}
        </button>
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
        gap: 1.25rem;
        align-items: center;
      }

      .quizHeader {
        width: min(100%, 430px);
        display: flex;
        flex-direction: column;
        gap: 0.9rem;
      }

      .backLink {
        color: #005b92;
        font-weight: 600;
        text-decoration: none;
      }

      .progressLabel {
        margin: 0 0 0.25rem;
        color: #475569;
        font-size: 0.95rem;
      }

      h1 {
        margin: 0;
        color: #0f172a;
        font-size: 1.85rem;
        line-height: 1.15;
      }

      .progressBar {
        width: min(100%, 430px);
        height: 0.65rem;
        border-radius: 8px;
        overflow: hidden;
        background: #dbeafe;
      }

      .questionCard {
        width: min(100%, 430px);
        background: #ffffff;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
      }

      .questionText {
        margin: 0;
        font-size: 1.15rem;
        color: #0f172a;
        line-height: 1.6;
      }

      .optionList {
        width: min(100%, 430px);
        display: grid;
        gap: 0.8rem;
      }

      .optionButton {
        width: 100%;
        min-height: 56px;
        justify-content: flex-start;
        text-align: left;
        padding: 0.9rem 1rem;
        border-radius: 12px;
        font-size: 0.98rem;
        line-height: 1.4;
        color: #0f172a;
        border-color: rgba(0, 91, 146, 0.2);
        background: white;
        transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
      }

      .optionButton.selected {
        background: #e0f2ff;
        border-color: #005b92;
        box-shadow: 0 12px 28px rgba(0, 91, 146, 0.12);
      }

      .optionButton:hover {
        transform: translateY(-1px);
      }

      .nextButton {
        width: min(100%, 430px);
        min-height: 52px;
        border-radius: 12px;
        background: #005b92;
        color: white;
        font-weight: 700;
      }

      .nextButton:disabled {
        opacity: 0.55;
        cursor: default;
      }
    `
  ]
})
export class QuizComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly quizService = inject(QuizService);

  readonly topicId = signal('');
  readonly topicTitle = signal('');
  readonly questions = signal<QuizQuestion[]>([]);
  readonly currentIndex = signal(0);
  readonly selectedOption = signal<number | null>(null);

  readonly currentQuestion = computed(() => this.questions()[this.currentIndex()]);
  readonly progressValue = computed(() => {
    const questions = this.questions();

    if (questions.length === 0) {
      return 0;
    }

    return ((this.currentIndex() + 1) / questions.length) * 100;
  });
  readonly isLastQuestion = computed(() => this.currentIndex() === this.questions().length - 1);

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('topicId');
    if (!topicId) {
      this.router.navigate(['/topics']);
      return;
    }

    this.topicId.set(topicId);
    this.questions.set(this.quizService.getQuestions(topicId));

    if (this.questions().length === 0) {
      this.router.navigate(['/topics']);
      return;
    }

    const topic = this.quizService.topics.find((item) => item.id === topicId);
    this.topicTitle.set(topic?.title ?? 'Quiz');
    this.selectedOption.set(this.quizService.getAnswer(topicId, this.currentIndex()) ?? null);
  }

  selectOption(index: number): void {
    this.selectedOption.set(index);
    this.quizService.setAnswer(this.topicId(), this.currentIndex(), index);
  }

  goNext(): void {
    if (this.selectedOption() === null) {
      return;
    }

    if (this.isLastQuestion()) {
      this.quizService.storeResult(this.topicId());
      this.router.navigate(['/result']);
      return;
    }

    this.currentIndex.update((index) => index + 1);
    this.selectedOption.set(
      this.quizService.getAnswer(this.topicId(), this.currentIndex()) ?? null
    );
  }
}
