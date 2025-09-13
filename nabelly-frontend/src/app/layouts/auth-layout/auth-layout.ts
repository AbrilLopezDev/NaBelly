import { Component } from '@angular/core';
import { AuthNavbar } from '../../auth-navbar/auth-navbar';
import { Footer } from '../../shared/footer/footer';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [AuthNavbar, Footer, RouterOutlet],
  template: `
    <app-auth-navbar></app-auth-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})
export class AuthLayout {}
