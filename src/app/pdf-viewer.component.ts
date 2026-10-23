import { Component, ElementRef, OnDestroy, OnInit, inject, signal, viewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import type { PDFDocumentLoadingTask } from 'pdfjs-dist';
import { ThemeService } from './theme.service';

// Renders PDFs to canvases so the browser's PDF toolbar (download/print) never appears.
@Component({
  selector: 'app-pdf-viewer',
  imports: [RouterLink],
  template: `
    <main class="viewer" (contextmenu)="$event.preventDefault()">
      <nav>
        <a class="logo" routerLink="/">ANAND NIHAL<span>.</span></a>
        <button class="theme-toggle" type="button" (click)="theme.toggle()" aria-label="Toggle theme">◐</button>
      </nav>
      @if (status()) { <p class="status">{{ status() }}</p> }
      <div class="pages" #pages></div>
    </main>
  `,
  styles: `
    :host{display:block;min-height:100vh;background:var(--cream);color:var(--ink)}
    .viewer{max-width:1100px;margin:auto;padding:0 20px 64px;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
    nav{display:flex;justify-content:space-between;align-items:center;padding:28px 0;font-size:.8rem;font-weight:800}
    .logo{font-size:1rem;letter-spacing:-.06em}.logo span{color:var(--red)}
    .theme-toggle{width:34px;height:34px;border:1px solid var(--ink);background:transparent;color:var(--ink);font:inherit;cursor:pointer}
    .status{text-align:center;font-weight:800}
    .pages{display:flex;flex-direction:column;gap:16px}
    :host ::ng-deep canvas{display:block;width:100%;height:auto;border:1px solid var(--ink);background:#fff;pointer-events:none}
    @media print{.viewer{display:none}}
  `
})
export class PdfViewerComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  protected readonly theme = inject(ThemeService);
  private readonly pages = viewChild.required<ElementRef<HTMLDivElement>>('pages');
  protected readonly status = signal('Loading…');
  private task?: PDFDocumentLoadingTask;
  private readonly block = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && ['s', 'p'].includes(e.key.toLowerCase())) e.preventDefault();
  };

  async ngOnInit() {
    document.addEventListener('keydown', this.block);
    const file = this.route.snapshot.paramMap.get('file') ?? '';
    if (!/^[\w-]+$/.test(file)) { this.status.set('Document not found.'); return; }
    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs/pdf.worker.min.mjs', document.baseURI).href;
      this.task = pdfjs.getDocument({ url: new URL(`work/${file}.pdf`, document.baseURI).href });
      const pdf = await this.task.promise;
      const host = this.pages().nativeElement;
      const scale = 1.5;
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        host.appendChild(canvas);
        await page.render({ canvas, viewport }).promise;
        this.status.set('');
      }
    } catch {
      this.status.set('Could not load this document.');
    }
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.block);
    void this.task?.destroy();
  }
}
