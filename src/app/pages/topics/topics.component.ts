import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { QuizService, QuizTopic } from '../../quiz.service';

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  template: `
    <section class="pageShell">
      <div class="pageHeader">
        <div>
          <p class="pageLabel">Choose Topic</p>
          <h2>Pick one area to practice.</h2>
        </div>
      </div>

      <div class="grid">
        <ng-container *ngFor="let topic of topics">
          <a [routerLink]="['/quiz', topic.id]" class="topicCard">
            <div>
              <p class="topicTitle">{{ topic.title }}</p>
              <p class="topicDescription">{{ topic.description }}</p>
            </div>
            <button mat-flat-button color="primary" class="topicAction">Practice</button>
          </a>
        </ng-container>
      </div>
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

      .pageHeader {
        width: min(100%, 430px);
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
      }

      .pageLabel {
        margin: 0 0 0.5rem;
        color: #005b92;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 0.78rem;
      }

      h2 {
        margin: 0;
        color: #0f172a;
        font-size: 1.8rem;
        line-height: 1.1;
      }

      .grid {
        width: min(100%, 430px);
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .topicCard {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        min-height: 170px;
        padding: 1.35rem;
        border-radius: 24px;
        background: #f8fafc;
        color: #0f172a;
        text-decoration: none;
        box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
        transition: transform 0.2s ease;
      }

      .topicCard:hover {
        transform: translateY(-2px);
      }

      .topicTitle {
        margin: 0;
        font-size: 1.05rem;
        font-weight: 700;
      }

      .topicDescription {
        margin: 0;
        color: #475569;
        line-height: 1.5;
        font-size: 0.95rem;
      }

      .topicAction {
        width: fit-content;
        border-radius: 14px;
        background: #005b92;
        color: white;
        box-shadow: 0 10px 24px rgba(0, 91, 146, 0.14);
      }

      @media (max-width: 500px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }
    `
  ]
})
export class TopicsComponent {
  topics: QuizTopic[] = [];

  constructor(private quizService: QuizService) {
    this.topics = this.quizService.topics;
  }
}
