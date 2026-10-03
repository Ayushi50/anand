import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from './theme.service';

interface PitchDeck {
  title: string;
  category: string;
  image: string;
  alt: string;
  description: string;
  href: string;
}

const PITCH_DECKS: PitchDeck[] = [
  {
    title: 'Choudhary Spices',
    category: 'Pitch deck · 12 pages',
    image: 'work/choudhary-spices-pitch-deck-cover.png',
    alt: 'Cover of the Choudhary Spices pitch deck',
    description: 'A strategic brand identity direction built around Indian spices, warmth, and a contemporary visual language.',
    href: 'work/choudhary-spices-pitch-deck.pdf'
  },
  {
    title: 'Clockit',
    category: 'Pitch deck · 12 pages',
    image: 'work/clockit-pitch-deck-cover.png',
    alt: 'Cover of the Clockit pitch deck',
    description: 'A warm, food-led brand identity direction for a contemporary dining experience.',
    href: 'work/clockit-pitch-deck.pdf'
  },
  {
    title: 'ORVA',
    category: 'Pitch deck · 12 pages',
    image: 'work/orva-pitch-deck-cover.png',
    alt: 'Cover of the ORVA pitch deck',
    description: 'A refined, nature-led brand identity direction built around deep greens and elevated dining.',
    href: 'work/orva-pitch-deck.pdf'
  },
  {
    title: 'SVASTHAONE',
    category: 'Pitch deck · 17 pages',
    image: 'work/svasthaone-pitch-deck-cover.png',
    alt: 'Cover of the SVASTHAONE pitch deck',
    description: 'A wellness brand strategy presentation spanning nourishing food, skincare, and everyday rituals.',
    href: 'work/svasthaone-pitch-deck.pdf'
  },
  {
    title: 'Tee Twi',
    category: 'Pitch deck · 14 pages',
    image: 'work/tee-twi-pitch-deck-cover.png',
    alt: 'Cover of the Tee Twi pitch deck',
    description: 'A youth-focused fashion identity direction with expressive graphics and a bold streetwear attitude.',
    href: 'work/tee-twi-pitch-deck.pdf'
  }
];

@Component({
  selector: 'app-pitchdeck',
  imports: [RouterLink],
  template: `
    <main class="pitchdeck-page">
      <nav aria-label="Portfolio navigation">
        <a class="logo" routerLink="/" target="_blank" rel="noopener noreferrer">ANAND NIHAL<span>.</span></a>
        <div class="pitch-actions"><a class="back-link" routerLink="/work/2d">← Back to 2D stories</a><button class="theme-toggle" type="button" (click)="theme.toggle()" [attr.aria-label]="theme.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"><span aria-hidden="true">{{ theme.isDarkMode() ? '☀' : '☾' }}</span></button></div>
      </nav>
      <header>
        <p class="kicker">2D stories / Pitch decks</p>
        <h1>PitchDeck<span>.</span></h1>
      </header>
      <section class="pitch-grid" aria-label="Pitch deck projects">
        @for (deck of decks; track deck.title) {
          <article class="pitch-card">
            <img [src]="deck.image" [alt]="deck.alt" />
            <div class="pitch-content">
              <p class="category">{{ deck.category }}</p>
              <h2>{{ deck.title }}</h2>
              <p>{{ deck.description }}</p>
              <a [href]="deck.href" target="_blank" rel="noreferrer">Open <b>↗</b></a>
            </div>
          </article>
        }
      </section>
    </main>
  `,
  styles: `
    :host{display:block;min-height:100vh;background:var(--cream);color:var(--ink)}
    .pitchdeck-page{max-width:1500px;margin:auto;padding-bottom:88px}
    nav{display:flex;justify-content:space-between;align-items:center;padding:28px 42px;font-size:.8rem;font-weight:800}
    .logo{font-size:1rem;letter-spacing:-.06em}.logo span,h1 span{color:var(--red)}
    .pitch-actions{display:flex;align-items:center;gap:20px}.back-link{text-decoration:underline;text-underline-offset:4px}.back-link:hover{color:var(--red)}.theme-toggle{width:34px;height:34px;display:grid;place-items:center;border:1px solid var(--ink);background:transparent;color:var(--ink);padding:0;font:inherit;font-size:1.05rem;font-weight:800;cursor:pointer}.theme-toggle:hover{background:var(--ink);color:var(--cream)}
    header{padding:76px 42px 48px;border-top:1px solid #c7bfb2;border-bottom:1px solid var(--ink)}
    .kicker{margin:0;color:var(--red);font-size:.68rem;font-weight:800;letter-spacing:.13em;text-transform:uppercase}
    h1{margin:18px 0 0;font-size:clamp(4rem,9vw,9rem);line-height:.78;letter-spacing:-.1em}
    .pitch-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),360px));justify-content:center;gap:18px;padding:42px}
    .pitch-card{display:flex;flex-direction:column;border:1px solid var(--ink);background:var(--surface)}
    .pitch-card img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-bottom:1px solid var(--ink)}
    .pitch-content{display:flex;flex:1;flex-direction:column;padding:18px}
    .category{margin:0;color:var(--red);font-size:.68rem;font-weight:800;letter-spacing:.1em;text-transform:uppercase}.pitch-content>p:not(.category){max-width:460px;margin:0;line-height:1.5}
    h2{margin:13px 0 10px;font-size:clamp(1.8rem,3vw,2.8rem);line-height:.88;letter-spacing:-.08em}
    .pitch-content a{display:inline-flex;align-self:flex-start;margin-top:auto;padding:0;border:0;font-size:.78rem;font-weight:800;text-decoration:underline;text-underline-offset:4px}.pitch-content a:hover{color:var(--red)}.pitch-content b{margin-left:0;color:var(--red)}
    @media(max-width:760px){nav{padding:22px 20px}.pitch-actions{gap:12px}header{padding:58px 20px 38px}h1{font-size:clamp(3.5rem,16vw,6rem)}.pitch-grid{grid-template-columns:1fr;padding:24px 20px;gap:12px}}
  `
})
export class PitchDeckComponent {
  protected readonly theme = inject(ThemeService);
  protected readonly decks = PITCH_DECKS;
}
