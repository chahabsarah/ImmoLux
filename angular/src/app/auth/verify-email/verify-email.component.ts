import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {
  token: string = '';
  message: string = ''; // Message to display after verification
  isLoading: boolean = false; // Loader state

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onVerify(): void {
    if (this.token.trim()) {
      this.isLoading = true;
      this.authService.verifyEmail(this.token).subscribe({
        next: response => {
          this.message = response.message;
          this.isLoading = false;
          this.router.navigate(['/auth/login']);
        },
        error: err => {
          this.message = 'An error occurred during verification. Please try again.';
          this.isLoading = false;
        }
      });
    } else {
      this.message = 'Please enter the verification code.';
    }
  }
}
