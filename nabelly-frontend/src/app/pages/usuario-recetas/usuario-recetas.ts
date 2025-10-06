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


}
