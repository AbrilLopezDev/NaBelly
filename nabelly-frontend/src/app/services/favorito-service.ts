import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './user-service';
import { Categoria } from './categoria-service';


export interface Favorito {
    idReceta: number;
    username: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:8080/api/favoritos';

    getFavoritosReceta (idReceta: number):Observable<number>{
        return this.http.get<number>(`${this.apiUrl}/favoritos/${idReceta}`);
    }
    isFavorito(idReceta: number, username: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/check/${idReceta}/${username}`);
    }
    toggleFavorito(idReceta: number, username: string): Observable<boolean> {
        return this.http.get<boolean>(`${this.apiUrl}/toggle/${idReceta}/${username}`);
    }
}