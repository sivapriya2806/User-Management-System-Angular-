import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { error } from 'console';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css',
})
export class AuthenticationComponent {
  isLoggingMode = false;
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  onSwitchMode() {
    this.isLoggingMode = !this.isLoggingMode;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(form.value);

      this.authService.login(this.email, this.password).subscribe(
        () => {
          this.router.navigate(['/information']);
        },
        (error) => {
          this.errorMessage = 'Invalid Credentials';
        }
      );
    } else {
      console.log('form invalid');
    }
  }
}
