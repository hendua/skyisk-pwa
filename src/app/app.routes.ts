import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then((m) => m.LandingComponent)
  },
  {
    path: 'topics',
    loadComponent: () => import('./pages/topics/topics.component').then((m) => m.TopicsComponent)
  },
  {
    path: 'quiz/:topicId',
    loadComponent: () => import('./pages/quiz/quiz.component').then((m) => m.QuizComponent)
  },
  {
    path: 'result',
    loadComponent: () => import('./pages/result/result.component').then((m) => m.ResultComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
