import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaylistService, PlayList } from '../../services/playlist.service';

@Component({
  standalone: true,           
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrls: ['./playlist-list.component.css'],
  imports: [CommonModule, RouterModule] 
})
export class PlaylistListComponent implements OnInit {

  playlists: PlayList[] = [];

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getAllPlayLists().subscribe({
      next: (data) => {
        this.playlists = data;
      },
      error: (err) => {
        console.error('Error fetching playlists', err);
      }
    });
  }

 
  deletePlaylist(name: string): void {
    this.playlistService.deletePlayList(name).subscribe({
      next: () => {
        console.log('Playlist eliminada');
        this.loadPlaylists(); 
      },
      error: (err) => {
        console.error('Error deleting playlist', err);
      }
    });
  }
}

