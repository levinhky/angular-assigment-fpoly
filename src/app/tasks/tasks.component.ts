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

  taskList: ITask[] = [];
  employeeList: IEmployee[] = [];
  task = <ITask>{};

  getTaskByProjectId() {
    const projectId = +this.route.snapshot.params['id'];
    this.taskService.getTaskByProjectId(projectId).subscribe(
      (tasks) => {
        this.taskList = tasks;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllEmployee() {
    this.employeesService.getAllEmployees().subscribe((employees) => {
      this.employeeList = employees;
    });
  }

  formCreateSubmit() {
    const projectId = this.route.snapshot.params['id'];
    this.task.projectId = +projectId;
    this.task.taskStatus = 'Chưa hoàn thành';
    this.taskService.createTask(this.task).subscribe((t) => {
      this.getTaskByProjectId();
    });
  }

  ngOnInit(): void {
    this.getTaskByProjectId();
    this.getAllEmployee();
  }
}
