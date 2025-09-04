import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string; // JWT que enviará el backend
  role: string;  // tipo de usuario
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth'; // endpoint de login en Spring

  constructor(private http: HttpClient) { }

  login(data: LoginRequest): Observable<LoginResponse> { //necesita lo del login request, espera recibir lo del login response 
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }
}