import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  

@Component({
  selector: 'app-auth-navbar',
  standalone: true,
  templateUrl: './auth-navbar.html',
  styleUrls: ['./auth-navbar.css'],
  imports: [RouterModule],
})
export class AuthNavbar {}
