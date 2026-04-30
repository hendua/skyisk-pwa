import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, MatButtonModule],
  template: `
    <section class="pageShell">
      <div class="heroCard">
        <div class="heroHeader">
          <span class="eyebrow">Skyisk</span>
          <h1>Test your aviation readiness</h1>
        </div>

        <p class="heroCopy">
          Build confidence for interviews, safety checks and guest service with a clean mobile-first quiz flow.
        </p>

        <a routerLink="/topics" class="actionButton mat-raised-button">Start Practice</a>
      </div>
    </section>
  `,
  styles: [
    `
      .pageShell {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .heroCard {
        width: min(100%, 430px);
        background: #f8fafc;
        border-radius: 26px;
        padding: 2.25rem 1.5rem;
        box-shadow: 0 24px 60px rgba(0, 0, 0, 0.08);
        display: flex;
        flex-direction: column;
        gap: 1.75rem;
      }

      .heroHeader {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .eyebrow {
        color: #005b92;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.24em;
        font-size: 0.75rem;
      }

      h1 {
        font-size: clamp(2.25rem, 5vw, 3rem);
        margin: 0;
        line-height: 1.02;
        color: #0f172a;
      }

      .heroCopy {
        margin: 0;
        color: #334155;
        line-height: 1.75;
      }

      .actionButton {
        display: inline-flex;
        justify-content: center;
        width: 100%;
        padding: 1rem 1.25rem;
        border-radius: 16px;
        text-decoration: none;
        color: #ffffff;
        background: #005b92;
        font-weight: 600;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }

      .actionButton:hover {
        transform: translateY(-1px);
        box-shadow: 0 14px 30px rgba(0, 91, 146, 0.18);
      }
    `
  ]
})
export class LandingComponent {}
