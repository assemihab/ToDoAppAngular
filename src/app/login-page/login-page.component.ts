import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import formsmodule
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private authService: AuthService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }


  tryLogin(value:any) {
    this.authService.doLogin(value).subscribe({
      next: (res:any) => {
        localStorage.setItem('authData', JSON.stringify(res));
        const now = new Date().getTime();
        const expiryInSeconds = parseInt(res.expiresIn);
        // const expiryInSeconds=10;
        localStorage.setItem('token_expiry', (now + expiryInSeconds * 1000).toString());
        this.router.navigate(['/tasks']);
      }
      , error: (err) => {
        console.error('Login failed', err);
        // Handle login error
      }
    });
      
    
  }

  // tryLogin(value) {
  //   this.authService.doLogin(value)
  //     .then(res => {
  //       this.router.navigate(['/user']);
  //     }, err => {
  //       console.log(err);
  //       this.errorMessage = err.message;
  //     })
  // }



}
