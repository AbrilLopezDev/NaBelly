import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetaService } from '../../services/receta-service'; 
import { UserService } from '../../services/user-service';
import { UsuarioPublico } from '../../services/user-service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { FavoritoService } from '../../services/favorito-service';


@Component({
  selector: 'app-receta',
  imports: [NgFor, CommonModule, DatePipe],
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})
export class Receta implements OnInit{
  receta: any;
  usuarioAutor: UsuarioPublico | null = null;
  ingredientesArray: string[] = [];
  pasosArray: string[] = [];
  esFavorito: boolean = false;
  favoritos: number = 0;
  username: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private recetaService: RecetaService,
    private userService: UserService,
    private favoritoService: FavoritoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
  this.username = sessionStorage.getItem('username');

  this.recetaService.getRecetaPorId(id).subscribe((data) => {
    this.receta = data;

    if (this.receta.ingredientes) {
      this.ingredientesArray = this.receta.ingredientes
        .split(',')
        .map((i: string) => i.trim());
    }

    this.userService.getUserPorNombre(this.receta.autor).subscribe(usuario => {
      this.usuarioAutor = usuario;
    });

    this.favoritoService.getFavoritosReceta(id).subscribe(cantidad => {
      this.favoritos = cantidad;
    });

    if (this.username) {
      this.favoritoService.isFavorito(id, this.username).subscribe(estado => {
        this.esFavorito = estado;
      });
    }
  });
  }
  toggleFavorito() {
  if (!this.username) return; // usuario no logueado
  
  const id = this.receta.idReceta;

  this.favoritoService.toggleFavorito(id, this.username).subscribe({
    next: () => {
      
      this.favoritoService.isFavorito(id, this.username!).subscribe(estado => {
        this.esFavorito = estado;

        
        this.favoritoService.getFavoritosReceta(id).subscribe(cantidad => {
          this.favoritos = cantidad;
        });
      });
    },
    error: err => {
      console.error("Error al hacer toggle:", err);
    }
  });
}
}
