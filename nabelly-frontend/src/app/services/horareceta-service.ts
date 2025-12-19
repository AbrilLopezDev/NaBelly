
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface horareceta {
    codhorareceta: string,
    nombre: string
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:8080/api/horareceta';

//buscar hora receta

getHoraReceta( id: number ): Observable<horareceta>{
      return this.http.get<horareceta>(`${this.apiUrl}/categoria/${id}`);
    }
}