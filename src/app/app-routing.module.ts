import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_shared/services/auth-guard.service';

const routes: Routes = [
  { path: '', component: ProductListingComponent },
  { path: 'products', component: ProductListingComponent, canActivate: [AuthGuard]},
  { path: 'product/:id', component: ProductDetailsComponent },
  // { path: 'cart', component: CartComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
