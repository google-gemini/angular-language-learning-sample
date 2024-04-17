import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { LangSelectComponent } from './lang-select/lang-select.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, QuizComponent, LangSelectComponent],
  host: { ngSkipHydration: 'true' },
  template: `
    <article class="card">
      <router-outlet />
    </article>
  `,
  styleUrl: './app.component.css',
})
export class AppComponent {}
