import { ProjectService } from './../project.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProject } from '../project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  projectList: IProject[] | any = [];
  projectId: number = 0;
  @ViewChild('formCreate') formCreate: NgForm | any;
  @ViewChild('formUpdate') formUpdate: NgForm | any;
  projectName: string = '';
  members: number = 0;
  status: string = '';

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  getOneProject(projectId: number) {
    this.projectService.getOneProject(projectId).subscribe((project: any) => {
      this.projectName = project.projectName;
      this.members = project.members;
      this.status = project.status;
      this.projectId = project.id;
    });
  }

  handleEditProject() {
    this.projectService
      .editProject(this.formUpdate.value, this.projectId)
      .subscribe((project) => {
        this.getAllProjects();
      });
  }

  handleDeleteProject(projectId: number) {
    if (window.confirm('Bạn có muốn xóa dự án này ?')) {
      this.projectService.deleteProject(projectId).subscribe((project) => {
        this.getAllProjects();
      });
    }
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projectList = projects;
      },
      (err) => console.log(err)
    );
  }

  formCreateSubmit() {
    let data = this.formCreate.value;
    data.status = 'Chưa hoàn thành';

    this.projectService.createProject(data).subscribe((projects) => {
      this.getAllProjects();
    });
    this.formCreate.reset();
  }

  ngOnInit(): void {
    this.getAllProjects();
  }
}
