import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { UserService, Usuario } from '../services/user-service';
import { CategoriaService, Categoria } from '../services/categoria-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  imports: [CommonModule, NgIf, NgFor, RouterModule],
  styleUrls: ['./navbar.css']
})
export class Navbar {
  menuOpen = false;
  recetasOpen = false;
  dulcesOpen = false;
  saladasOpen = false;
  animating = false; // evitar dobles pulsaciones
  userMenuOpen = false;
  usuario: Usuario | null = null;

  dulces: Categoria[] = [];
  saladas: Categoria[] = [];

  constructor(private userService: UserService, private categoriaService: CategoriaService) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.usuario = user;
    });

    this.categoriaService.getCategoriasPorTipo('D').subscribe(data => {
      this.dulces = data;
    });

    this.categoriaService.getCategoriasPorTipo('S').subscribe(data => {
      this.saladas = data;
    });
  }


  toggleMenu() {
    if (this.animating) return;
    this.animating = true;
    this.menuOpen = !this.menuOpen;

    // mantener bloqueado solo mientras corre la animación
    setTimeout(() => {
      this.animating = false;
    }, 350); 
  }
  
 
  onTogglePointer(ev: Event) {
    ev.preventDefault();
    ev.stopPropagation();
    this.toggleMenu();
  }

  toggleRecetas() { this.recetasOpen = !this.recetasOpen; }
  toggleDulces() { this.dulcesOpen = !this.dulcesOpen; }
  toggleSaladas() { this.saladasOpen = !this.saladasOpen; }
}
