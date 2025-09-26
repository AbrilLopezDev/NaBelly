import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Categoria {
    codCategoria: String,
    nombre: String,
    codtiporeceta: String,
    codhorareceta: String,
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:8080/api/categorias';

    getCategoriasPorTipo(idtipo: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/tipo/${idtipo}`);
    }

    getCategoriaPorCodCategoria(codCategoria: String): Observable<Categoria>{
      return this.http.get<Categoria>(`${this.apiUrl}/codigo/${codCategoria}`)
    }
    


}
  