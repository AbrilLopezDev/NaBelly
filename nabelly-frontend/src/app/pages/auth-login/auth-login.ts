import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms'; // para ngModel
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  standalone: true, 
  imports: [FormsModule], // necesario para [(ngModel)]
  templateUrl: './auth-login.html',
  styleUrls: ['./auth-login.css']
})
export class AuthLogin {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router ) { }


  onSubmit() {
    this.authService.login({ username: this.username, password: this.password })
    //this para acceder a propiedad de la clase
      .subscribe({
        next: (res) => { //respuesta llega correctamente
          console.log('JWT recibido:', res.token);
          // Guardar token en localStorage/sessionStorage
          sessionStorage.setItem('token', res.token);

          this.router.navigate(['/inicio']);

        },
        error: (err) => {
          if (err.status === 404) {
          alert('Usuario no existe');
          } else if (err.status === 401) {
          alert('Contraseña incorrecta');
          } else {
          alert('Error inesperado');
        }
      }
    });
  }
}