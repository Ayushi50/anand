import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { WorkGalleryComponent } from './work-gallery.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Anand Nihal — Portfolio' },
  { path: 'work/2d', component: WorkGalleryComponent, data: { workType: '2d' }, title: '2D Work — Anand Nihal' },
  { path: 'work/3d', component: WorkGalleryComponent, data: { workType: '3d' }, title: '3D Work — Anand Nihal' },
  { path: '**', redirectTo: '' }
];
