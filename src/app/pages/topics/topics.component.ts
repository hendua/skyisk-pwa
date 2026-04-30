import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

interface TopicCard {
  id: string;
  title: string;
  icon: string;
}

@Component({
  selector: 'app-topics',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule],
  template: `
    <section class="pageShell">
      <header class="pageHeader">
        <h1>Choose Topic</h1>
      </header>

      <div class="topicGrid">
        <mat-card *ngFor="let topic of topics" class="topicCard">
          <a class="topicLink" [routerLink]="['/quiz', topic.id]">
            <span class="topicIcon" aria-hidden="true">{{ topic.icon }}</span>
            <h2 class="topicTitle">{{ topic.title }}</h2>
          </a>
        </mat-card>
      </div>
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

      .pageHeader {
        width: min(100%, 430px);
      }

      h1 {
        margin: 0;
        color: #0f172a;
        font-size: 2rem;
        line-height: 1.15;
      }

      .topicGrid {
        width: min(100%, 430px);
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .topicCard {
        min-height: 132px;
        padding: 1rem;
        border-radius: 12px;
        border: 0;
        background: #ffffff;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
        overflow: hidden;
        transition: transform 0.18s ease, box-shadow 0.18s ease;
      }

      .topicCard:hover,
      .topicCard:focus-within {
        transform: translateY(-2px);
        box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
      }

      .topicLink {
        min-height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        color: inherit;
        text-decoration: none;
      }

      .topicLink:focus-visible {
        outline: 3px solid rgba(0, 91, 146, 0.28);
        outline-offset: -3px;
      }

      .topicIcon {
        display: block;
        margin-bottom: 0.75rem;
        font-size: 2rem;
        line-height: 1;
      }

      .topicTitle {
        margin: 0;
        color: #0f172a;
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.3;
      }
    `
  ]
})
export class TopicsComponent {
  topics: TopicCard[] = [
    { id: 'cabin', title: 'Cabin Crew Interview', icon: '✈️' },
    { id: 'safety', title: 'Safety Procedures', icon: '🛟' },
    { id: 'customer', title: 'Customer Handling', icon: '🤝' },
    { id: 'grooming', title: 'Grooming & Etiquette', icon: '✨' }
  ];
}
