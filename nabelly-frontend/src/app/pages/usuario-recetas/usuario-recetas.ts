import { Component } from '@angular/core';
import { Receta } from '../../services/receta-service';
import { RecetaService } from '../../services/receta-service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-usuario-recetas',
  imports: [CommonModule, NgIf],
  templateUrl: './usuario-recetas.html',
  styleUrl: './usuario-recetas.css' 
})
export class UsuarioRecetas implements OnInit {

  recetas: Receta[] = [];
  mensaje: string = '';
  cantidadRecetas: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(
    private router: Router,
    private recetaService: RecetaService 
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

borrarReceta(receta: any) {
  console.log('Borrar receta:', receta);
 
}


}
