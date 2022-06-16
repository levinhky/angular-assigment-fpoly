import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any = null;
  username: string = '';
  newPassword: string = '';
  isUsername: boolean = false;
  idAccount: number = 0;
  isError: boolean = false;

  constructor(private auth: AuthService) {}

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires');
    localStorage.removeItem('user');
  }

  logged() {
    return this.auth.checkLogin();
  }

  checkUsername() {
    this.auth.checkUsername(this.username).subscribe((data: any) => {
      if (data.length > 0) {
        this.isUsername = true;
        this.isError = false;
        this.idAccount = data[0].id;
      } else {
        this.isError = true;
      }
    });
  }

  handleChangePassword() {
    this.auth
      .changePassword(this.newPassword, this.idAccount)
      .subscribe((data) => {
        alert('Đổi mật khẩu thành công!');
        this.username = '';
        this.newPassword = '';
      });
  }

  ngOnInit(): void {
    this.user = this.logged();
  }
}
