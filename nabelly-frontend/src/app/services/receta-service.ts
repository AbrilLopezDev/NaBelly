import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './user-service';
import { Categoria } from './categoria-service';


export interface Receta {
  idReceta: number;
  autor: string;
  nombre: string;      
  descripcion: string;
  pasos: string;
  ingredientes: string;
  porciones: number;
  categoria: string;
  hora: string;          
  foto: string;
  showMenu?: boolean; 
  //traer para las sugerencias tipo de la reeta, tipo y hora (cena, almuerzo)
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
    getRecetasPorUsuario(nombreusuario: string):Observable<Receta[]>{ //si la lista viene vacía mostrar mensaje no hay recetas aún    
      return this.http.get<Receta[]>(`${this.apiUrl}/user/${nombreusuario}`);
    }
    eliminarReceta(idReceta: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/delete/${idReceta}`);
    }
    getRecetasPorNombre( nombre: string ): Observable<Receta[]>{
      return this.http.get<Receta[]>(`${this.apiUrl}/nombre/${nombre}`);
    }
    editarReceta(receta: Receta): Observable<any> {
      return this.http.post(`${this.apiUrl}/edit`, receta);
    }
    getRecetaPorId( id: number ): Observable<Receta[]>{
      return this.http.get<Receta[]>(`${this.apiUrl}/id/${id}`);
    }
    crearReceta(form: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/create`, form);
    }

    actualizarReceta(id: number, form: any): Observable<any> {
      return this.http.put(`${this.apiUrl}/update/${id}`, form);
    }


}
  