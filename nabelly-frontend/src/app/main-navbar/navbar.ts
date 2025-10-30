import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { UserService, Usuario } from '../services/user-service';
import { CategoriaService, Categoria } from '../services/categoria-service';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioListadoCategoria } from '../pages/usuario-listado-categoria/usuario-listado-categoria';
import { UsuarioInicio } from '../pages/usuario-inicio/usuario-inicio';
import { Router } from '@angular/router';
import { UsuarioRecetas } from '../pages/usuario-recetas/usuario-recetas';
import { HostListener, ElementRef } from '@angular/core';
import { RecetaService } from '../services/receta-service';
import { Receta } from '../services/receta-service';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'inicio', component: UsuarioInicio },
  { path: 'usuario-listado-categoria/:codcategoria', component: UsuarioListadoCategoria },
  { path: 'usuario-recetas', component: UsuarioRecetas}
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  imports: [CommonModule, NgIf, NgFor, RouterModule, FormsModule],
  styleUrls: ['./navbar.css']
})
export class Navbar {

  menuOpen = false;
  recetasOpen = false;
  dulcesOpen = false;
  saladasOpen = false;
  animating = false; // evitar dobles pulsaciones
  userMenuOpen = false;
  miniUserMenuOpen = false;
  perfilOpen = false;
  searchOpen = false;
  usuario: Usuario | null = null;

  dulces: Categoria[] = [];
  saladas: Categoria[] = [];
  searchTerm: string = '';
  sugerencias: Receta[] = [];

  constructor(private userService: UserService, private categoriaService: CategoriaService, 
    private router: Router, private elementRef: ElementRef, private recetaService: RecetaService
  ) {}

  ngOnInit() {
    this.userService.user$.subscribe(user => {
      this.usuario = user;
    });

    this.categoriaService.getCategoriasPorTipo('D').subscribe(data => {
      this.dulces = data;
    });

    this.categoriaService.getCategoriasPorTipo('S').subscribe(data => {
      console.log(data);
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
  togglePerfil() { this.perfilOpen = !this.perfilOpen; }
  toggleUserMiniMenu() { this.miniUserMenuOpen = !this.miniUserMenuOpen; }
  toggleSearch() { this.searchOpen = !this.searchOpen; }

  cerrarSesion() {
    this.userService.clearUser();  
    this.router.navigate(['/login']); 
  }
  
  irMisRecetas() {
    this.router.navigate(['/usuario-recetas']);
    this.menuOpen = false;
  }

  @HostListener('document:click', ['$event']) 
    clickFuera(event: Event) {
      const clickedInside = this.elementRef.nativeElement.contains(event.target);
      if (!clickedInside && this.miniUserMenuOpen) {
        this.miniUserMenuOpen = false;
      }
  }

  onSearchChange() {
    const term = this.searchTerm.trim();

    if (term.length === 0) {
      this.sugerencias = [];
      return;
    }

    this.recetaService.getRecetasPorNombre(term).subscribe({
      next: (recetas) => {
        this.sugerencias = recetas
        .filter((r, i, arr) => arr.findIndex(x => x.nombre === r.nombre) === i) // no se repiten
        .slice(0, 5); // mostrar 5 sugerencias 
      },
      error: (err) => {
        console.error('Error al buscar recetas:', err);
        this.sugerencias = [];
      }
    });
  }

  seleccionarReceta(receta: Receta) {
    this.searchTerm = receta.nombre;
    this.sugerencias = [];
    this.searchOpen = false;

    
  }

}
