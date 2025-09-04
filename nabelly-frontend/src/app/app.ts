import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './main-navbar/navbar';
import { AuthNavbar } from './auth-navbar/auth-navbar';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AuthNavbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('nabelly-frontend');
}
