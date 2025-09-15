import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navbar } from './main-navbar/navbar';
import { AuthNavbar } from './auth-navbar/auth-navbar';
import { AuthService } from './services/auth-service';
import { UserService } from './services/user-service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AuthNavbar],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('nabelly-frontend');
  constructor(private authService: AuthService, private userService: UserService, private router: Router ) { }
  ngOnInit() {
  if (this.authService.isLoggedIn()) {
    this.userService.loadUserData().subscribe(user => {
      this.userService.setUser(user);
    });
  }
}


}

