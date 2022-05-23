import { EmployeesService } from './../employees.service';
import { TaskService } from './../task.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ITask } from '../task';
import { IEmployee } from '../employee';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private employeesService: EmployeesService
  ) {}

  taskList: ITask = {};
  employeeList: IEmployee[] = [];
  isNotFound: boolean = false;

  getOneTask() {
    const taskId = this.route.snapshot.params['id'];
    this.taskService.getOneTask(taskId).subscribe(
      (task) => {
        if (task) this.taskList = task;
      },
      (err) => {
        this.isNotFound = true;
      }
    );
  }

  getAllEmployee() {
    this.employeesService.getAllEmployees().subscribe((employees) => {
      this.employeeList = employees;
    });
  }

  ngOnInit(): void {
    this.getOneTask();
    this.getAllEmployee();
  }
}
