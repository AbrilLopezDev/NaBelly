import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { FormsModule } from '@angular/forms'; // para ngModel
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router'; // necesario para redirecciones
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-auth-login',
  standalone: true, 
  imports: [FormsModule, RouterLink], // necesario para [(ngModel)]
  templateUrl: './auth-login.html',
  styleUrls: ['./auth-login.css']
})
export class AuthLogin {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private userService: UserService, private router: Router ) { }


  onSubmit() {
    this.authService.login({ username: this.username, password: this.password })
    .subscribe({
      next: (res) => {
        // Guardar token y rol
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('role', res.role);

        
        this.userService.loadUserData().subscribe(user => {
          this.userService.setUser(user); // guardaR usuario completo en BehaviorSubject y sesión

          
          this.router.navigate(['/inicio']);
        });

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