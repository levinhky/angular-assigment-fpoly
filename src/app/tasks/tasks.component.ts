import { NgForm } from '@angular/forms';
import { EmployeesService } from './../employees.service';
import { TaskService } from './../task.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('formCreate') formCreate: NgForm | any;

  taskList: ITask[] = [];
  employeeList: IEmployee[] = [];
  priorityList = [
    {
      id: 1,
      name: 'Cao',
    },
    {
      id: 2,
      name: 'Trung Bình',
    },
    {
      id: 3,
      name: 'Thấp',
    },
  ];
  statusList = [
    {
      id: 1,
      name: 'Chưa hoàn thành',
    },
    {
      id: 2,
      name: 'Đã hoàn thành',
    },
  ];

  task = <ITask>{};
  taskId: number = 0;

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

  getOneTask(taskId: number | any) {
    this.taskService.getOneTask(taskId).subscribe((task) => {
      this.task = task;
      this.taskId = +task.id!;
    });
  }

  handleDeleteTask(taskId: number | any) {
    this.taskService.deleteTask(taskId).subscribe((t) => {
      this.getTaskByProjectId();
    });
    console.log(taskId);
  }

  handleEditTask() {
    this.taskService.editTask(this.task, this.taskId).subscribe((t) => {
      this.getTaskByProjectId();
    });
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
    this.formCreate.reset();
  }

  ngOnInit(): void {
    this.getTaskByProjectId();
    this.getAllEmployee();
  }
}
