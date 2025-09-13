import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../../shared/footer/footer';
import { Navbar } from '../../main-navbar/navbar';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ RouterOutlet, Footer, Navbar],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `
})

export class MainLayout {

}
