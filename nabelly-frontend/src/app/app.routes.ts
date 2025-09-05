import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLogin } from './pages/auth-login/auth-login';
import { UsuarioInicio } from './pages/usuario-inicio/usuario-inicio';
import { AuthSignUp } from './pages/auth-sign-up/auth-sign-up'; 
import { AuthRecovery } from './pages/auth-recovery/auth-recovery';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login', component: AuthLogin },
      { path: 'signup', component: AuthSignUp },
      { path: 'recovery', component: AuthRecovery },
      
    ]
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'inicio', component: UsuarioInicio },
      // otras rutas de la app principal
    ]
  }
];