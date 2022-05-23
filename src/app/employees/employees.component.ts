import { NgForm } from '@angular/forms';
import { IEmployee } from './../employee';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  @ViewChild('formUpdate') formUpdate: NgForm | any;

  employeeList: any = [];
  newEmployeeList: any = [];
  employee = <IEmployee>{};
  employeeId: number = 0;

  searchText: string = '';

  constructor(private employeeService: EmployeesService) {}

  getAllEmployee() {
    this.employeeService.getAllEmployees().subscribe((employees) => {
      this.employeeList = employees;
      this.newEmployeeList = employees;
    });
  }

  getOneEmployee(employeeId: number) {
    this.employeeService
      .getOneEmployee(employeeId)
      .subscribe((employee: any) => {
        this.employee = employee;
        this.employeeId = employee.id;
      });
  }

  handleEditEmployee() {
    this.employeeService
      .editEmployee(this.formUpdate.value, this.employeeId)
      .subscribe((p) => {
        this.getAllEmployee();
      });
  }

  handleDeleteEmployee(employeeId: number) {
    console.log(employeeId);
  }

  formCreateSubmit() {
    this.employeeService.createEmployee(this.employee).subscribe((em) => {
      this.getAllEmployee();
    });
  }

  handleSearchEmployee() {
    const searchText = this.searchText.trim().toLowerCase();

    this.employeeList = this.newEmployeeList.filter((p: any) => {
      return p.employeeName.trim().toLowerCase().includes(searchText);
    });
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }
}
