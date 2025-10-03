import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './user-service';
import { Categoria } from './categoria-service';


export interface Receta {
  idReceta: number;
  usuario: Usuario;
  nombre: string;      
  descripcion: string;
  pasos: string;
  ingredientes: string;
  porciones: number;
  categoria: Categoria;
  hora: string;          
  foto: string;
  favoritos: number;
}

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:8080/api/recetas';

     getRecetasPorCategoria(codCategoria: string): Observable<Receta[]> {
        return this.http.get<Receta[]>(`${this.apiUrl}/categoria/${codCategoria}`);
        }


}
  