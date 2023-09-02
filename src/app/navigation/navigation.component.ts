import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private router : Router,private authService : AuthService) { }
  goToCartPage() {
    this.router.navigate(['/cart']);
  }
  
  goToLoginPage() {
    this.router.navigate(['/login']); 
  }
  
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  goToRegisterPage() {
    this.router.navigate(['/register']);  
  }
}
