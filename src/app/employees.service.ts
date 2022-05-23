import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IEmployee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  url = 'http://localhost:3000/employees/';

  constructor(private httpService: HttpClient) {}

  getAllEmployees(): Observable<IEmployee[]> {
    return this.httpService.get<IEmployee[]>(this.url);
  }

  getOneEmployee(employeeId: number): Observable<IEmployee> {
    return this.httpService.get<IEmployee>(this.url + employeeId);
  }

  deleteEmployee(employeeId: number): Observable<IEmployee> {
    return this.httpService.delete<IEmployee>(this.url + employeeId);
  }

  createEmployee(data: IEmployee): Observable<IEmployee> {
    return this.httpService.post<IEmployee>(this.url, data);
  }

  editEmployee(data: IEmployee, employeeId: number): Observable<IEmployee> {
    return this.httpService.put<IEmployee>(this.url + employeeId, data);
  }
}
