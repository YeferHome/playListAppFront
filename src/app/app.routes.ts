import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlaylistListComponent } from './components/playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';
import { PlaylistFormComponent } from './components/playlist-form/playlist-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'create', component: PlaylistFormComponent },
    { path: 'list', component: PlaylistListComponent },
    { path: 'search', component: PlaylistDetailComponent },
    { path: 'delete', component: PlaylistListComponent }
  ];
  