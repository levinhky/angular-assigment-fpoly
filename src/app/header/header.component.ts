import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any = {};

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const userStore: any = localStorage.getItem('user');
    this.user = JSON.parse(userStore);
  }

  logged() {
    return this.auth.checkLogin();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expires');
    localStorage.removeItem('user');
  }
}
