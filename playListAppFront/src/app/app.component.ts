import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PlaylistService, PlayList, Song } from './services/play-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.css'],
  standalone:true,
  imports: [CommonModule, FormsModule], 
})
export class AppComponent {
  mode: 'create' | 'list' | 'search' | 'delete' = 'create';

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

  playlists: PlayList[] = [];
  searchName = '';
  searchResult?: PlayList;
  searchError = '';
  deleteName = '';
  deleteMessage = '';

  errorMessage: string | null = null;

  constructor(private playlistService: PlaylistService) {}

  showError(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null; 
    }, 5000);
  }

  addSong(): void {
    this.playlist.songs.push({ ...this.newSong });
    this.newSong = { titulo: '', artista: '', album: '', anno: '', genero: '' };
  }

  savePlaylist(): void {
    this.playlistService.createPlayList(this.playlist).subscribe({
      next: (data) => {
        alert('Playlist creada con éxito');
        this.playlist = { name: '', description: '', songs: [] };
      },
      error: (err) => console.error('Error creando playlist', err)
    });
  }

  loadPlaylists(): void {
    this.playlistService.getAllPlayLists().subscribe({
      next: (data) => {
        this.playlists = data;
      },
      error: (err) =>{this.showError('Error cargando playlists'); 
      },
    });
  }

  searchPlaylist(): void {
    if (!this.searchName) return;
    this.playlistService.getPlayListByName(this.searchName).subscribe({
      next: (data) => {
        this.searchResult = data;
        this.searchError = '';
      },
      error: () => {
        this.searchError = 'No se encontró la playlist';
        this.searchResult = undefined;
      }
    });
  }

  deletePlaylist(): void {
    if (!this.deleteName) return;
    this.playlistService.deletePlayList(this.deleteName).subscribe({
      next: () => {
        this.deleteMessage = `Playlist "${this.deleteName}" eliminada con éxito.`;
      },
      error: (err) => {
        this.deleteMessage = `Error eliminando la playlist: ${err.message}`;
      }
    });
  }
}
