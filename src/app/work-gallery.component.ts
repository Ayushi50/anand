import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ThemeService } from './theme.service';

type WorkType = '2d' | '3d';

interface PortfolioPost {
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
  href: string;
  coverClass?: string;
}

const POSTS: Record<WorkType, PortfolioPost[]> = {
  '2d': [
    {
      title: 'Nepenthe',
      category: 'Brand visual identity · 36 pages',
      image: 'work/nepenthe-brand-identity-cover.png',
      alt: 'Cover of the Nepenthe brand visual identity project',
      description: 'A warm, atmospheric visual identity that pairs tactile materials with a calm candlelit mood.',
      href: 'work/nepenthe-brand-identity.pdf',
      coverClass: 'wide-cover'
    },
    {
      title: 'Brand Guidelines',
      category: 'Identity system · 29 pages',
      image: 'work/brand-guidelines-cover.png',
      alt: 'Cover of the Brand Guidelines project',
      description: 'A typography-led identity guide that sets the visual rules for a cohesive brand.',
      href: 'work/brand-guidelines.pdf'
    },
    {
      title: 'TeeTwi Brand Booklet',
      category: 'Brand identity · 32 pages',
      image: 'work/teetwi-brand-booklet-cover.png',
      alt: 'Cover of the TeeTwi Brand Booklet project',
      description: 'A fashion-forward brand world built around contrast, attitude, and a bold blue signature.',
      href: 'work/teetwi-brand-booklet.pdf'
    }
  ],
  '3d': [
    {
      title: 'Holi — 26k',
      category: 'Event concept · 3D',
      image: 'work/holi-26k.webp',
      alt: 'Holi - 26k 3D event concept',
      description: 'A colourful 3D festival environment designed around a Holi celebration.',
      href: 'https://www.artstation.com/artwork/qJ4BbN?album_id=14392226'
    },
    {
      title: 'Appworld 2026 Concepts',
      category: 'Event concept · 3D',
      image: 'work/appworld-2026.webp',
      alt: 'Appworld 2026 Concepts in 3D',
      description: '3D event concepts developed for a future-facing Appworld experience.',
      href: 'https://www.artstation.com/artwork/Ezr4Y0?album_id=14392226'
    }
  ]
};

@Component({
  selector: 'app-work-gallery',
  imports: [RouterLink],
  template: `
    <main class="gallery-page">
      <nav class="gallery-nav" aria-label="Portfolio navigation">
        <a class="logo" routerLink="/">ANAND NIHAL<span>.</span></a>
        <div class="gallery-actions"><a class="back-link" routerLink="/">← Back to portfolio</a><button class="theme-toggle" type="button" (click)="theme.toggle()" [attr.aria-label]="theme.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"><span aria-hidden="true">{{ theme.isDarkMode() ? '☀' : '☾' }}</span></button></div>
      </nav>

      <header class="gallery-header">
        <p class="kicker">Portfolio archive / {{ workType.toUpperCase() }}</p>
        <h1>{{ workType === '2d' ? '2D stories.' : '3D worlds.' }}</h1>
        <p>{{ workType === '2d' ? 'Identity, design systems, and visual studies in a post-style collection.' : 'Spatial concepts, event worlds, and 3D explorations in a post-style collection.' }}</p>
      </header>

      <section class="post-grid" [attr.aria-label]="workType.toUpperCase() + ' work'">
        @for (post of posts; track post.title) {
          <article class="post-card">
            <img [src]="post.image" [alt]="post.alt" [class.wide-cover]="post.coverClass === 'wide-cover'" />
            <div class="post-content">
              <p class="post-category">{{ post.category }}</p>
              <h2>{{ post.title }}</h2>
              <p>{{ post.description }}</p>
              <a [href]="post.href" target="_blank" rel="noreferrer">Open original work <b>↗</b></a>
            </div>
          </article>
        }
      </section>
    </main>
  `,
  styles: `
    :host{display:block;min-height:100vh;background:var(--cream);color:var(--ink)}
    .gallery-page{max-width:1500px;margin:auto;padding-bottom:88px}.gallery-nav{display:flex;justify-content:space-between;align-items:center;padding:28px 42px;font-size:.8rem;font-weight:800}.logo{font-size:1rem;letter-spacing:-.06em}.logo span{color:var(--red)}.gallery-actions{display:flex;align-items:center;gap:20px}.back-link{text-decoration:underline;text-underline-offset:4px}.back-link:hover{color:var(--red)}.theme-toggle{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--ink);background:transparent;color:var(--ink);padding:0;font:inherit;font-size:1.05rem;font-weight:800;cursor:pointer}.theme-toggle:hover{background:var(--ink);color:var(--cream)}.gallery-header{padding:76px 42px 48px;border-top:1px solid #c7bfb2;border-bottom:1px solid var(--ink)}.kicker,.post-category{margin:0;color:var(--red);font-size:.68rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase}.gallery-header h1{margin:16px 0 22px;font-size:clamp(4rem,9vw,9rem);line-height:.78;letter-spacing:-.1em}.gallery-header>p:last-child{max-width:560px;margin:0;font-size:1.05rem;line-height:1.5}.post-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,360px));justify-content:center;gap:18px;padding:42px}.post-card{display:flex;flex-direction:column;border:1px solid var(--ink);background:var(--surface)}.post-card img{display:block;width:100%;aspect-ratio:1;object-fit:cover;border-bottom:1px solid var(--ink)}.post-card img.wide-cover{object-fit:contain;background:#211b15}.post-content{display:flex;flex:1;flex-direction:column;padding:18px}.post-content h2{margin:13px 0 10px;font-size:clamp(1.8rem,3vw,2.8rem);line-height:.88;letter-spacing:-.08em}.post-content>p:not(.post-category){max-width:460px;margin:0;line-height:1.5}.post-content a{display:inline-flex;margin-top:auto;padding:10px 12px;border:1px solid var(--ink);font-size:.78rem;font-weight:800}.post-content a:hover{background:var(--ink);color:var(--cream)}.post-content b{margin-left:12px;color:var(--red)}@media(max-width:760px){.gallery-nav{padding:22px 20px}.gallery-actions{gap:12px}.gallery-header{padding:55px 20px 35px}.post-grid{grid-template-columns:1fr;padding:20px;gap:14px}.gallery-header h1{font-size:clamp(3.7rem,17vw,6rem)}}
  `
})
export class WorkGalleryComponent {
  private readonly route = inject(ActivatedRoute);
  protected readonly theme = inject(ThemeService);
  protected readonly workType = this.route.snapshot.data['workType'] as WorkType;
  protected readonly posts = POSTS[this.workType];
}
