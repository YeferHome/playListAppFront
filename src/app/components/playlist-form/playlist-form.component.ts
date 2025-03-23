import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PlaylistService, PlayList, Song } from '../../services/playlist.service';

@Component({
  standalone: true,
  selector: 'app-playlist-form',
  templateUrl: './playlist-form.component.html',
  styleUrls: ['./playlist-form.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class PlaylistFormComponent {

  // Modelo de datos
  playlist: PlayList = {
    name: '',
    description: '',
    songs: []
  };

  newSong: Song = {
    titulo: '',
    artista: '',
    album: '',
    anno: '',
    genero: ''
  };

  constructor(
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  addSong(): void {
    this.playlist.songs.push({ ...this.newSong });
    // limpiar formulario canción
    this.newSong = { titulo: '', artista: '', album: '', anno: '', genero: '' };
  }

  savePlaylist(): void {
    this.playlistService.createPlayList(this.playlist).subscribe({
      next: (data) => {
        console.log('Playlist creada:', data);
        // Redirigir al listado
        this.router.navigate(['/playlists']);
      },
      error: (err) => console.error('Error creando playlist', err)
    });
  }
}

