import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from '../../services/receta-service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-usuario-receta-form',
  imports: [FormsModule, NgIf],
  templateUrl: './usuario-receta-form.html',
  styleUrl: './usuario-receta-form.css'
})
export class UsuarioRecetaForm implements OnInit{
  id: number | null = null;
  esEdicion = false;

  form = {
    nombre: '',
    descripcion: '',
    ingredientes: '',
    pasos: '',
    porciones: 0,
    categoria: '',
    foto: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recetaService: RecetaService
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? Number(idParam) : null;

    if (this.id) {
      this.esEdicion = true;
      this.cargarReceta();
    }
  }

  cargarReceta() {
  this.recetaService.getRecetaPorId(Number(this.id)).subscribe(recetas => {
    
    // la primera receta
    const receta = recetas[0];

    if (!receta) return; // por si viene vacío

    this.form = {
      nombre: receta.nombre,
      descripcion: receta.descripcion,
      ingredientes: receta.ingredientes,
      pasos: receta.pasos,
      porciones: receta.porciones,
      categoria: receta.categoria,
      foto: receta.foto
    };
  });
}

  guardar() {
    if (this.esEdicion) {
      this.recetaService.actualizarReceta(this.id!, this.form).subscribe(() => {
        this.router.navigate(['/mi-receta', this.id]);
      });
    } else {
      this.recetaService.crearReceta(this.form).subscribe((nueva: any) => {
        this.router.navigate(['/mi-receta', nueva.id]);
      });
    }
  }

}
