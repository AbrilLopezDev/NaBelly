import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


export interface Receta {
    idReceta: String,
    
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
  