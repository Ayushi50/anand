import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class HomeComponent {
  protected readonly theme = inject(ThemeService);
}
