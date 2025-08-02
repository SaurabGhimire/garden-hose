import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('user@example.com', [Validators.required, Validators.email]),
    password: new FormControl('user123', [Validators.required, Validators.minLength(6)])
  });

  constructor(private toastr: ToastrService, private route: Router, private authService: AuthService) {}

  onSubmit() {
    if (!this.loginForm.valid) {
      this.toastr.error('Please fill out the form correctly.', 'Validation Error');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe(response => {
      if (response.success && response.user) {
        this.toastr.success(`Welcome ${response.user.name}!`, 'Login Successful');
        this.route.navigate(['/todos']);
      } else {
        this.toastr.error(response.message || 'Login failed', 'Error');
      }
    });
  }
}
