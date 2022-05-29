import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  url = 'https://json-api-public.herokuapp.com/api/projects/';

  constructor(private httpService: HttpClient) {}

  getAllProjects(): Observable<IProject[]> {
    return this.httpService.get<IProject[]>(this.url);
  }

  getOneProject(projectId: number): Observable<IProject> {
    return this.httpService.get<IProject>(this.url + projectId);
  }

  deleteProject(projectId: number): Observable<IProject> {
    return this.httpService.delete<IProject>(this.url + projectId);
  }

  createProject(data: IProject): Observable<IProject> {
    return this.httpService.post<IProject>(this.url, data);
  }

  editProject(data: IProject, projectId: number): Observable<IProject> {
    return this.httpService.put<IProject>(this.url + projectId, data);
  }
}
