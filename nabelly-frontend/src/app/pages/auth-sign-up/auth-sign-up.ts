import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms'; // para ngModel
import { Router } from '@angular/router';
import {  HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(private authService: AuthService, private router: Router) {

  }


  onSubmit() {

    if (this.password !== this.confPassword) { console.error("Las contraseñas no coinciden"); return; }

    // Si no subió foto, asignar la predeterminada
    const fotoAEnviar = this.foto ?? new File([], 'assets/user.png');

    this.authService.signup({foto: this.foto, username: this.username,password: this.password,email: this.email})
    .subscribe({
        next: (res) => { 
          console.log('JWT recibido:', res.token);
          
          sessionStorage.setItem('token', res.token);

          this.router.navigate(['/inicio']);

        },
        error: (err) => {
          if (err.status === 404) {
          alert('Usuario ya existe');
          } else {
          alert('Error inesperado');
        }
      }
    });
  }

}
