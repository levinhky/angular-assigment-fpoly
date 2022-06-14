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
    if (token === '') {
      return false;
    } else {
      return true;
    }
    // const expiresAt = JSON.parse(token);
    // return moment().isBefore(moment(expiresAt));
  }

  // getOneEmployee(employeeId: number): Observable<IEmployee> {
  //   return this.httpService.get<IEmployee>(this.url + employeeId);
  // }

  // deleteEmployee(employeeId: number): Observable<IEmployee> {
  //   return this.httpService.delete<IEmployee>(this.url + employeeId);
  // }

  // createEmployee(data: IEmployee): Observable<IEmployee> {
  //   return this.httpService.post<IEmployee>(this.url, data);
  // }

  // editEmployee(data: IEmployee, employeeId: number): Observable<IEmployee> {
  //   return this.httpService.put<IEmployee>(this.url + employeeId, data);
  // }
}
