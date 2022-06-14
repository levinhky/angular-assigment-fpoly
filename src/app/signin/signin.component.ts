import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  username: string = '';
  password: string = '';
  errMess: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  handleLogin(formValue: any) {
    this.auth
      .login(formValue.username, formValue.password)
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
          localStorage.setItem('token', res.jwtToken);
          localStorage.setItem('token_expires', res.expiresIn);
          localStorage.setItem('user', JSON.stringify(res.userInfo));
          alert('Login successfuly!');
        }
      });
  }

  ngOnInit(): void {}
}
