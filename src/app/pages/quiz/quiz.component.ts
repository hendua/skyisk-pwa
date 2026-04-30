import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { QuizService, QuizQuestion } from '../../quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatProgressBarModule],
  template: `
    <section class="pageShell" *ngIf="topicId && currentQuestion">
      <div class="quizHeader">
        <a class="backLink" routerLink="/topics">Change Topic</a>
        <div>
          <p class="progressLabel">{{ currentIndex + 1 }} / {{ questions.length }}</p>
          <h2>{{ topicTitle }}</h2>
        </div>
      </div>

      <mat-progress-bar
        class="progressBar"
        mode="determinate"
        [value]="progressValue"
      ></mat-progress-bar>

      <div class="questionBlock">
        <p class="questionText">{{ currentQuestion.text }}</p>
      </div>

      <div class="options">
        <button
          mat-stroked-button
          class="optionButton"
          *ngFor="let option of currentQuestion.options; let idx = index"
          [class.selected]="selectedOption === idx"
          (click)="selectOption(idx)"
        >
          {{ option }}
        </button>
      </div>

      <button
        mat-raised-button
        class="nextButton"
        [disabled]="selectedOption === null"
        (click)="goNext()"
      >
        {{ isLastQuestion ? 'See Results' : 'Next Question' }}
      </button>
    </section>
  `,
  styles: [
    `
      .pageShell {
        min-height: 100vh;
        padding: 1.5rem 1rem 2rem;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
      }

      .quizHeader {
        width: min(100%, 430px);
        display: flex;
        flex-direction: column;
        gap: 1rem;
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

      h2 {
        margin: 0;
        color: #0f172a;
        font-size: 1.9rem;
      }

      .progressBar {
        width: min(100%, 430px);
        height: 0.75rem;
        border-radius: 8px;
        overflow: hidden;
        background: #dbeafe;
      }

      .questionBlock {
        width: min(100%, 430px);
        background: #f8fafc;
        border-radius: 24px;
        padding: 1.5rem;
        box-shadow: 0 18px 34px rgba(0, 0, 0, 0.06);
      }

      .questionText {
        margin: 0;
        font-size: 1.15rem;
        color: #0f172a;
        line-height: 1.6;
      }

      .options {
        width: min(100%, 430px);
        display: grid;
        gap: 0.9rem;
      }

      .optionButton {
        width: 100%;
        text-align: left;
        padding: 1.15rem 1rem;
        border-radius: 18px;
        font-size: 0.98rem;
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
        padding: 1rem;
        border-radius: 18px;
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
  topicId = '';
  topicTitle = '';
  questions: QuizQuestion[] = [];
  currentIndex = 0;
  selectedOption: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('topicId');
    if (!topicId) {
      this.router.navigate(['/topics']);
      return;
    }

    this.topicId = topicId;
    this.questions = this.quizService.getQuestions(topicId);

    if (this.questions.length === 0) {
      this.router.navigate(['/topics']);
      return;
    }

    const topic = this.quizService.topics.find((item) => item.id === topicId);
    this.topicTitle = topic?.title ?? 'Quiz';
    this.selectedOption = this.quizService.getAnswer(topicId, this.currentIndex) ?? null;
  }

  get currentQuestion(): QuizQuestion {
    return this.questions[this.currentIndex];
  }

  get progressValue(): number {
    return ((this.currentIndex + 1) / this.questions.length) * 100;
  }

  get isLastQuestion(): boolean {
    return this.currentIndex === this.questions.length - 1;
  }

  selectOption(index: number): void {
    this.selectedOption = index;
    this.quizService.setAnswer(this.topicId, this.currentIndex, index);
  }

  goNext(): void {
    if (this.selectedOption === null) {
      return;
    }

    if (this.isLastQuestion) {
      this.quizService.storeResult(this.topicId);
      this.router.navigate(['/result']);
      return;
    }

    this.currentIndex += 1;
    this.selectedOption = this.quizService.getAnswer(this.topicId, this.currentIndex) ?? null;
  }
}
