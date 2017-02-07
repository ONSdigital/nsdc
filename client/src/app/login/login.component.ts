import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'nsdc-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitFailed = false;
  submitPending = false;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.submitFailed = false;
    });
  }

  login() {
    this.submitPending = true;
    this.loginService.login(
      this.loginForm.controls['username'].value,
      this.loginForm.controls['password'].value
    )
    .subscribe(
      () => {
        this.submitPending = false;
        this.router.navigate(['']);
      },
      error => {
        this.submitPending = false;
        this.submitFailed = true;
      }
    );
  }
}
