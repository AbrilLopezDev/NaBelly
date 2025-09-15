import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms'; // para ngModel
import { Router } from '@angular/router';
import {  HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-auth-sign-up',
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './auth-sign-up.html',
  styleUrl: './auth-sign-up.css'
})
export class AuthSignUp {
  foto: File | null = null;
  username: string = '';
  password: string = '';
  confPassword: string = '';
  email: string = '';
  

  previewUrl: string | ArrayBuffer | null = null;

  step: number = 1; 

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.foto = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result; // Guarda la previsualización
      };
      reader.readAsDataURL(file);
      }
      input.value = '';
    }

   nextStep() { 
    // Validar campos del paso 1 antes de pasar al paso 2
    if (!this.username || !this.email || !this.password || !this.confPassword) {
      alert('Completa todos los campos');
      return;
    }
    if (this.password !== this.confPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    this.step = 2;
  }

  prevStep() { 
    this.step = 1;
  }

  constructor(private authService: AuthService, private userService:UserService, private router: Router) {

  }


  onSubmit() {

    if (this.password !== this.confPassword) { 
    console.error("Las contraseñas no coinciden"); 
    return; 
  }

  this.authService.signup({
    foto: this.foto, 
    username: this.username,
    password: this.password,
    email: this.email
  })
  .subscribe({
    next: (res) => { 
      // Guardar token
      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('role', res.role);

      // Cargar datos completos del usuario
      this.userService.loadUserData().subscribe(user => {
        this.userService.setUser(user); // guardar usuario completo en BehaviorSubject y sesión
        this.router.navigate(['/inicio']);
      });

    },
    error: (err) => {
      if (err.status === 409) {
        alert('Usuario ya existe');
      } else if (err.status === 422) {
        alert('Error al guardar usuario en la base de datos');
      } else if (err.status === 500) {
        alert('Error al guardar la foto en el servidor');
      } else {
        alert('Error inesperado');
      }
    }
  });
  }

}
