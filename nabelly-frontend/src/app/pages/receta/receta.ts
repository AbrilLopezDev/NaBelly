import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetaService } from '../../services/receta-service'; 
import { UserService } from '../../services/user-service';
import { UsuarioPublico } from '../../services/user-service';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';


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

  constructor(
    private route: ActivatedRoute,
    private recetaService: RecetaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // tomar el id
    const id = Number(this.route.snapshot.paramMap.get('id'));

    
    this.recetaService.getRecetaPorId(id).subscribe((data) => {
      this.receta = data;

      if (this.receta.ingredientes) {
        this.ingredientesArray = this.receta.ingredientes
        .split(',')
        .map((i: string) => i.trim());
      }
      
      this.userService.getUserPorNombre(this.receta.autor).subscribe((usuario) => {
        this.usuarioAutor = usuario;
      });
    });
    
  }
}
