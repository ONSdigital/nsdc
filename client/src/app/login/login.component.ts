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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]]
    });
  }

  login() {
    this.loginService.login(
      this.loginForm.controls['email'].value,
      this.loginForm.controls['password'].value
    )
    .subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
