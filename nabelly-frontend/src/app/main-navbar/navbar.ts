import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { UserService, Usuario } from '../services/user-service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  imports: [CommonModule, NgIf],
  styleUrls: ['./navbar.css']
  
})
export class Navbar {

  menuOpen = false;
  recetasOpen = false;
  dulcesOpen = false;
  saladasOpen = false;
  animating = false;
  usuario: Usuario | null = null; 

  constructor(private userService: UserService) {}

  ngOnInit() {
    //actualizar la foto automáticamente
    this.userService.user$.subscribe(user => {
      this.usuario = user;
    });
  }

  toggleMenu() {
    this.animating = true;
    this.menuOpen = !this.menuOpen;

    // Duración de la animación = 300ms
    setTimeout(() => {
      this.animating = false;
    }, 300);
  }

  toggleRecetas() { this.recetasOpen = !this.recetasOpen; }
  toggleDulces() { this.dulcesOpen = !this.dulcesOpen; }
  toggleSaladas() { this.saladasOpen = !this.saladasOpen; }


}
