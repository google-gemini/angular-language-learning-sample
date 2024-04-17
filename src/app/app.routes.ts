import { Routes } from '@angular/router';
import { LangSelectComponent } from './lang-select/lang-select.component';
import { QuizComponent } from './quiz/quiz.component';

export const routes: Routes = [
  {
    path: '',
    component: LangSelectComponent,
  },
  {
    path: 'quiz/:language',
    component: QuizComponent,
  },
];
