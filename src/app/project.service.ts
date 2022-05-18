import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProject } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  url = 'http://localhost:3000/projects/';

  constructor(private httpService: HttpClient) {}

  getAllProjects() {
    return this.httpService.get(this.url);
  }

  getOneProject(projectId: number) {
    return this.httpService.get(this.url + projectId);
  }

  deleteProject(projectId: number) {
    return this.httpService.delete(this.url + projectId);
  }

  createProject(data: IProject) {
    return this.httpService.post(this.url, data);
  }

  editProject(data: IProject, projectId: number) {
    return this.httpService.put(this.url + projectId, data);
  }
}
