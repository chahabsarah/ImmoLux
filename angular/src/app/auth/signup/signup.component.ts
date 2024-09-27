import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { SignupRequest } from 'src/app/models/SignupRequest';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupRequest: SignupRequest = {
    username: '',
    email: '',
    password: '',
    address: '',
    phoneNumber: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, public router: Router) { }

  onSignup(): void {
    this.authService.signup(this.signupRequest).subscribe({
      next: response => {
        this.successMessage = response.message;
        this.errorMessage = '';
        console.log('User registered successfully:', response);
        this.router.navigate(['/auth/verify']);

      },
      error: err => {
        this.errorMessage = 'Error during signup. Please try again.';
        this.successMessage = '';
        console.error('Error during signup:', err);
      }
    });
  }

  public routes = routes;
  public Toggledata = false;

  path() {
    this.router.navigate([routes.login]);
  }

  iconLogle() {
    this.Toggledata = !this.Toggledata;
  }
}
