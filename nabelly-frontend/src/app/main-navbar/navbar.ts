import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  imports: [CommonModule],
  styleUrls: ['./navbar.css']
  
})
export class Navbar {

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }


}
