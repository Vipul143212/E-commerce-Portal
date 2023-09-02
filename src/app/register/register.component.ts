import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_shared/services/auth.service';
import { passwordMatchValidator } from '../_shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validator: passwordMatchValidator('password', 'confirmPassword'), // Add the custom validator
    });
  }

  onSubmit() {
    if (this.registrationForm!.valid) { 
      const username = this.registrationForm!.get('username')!.value; 
      const password = this.registrationForm!.get('password')!.value; 
  
      this.authService.register(username, password).subscribe(
        (response) => {
          // Successful registration
          this.router.navigate(['/login']);
        },
        (error) => {
          // Handle registration error, e.g., display error message
          this.errorMessage = 'Registration failed. Please try again.';
        }
      );
    }
  }
  
  
}
