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

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lang-select',
  template: `
    <p>Select a language to practice</p>
    @for (lang of languageList; track lang) {
    <button (click)="startQuiz(lang.name)">
      {{ lang.name }}
    </button>
    }
    <hr />
    <section class="custom-language">
      <label>
        <p>Enter a language</p>
        <input [(ngModel)]="customLanguage" />
      </label>
      <button (click)="startQuiz(customLanguage())">Start</button>
    </section>
  `,
  styles: `
    .custom-language input {
      padding: 10px;
    }
    .custom-language button {
      display: inline;
      width: initial;
    }
    hr {
      margin-top: 20px;
      margin-bottom: 10px;
    }
  `,
  standalone: true,
  imports: [FormsModule],
})
export class LangSelectComponent {
  private readonly router = inject(Router);
  protected readonly languageList = [
    { name: 'Spanish' },
    { name: 'Japanese' },
    { name: 'Korean' },
    { name: 'Hindi' },
  ];
  protected readonly customLanguage = signal('');

  protected startQuiz(lang: string) {
    this.router.navigate(['quiz', lang]);
  }
}
