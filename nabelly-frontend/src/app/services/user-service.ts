import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Usuario {
  id: number;
  username: string;
  email: string;
  foto: string; 
}
export interface UsuarioPublico {

  username: string;
  foto: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<Usuario | null>(null);
  user$ = this.userSubject.asObservable();

  private apiUrl = 'http://localhost:8080/api/usuario'; 

  constructor(private http: HttpClient) {}

  //cargar datos completos del usuario
  loadUserData(): Observable<Usuario> {
  const token = sessionStorage.getItem('token'); // recupero el token
  return this.http.get<Usuario>(`${this.apiUrl}/me`, {
    headers: {
      Authorization: `Bearer ${token}` // envío token en el header
    }
  });
}

  //guardar en sesión
  setUser(user: Usuario) {
    this.userSubject.next(user);
    sessionStorage.setItem('usuario', JSON.stringify(user));
  }

  // usuario desde memoria
  getUser(): Usuario | null {
    return this.userSubject.value;
  }

  // Limpiar datos al hacer logout
  clearUser() {
    this.userSubject.next(null);
    sessionStorage.removeItem('usuario');
  }

  getUserPorNombre(nombre: string): Observable<UsuarioPublico> {
        return this.http.get<UsuarioPublico>(`${this.apiUrl}/username/${nombre}`);
        }
}