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
  animating = false;
  usuario: Usuario | null = null; 

  dulces: Categoria[] = [];
  saladas: Categoria[] = [];

  constructor(private userService: UserService, private categoriaService: CategoriaService) {}

  ngOnInit() {
    //actualizar la foto automáticamente
    this.userService.user$.subscribe(user => {
      this.usuario = user;
    });

    //Busco las categorias
    this.categoriaService.getCategoriasPorTipo('D').subscribe(data => {
    this.dulces = data;
    });
 
    this.categoriaService.getCategoriasPorTipo('S').subscribe(data => {
    this.saladas = data;
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
