import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginRequest: LoginRequest = {
    email: '',
    password: ''
  };

  errorMessage: string | null = null; // Property to store error message

  constructor(private authService: AuthService, private router: Router) { }

  onLogin(): void {
    this.authService.login(this.loginRequest).subscribe({
      next: (response) => {
        console.log('User logged in successfully:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', response.id.toString());
        this.router.navigate(['/listings/listing-grid']).then(() => {
          window.location.reload();
        });
      },
      error: err => {
        console.error('Error during login:', err);
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message; // Set the error message
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      }
    });
  }

  public routes = routes;
  public Toggledata = true;

  path() {
    this.router.navigate([routes.dashboard]);
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
