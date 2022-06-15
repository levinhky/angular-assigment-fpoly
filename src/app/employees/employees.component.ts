import { IEmployee } from './../employee';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../employees.service';

import { NgForm, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit {
  @ViewChild('formUpdate') formUpdate: NgForm | any;
  @ViewChild('formCreate') formCreate: NgForm | any;

  employeeList: any = [];
  newEmployeeList: any = [];
  employee = <IEmployee>{};
  employeeId: number = 0;

  searchText: string = '';

  isLoading: boolean = true;

  formEmployee!: FormGroup;

  constructor(
    private employeeService: EmployeesService,
    private auth: AuthService
  ) {}

  getAllEmployee() {
    this.employeeService.getAllEmployees().subscribe((employees) => {
      this.employeeList = employees;
      this.newEmployeeList = employees;
      this.isLoading = false;
    });
  }

  logged() {
    return this.auth.checkLogin();
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
    this.employeeService.deleteEmployee(employeeId).subscribe((em) => {
      this.getAllEmployee();
    });
  }

  formCreateSubmit() {
    this.employeeService
      .createEmployee(this.formEmployee.value)
      .subscribe((em) => {
        this.getAllEmployee();
      });

    this.formCreate.reset();
  }

  handleSearchEmployee() {
    const searchText = this.searchText.trim().toLowerCase();

    this.employeeList = this.newEmployeeList.filter((p: any) => {
      return p.employeeName.trim().toLowerCase().includes(searchText);
    });
  }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      employeeName: new FormControl(Validators.required),
      employeeBirthDate: new FormControl(Validators.required),
      employeeAddress: new FormControl(Validators.required),
    });

    this.getAllEmployee();
  }
}
