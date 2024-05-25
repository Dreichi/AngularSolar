import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  isLogged = false;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    @Inject(Router) private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onConnexionClick(): void {
    if (this.isLogged) {
      this.router.navigate(['/profile']);
    } else {
      this.openModal();
    }
  }

  openModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }

  closeModal(): void {
    const modal = document.getElementById('myModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  onRegisterSubmit(): void {
    if (this.registerForm.valid) {
      const userData = {
        ...this.registerForm.value,
        role: 'USER',
      };

      console.log('Submitting registration form with data:', userData);

      this.http
        .post('http://localhost:8080/api/v1/auth/register', userData)
        .subscribe(
          (response) => {
            console.log('User registered successfully:', response);
            this.closeModal();
          },
          (error) => {
            console.error('Error registering user:', error);
          }
        );
    } else {
      console.log('Register form is invalid:', this.registerForm.errors);
      this.logFormErrors(this.registerForm);
    }
  }

  onLoginSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;

      console.log('Submitting login form with data:', loginData);

      this.http
        .post('http://localhost:8080/api/v1/auth/authenticate', loginData)
        .subscribe(
          (response) => {
            console.log('User logged in successfully:', response);
            this.isLogged = true; // Update the login status
            this.closeModal();
          },
          (error) => {
            console.error('Error logging in user:', error);
          }
        );
    } else {
      console.log('Login form is invalid:', this.loginForm.errors);
      this.logFormErrors(this.loginForm);
    }
  }

  logFormErrors(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const controlErrors = form.get(key)?.errors;
      if (controlErrors) {
        console.log(`Control: ${key}, Errors:`, controlErrors);
      }
    });
  }
}
