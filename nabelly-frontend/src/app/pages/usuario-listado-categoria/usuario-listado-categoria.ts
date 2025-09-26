import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Receta } from '../../services/receta-service';
import { RecetaService } from '../../services/receta-service';
import { Categoria } from '../../services/categoria-service';
import { CategoriaService } from '../../services/categoria-service';

@Component({
  selector: 'app-usuario-listado-categoria',
  standalone: true,
  templateUrl: './usuario-listado-categoria.html',
  styleUrl: './usuario-listado-categoria.css'
})
export class UsuarioListadoCategoria implements OnInit{
  codCategoria: string | null = null;
  recetas: Receta[] = [];
  categoria: Categoria | null = null;

  constructor(
    private route: ActivatedRoute,
    private recetaService: RecetaService,
    private categoriaService: CategoriaService 
  ) {}

  ngOnInit(): void {
    // Obtener parametro de la URL
    this.codCategoria = this.route.snapshot.paramMap.get('codCategoria');

    if (this.codCategoria) {
      
      this.recetaService.getRecetasPorCategoria(this.codCategoria).subscribe(
        data => {
          this.recetas = data;
        },
        err => {
          console.error('Error al cargar recetas', err);
        }
      );
    }
      if (this.codCategoria) {
        this.categoriaService.getCategoriaPorCodCategoria(this.codCategoria).subscribe(
        cat => {
          this.categoria = cat;
        },
        err => console.error('Error al cargar la categoría', err)
      );
    }
    
  }

}
