import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Song {
  titulo: string;
  artista: string;
  album: string;
  anno: string;
  genero: string;
}

export interface PlayList {
  name: string;
  description: string;
  songs: Song[];
}

@Injectable({ providedIn: 'root' })
export class PlaylistService {
  private apiUrl = 'http://localhost:8080/api/quipux/lists';

  constructor(private http: HttpClient) {}

  //1. crear una playList
  createPlayList(playlist: PlayList): Observable<PlayList> {
    return this.http.post<PlayList>(this.apiUrl, playlist);
  }

   // 2. Obtener todas las playlists
   getAllPlayLists(): Observable<PlayList[]> {
    return this.http.get<PlayList[]>(this.apiUrl);
  }

  // 3. Eliminar playlist por nombre
  deletePlayList(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${name}`);
  }
   // 4. Obtener playlist por nombre
   getPlayListByName(name: string): Observable<PlayList> {
    return this.http.get<PlayList>(`${this.apiUrl}/${name}`);
  }


}
