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

interface SignupRequest{
  foto: File | null;
  username: string;
  password: string;
  email: string;
}

interface SignupResponse {
  token: string; 
  role: string;  
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

  signup(data: SignupRequest): Observable<SignupResponse> { //formdata porque hay un file, no se puede convertir a json
  const formData = new FormData();

  if (data.foto) {
    formData.append("foto", data.foto);
  }
  formData.append("username", data.username);
  formData.append("password", data.password);
  formData.append("email", data.email);

  return this.http.post<SignupResponse>(`${this.apiUrl}/signup`, formData);
}
}