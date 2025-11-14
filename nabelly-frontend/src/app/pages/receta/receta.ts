import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetaService } from '../../services/receta-service'; 
import { UserService } from '../../services/user-service';
import { UsuarioPublico } from '../../services/user-service';


@Component({
  selector: 'app-receta',
  imports: [],
  templateUrl: './receta.html',
  styleUrl: './receta.css'
})
export class Receta implements OnInit{
  receta: any;
  usuarioAutor: UsuarioPublico | null = null;

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
    });
    this.userService.getUserPorNombre(this.receta.autor).subscribe(data => {
      this.usuarioAutor = data;
    });
  }
}
