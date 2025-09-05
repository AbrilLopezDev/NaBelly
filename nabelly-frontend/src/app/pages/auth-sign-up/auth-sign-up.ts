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
  username: string = '';
  password: string = '';
  email: string = '';

  previewUrl: string | ArrayBuffer | null = null;

  onFileSelected(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result; // Guarda la previsualización
    };
    reader.readAsDataURL(file);
    }
  }

  isMobile = false;
  step = 1; // Paso actual del formulario

  constructor() {
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile = window.innerWidth < 768; // por ej. < md
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  onSubmit() {
  }

}
