import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly storageKey = 'anand-portfolio-theme';
  readonly isDarkMode = signal(false);

  constructor() {
    const savedTheme = this.document.defaultView?.localStorage.getItem(this.storageKey);
    this.setTheme(savedTheme === 'dark');
  }

  toggle(): void {
    this.setTheme(!this.isDarkMode());
  }

  private setTheme(isDarkMode: boolean): void {
    this.isDarkMode.set(isDarkMode);
    this.document.documentElement.classList.toggle('dark-mode', isDarkMode);
    this.document.defaultView?.localStorage.setItem(this.storageKey, isDarkMode ? 'dark' : 'light');
  }
}
