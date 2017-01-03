import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginFailed = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  login() {
    this.loginFailed = false;
    this.loginService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    )
    .subscribe(
      () => {
        this.router.navigate(['']);
      },
      () => {
        this.loginFailed = true;
      }
    );
  }
}
