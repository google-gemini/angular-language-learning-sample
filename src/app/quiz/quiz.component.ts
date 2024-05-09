/*
 Copyright 2024 Google LLC

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

import {
  Component,
  OnInit,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { LanguageQuizQuestion } from '../language-quiz-question';
import { DataService } from '../data.service';
import confetti from 'canvas-confetti';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  host: { ngSkipHydration: 'true' },
  template: `
    <section>
      @if (isLoading()) {
        <p>Get ready to practice...</p>
      } @else {
        <header>
          <div>
            <label for="progress">
              Progress {{ score() }}/{{ languageQuizQuestionList().length }}
            </label>
            <progress
              id="progress"
              [value]="score()"
              [max]="languageQuizQuestionList().length"
            >
              {{ score() / languageQuizQuestionList().length }}
            </progress>
          </div>
          <div>
            <button class="close" (click)="quit()">ⓧ</button>
          </div>
        </header>
        <p class="message">{{ message() }}&nbsp;</p>
        <section>
          @if (languageQuizQuestionList()[currentTranslationIndex()]) {
            <p class="phrase">
              {{ languageQuizQuestionList()[currentTranslationIndex()].phrase }}
            </p>
            <ul class="options">
              @if (currentQuestion()) {
                @for (option of currentQuestion().options; track option) {
                  <li>
                    <button class="answer" (click)="checkAnswer(option)">
                      {{ option }}
                    </button>
                  </li>
                }
              }
            </ul>
          }
          @if (isGameOver()) {
            <section>
              <p>Hooray! Well, done!</p>
              <button (click)="reset()">Try Again?</button>
            </section>
          }
        </section>
      }
    </section>
  `,
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly dataService = inject(DataService);
  
  protected readonly language = input.required<string>();
  protected readonly score = signal(0);
  protected readonly isLoading = signal(true);
  protected readonly message = signal('');
  protected readonly currentTranslationIndex = signal(0);
  protected readonly languageQuizQuestionList = signal<LanguageQuizQuestion[]>(
    [],
  );
  protected readonly isGameOver = computed(() => {
    return (
      this.score() === this.languageQuizQuestionList().length &&
      this.score() > 0
    );
  });

  protected readonly currentQuestion = computed(
    () => this.languageQuizQuestionList()[this.currentTranslationIndex()],
  );

  constructor() {
    effect(() => {
      if (this.isGameOver()) confetti();
    });
  }

  ngOnInit(): void {
    const language = this.language() || 'spanish';
    this.dataService.getQuestions(language).then((questions) => {
      this.languageQuizQuestionList.set(questions);
      this.isLoading.set(false);
    });
  }

  protected nextQuestion() {
    this.message.set('');
    this.currentTranslationIndex.update((idx) => {
      return idx + 1;
    });
  }

  protected checkAnswer(answer: string) {
    if (this.currentQuestion().answer === answer) {
      this.score.update((score) => score + 1);
      this.nextQuestion();
    } else {
      this.message.set('Oops, try again!');
    }
  }

  protected reset() {
    this.score.set(0);
    this.currentTranslationIndex.set(0);
  }

  protected quit() {
    this.router.navigateByUrl('');
  }
}
