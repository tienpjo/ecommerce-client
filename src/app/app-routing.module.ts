import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component/main/main.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    pathMatch: 'full',
  },
  {
    path: 'product',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductModule),
  },
  {
    path: 'authorize',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'cart',
    loadChildren: () => import('./features/checkout/checkout.module').then(m => m.CheckoutModule),
  },
  {
    path: 'jwt/:accessToken',
    loadComponent: () =>
      import('./features/auth/jwt-token/jwt-token.component').then(m => m.JwtTokenComponent),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
