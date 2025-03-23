import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlaylistService, PlayList } from '../../services/playlist.service';

@Component({
  standalone: true,
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrls: ['./playlist-detail.component.css'],
  imports: [CommonModule]
})
export class PlaylistDetailComponent implements OnInit {

  playlist?: PlayList;

  constructor(
    private route: ActivatedRoute,
    private playlistService: PlaylistService
  ) {}

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.playlistService.getPlayListByName(name).subscribe({
        next: (data) => this.playlist = data,
        error: (err) => console.error('Error fetching playlist detail', err)
      });
    }
  }
}

