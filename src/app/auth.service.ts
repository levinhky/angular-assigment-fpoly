import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAccount } from './account';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://json-api-public.herokuapp.com/api/account/';

  constructor(private httpService: HttpClient) {}

  login(username: string, password: string) {
    const userInfo = { username, password };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpService.post(
      'http://localhost:3000/login',
      JSON.stringify(userInfo),
      { headers: headers }
    );
  }

  checkLogin() {
    const token = localStorage.getItem('token_expires') || '';
    const userInfo = localStorage.getItem('user') || '';
    return token == '' ? false : JSON.parse(userInfo);
  }

  signup(data: IAccount): Observable<IAccount> {
    return this.httpService.post<IAccount>(this.url, data);
  }

  checkUsername(username: string): Observable<IAccount> {
    return this.httpService.get<IAccount>(this.url + `?username=${username}`);
  }

  changePassword(newPassword: string, idAccount: number): Observable<IAccount> {
    return this.httpService.patch<IAccount>(this.url + idAccount, {
      password: newPassword,
    });
  }

  // deleteEmployee(employeeId: number): Observable<IEmployee> {
  //   return this.httpService.delete<IEmployee>(this.url + employeeId);
  // }
}
