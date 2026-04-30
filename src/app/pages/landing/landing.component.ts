import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="pageShell">
      <mat-card class="heroCard">
        <div class="heroHeader">
          <span class="eyebrow">Skyisk</span>
          <h1>Test your aviation readiness</h1>
        </div>

        <p class="heroCopy">
          Build confidence for interviews, safety checks and guest service with a clean mobile-first quiz flow.
        </p>

        <a mat-raised-button routerLink="/topics" class="actionButton">Start Practice</a>
      </mat-card>
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

      .heroCard {
        width: min(100%, 430px);
        background: #ffffff;
        border-radius: 12px;
        padding: 2.25rem 1.5rem;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
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
        line-height: 1.05;
        color: #0f172a;
      }

      .heroCopy {
        margin: 0;
        color: #334155;
        line-height: 1.75;
      }

      .actionButton {
        width: 100%;
        min-height: 52px;
        border-radius: 12px;
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
