import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Receta } from '../../services/receta-service';
import { RecetaService } from '../../services/receta-service';
import { Categoria } from '../../services/categoria-service';
import { CategoriaService } from '../../services/categoria-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-listado-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuario-listado-categoria.html',
  styleUrl: './usuario-listado-categoria.css'
  
})
export class UsuarioListadoCategoria implements OnInit{
  codCategoria: string | null = null;
  recetas: Receta[] = [];
  categoria: Categoria | null = null;
  cantidadRecetas: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 8;

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
          this.cantidadRecetas = this.recetas.length;
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
}


