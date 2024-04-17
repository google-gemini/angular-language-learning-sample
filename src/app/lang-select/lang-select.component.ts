import { Component, inject } from '@angular/core';
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
  `,
  standalone: true,
})
export class LangSelectComponent {
  private readonly router = inject(Router);
  protected readonly languageList = [
    { name: 'Spanish' },
    { name: 'Japanese' },
    { name: 'Korean' },
    { name: 'Hindi' },
  ];

  protected startQuiz(lang: string) {
    this.router.navigate(['quiz', lang]);
  }
}
