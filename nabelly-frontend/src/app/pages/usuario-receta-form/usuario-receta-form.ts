import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecetaService } from '../../services/receta-service';
import { NgForm, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario-receta-form',
  templateUrl: './usuario-receta-form.html',
  standalone: true,
  imports:[CommonModule, NgFor, NgIf, FormsModule],
})
export class UsuarioRecetaForm implements OnInit{
 esEdicion = false;
  idReceta!: number;

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
    const id = this.route.snapshot.paramMap.get('idReceta');

    if (id) {
      this.esEdicion = true;
      this.idReceta = +id;

      this.recetaService.getRecetaPorId(this.idReceta)
        .subscribe(r => {
          console.log("RECETA RECIBIDA:", r);
          this.form = {
            nombre: r.nombre || '',
            descripcion: r.descripcion || '',
            ingredientes: r.ingredientes || '',
            pasos: r.pasos || '',
            porciones: r.porciones || 0,
            categoria: r.categoria || '',
            foto: r.foto || ''
          };
        });
    }
  }

  guardar() {
    if (this.esEdicion) {
      this.recetaService.actualizarReceta(this.idReceta, this.form)
        .subscribe(() => {
          this.router.navigate(['/usuario/lista']);
        });
    } else {
      this.recetaService.crearReceta(this.form)
        .subscribe(() => {
          this.router.navigate(['/usuario/lista']);
        });
    }
  }
}
