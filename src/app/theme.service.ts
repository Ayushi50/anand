import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly storageKey = 'anand-portfolio-theme';
  readonly isDarkMode = signal(false);

  constructor() {
    const savedTheme = this.isBrowser
      ? this.document.defaultView?.localStorage.getItem(this.storageKey)
      : null;
    this.setTheme(savedTheme === 'dark');
  }

  toggle(): void {
    this.setTheme(!this.isDarkMode());
  }

  private setTheme(isDarkMode: boolean): void {
    this.isDarkMode.set(isDarkMode);
    this.document.documentElement.classList.toggle('dark-mode', isDarkMode);
    if (this.isBrowser) {
      this.document.defaultView?.localStorage.setItem(this.storageKey, isDarkMode ? 'dark' : 'light');
    }
  }
}
