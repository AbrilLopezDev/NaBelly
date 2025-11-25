import { Component } from '@angular/core';
import { Receta } from '../../services/receta-service';
import { RecetaService } from '../../services/receta-service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import {  HostListener, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritoService } from '../../services/favorito-service';

@Component({
  selector: 'app-usuario-recetas',
  imports: [CommonModule, NgIf, RouterLink],
  templateUrl: './usuario-recetas.html',
  styleUrl: './usuario-recetas.css' 
})
export class UsuarioRecetas implements OnInit {

  recetas: Receta[] = [];
  mensaje: string = '';
  cantidadRecetas: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  recetaAEliminar: Receta | null = null;
  confirmarEliminarModal = false;
  favoritosCount: { [id: number]: number } = {};

  constructor(
    private router: Router,
    private recetaService: RecetaService,
    private elementRef: ElementRef,
    private favoritoService: FavoritoService
  ) {}

  ngOnInit(): void {
    const username = sessionStorage.getItem('username');

    if (!username) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargarRecetas(username);
  }

  cargarRecetas(username: string) {
    this.recetaService.getRecetasPorUsuario(username).subscribe({
      next: (data) => {
        this.recetas = data;
        this.cantidadRecetas = this.recetas.length;
        if (this.recetas.length === 0) {
          this.mensaje = 'No has publicado recetas aún :(';
        }
        this.recetas.forEach(receta => {
          this.favoritoService.getFavoritosReceta(receta.idReceta).subscribe({
            next: (cantidad) => this.favoritosCount[receta.idReceta] = cantidad,
            error: () => this.favoritosCount[receta.idReceta] = 0
          });
        });
      },
      error: (err) => {
        console.error('Error al obtener recetas:', err);
        this.mensaje = 'Error al cargar recetas.';
      }
    });
  }

  get recetasPaginadas(): Receta[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.recetas.slice(start, start + this.itemsPerPage);
  }

  
  get totalPages(): number {
    return Math.ceil(this.cantidadRecetas / this.itemsPerPage);
  }

  
  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPages) {
      this.currentPage = pagina;
    }
  }

  toggleMenu(id: number) {
  this.recetasPaginadas.forEach(r => {
    if (r.idReceta === id) {
      r.showMenu = !r.showMenu;
    } else {
      r.showMenu = false; // cerrar otros menús
    }
  });
}

editarReceta(receta: any) {
  console.log('Editar receta:', receta);
  
}

solicitarEliminar(receta: Receta) {
  this.recetaAEliminar = receta;
  this.confirmarEliminarModal = true; // muestra el modal
}

confirmarEliminar() { 
  if (!this.recetaAEliminar) return;
  const username = sessionStorage.getItem('username');
  if (!username) return;

  this.recetaService.eliminarReceta(this.recetaAEliminar.idReceta).subscribe({
    next: (exito) => {
      if (exito) {
        // Eliminar localmente
        this.recetas = this.recetas.filter(r => r.idReceta !== this.recetaAEliminar?.idReceta);
        this.cantidadRecetas = this.recetas.length;
        if(this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages || 1;
        }
        console.log('Receta eliminada permanentemente');
      }
    },
    error: (err) => {
      console.error('Error al eliminar receta:', err);
    }
  });

  this.confirmarEliminarModal = false;
  this.recetaAEliminar = null;
  }

  cancelarEliminar() {
  this.confirmarEliminarModal = false;
  this.recetaAEliminar = null;
  }

  @HostListener('document:click', ['$event'])
  clickFuera(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.recetasPaginadas.forEach(r => r.showMenu = false);
    }
  }


}
