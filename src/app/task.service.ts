import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITask } from './task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  url = 'https://json-api-public.herokuapp.com/api/tasks/';

  constructor(private httpService: HttpClient) {}

  getAllTasks(): Observable<ITask[]> {
    return this.httpService.get<ITask[]>(this.url);
  }

  getOneTask(taskId: number): Observable<ITask> {
    return this.httpService.get<ITask>(this.url + taskId);
  }

  getTaskByProjectId(projectId: number): Observable<ITask[]> {
    return this.httpService.get<ITask[]>(`${this.url}?projectId=${projectId}`);
  }

  deleteTask(taskId: number): Observable<ITask> {
    return this.httpService.delete<ITask>(this.url + taskId);
  }

  createTask(data: ITask): Observable<ITask> {
    return this.httpService.post<ITask>(this.url, data);
  }

  editTask(data: ITask, taskId: number): Observable<ITask> {
    return this.httpService.put<ITask>(this.url + taskId, data);
  }
}
