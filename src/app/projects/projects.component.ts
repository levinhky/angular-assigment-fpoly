import { ProjectService } from './../project.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { IProject } from '../project';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent implements OnInit {
  @ViewChild('formCreate') formCreate: NgForm | any;
  @ViewChild('formUpdate') formUpdate: NgForm | any;

  projectList: IProject[] | any = [];
  newProjectList: IProject[] | any = [];

  projectId: number = 0;

  searchText: string = '';

  project = <IProject>{};

  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private auth: AuthService
  ) {}

  logged() {
    return this.auth.checkLogin();
  }

  getOneProject(projectId: number) {
    this.projectService.getOneProject(projectId).subscribe((project: any) => {
      this.project = project;
      this.projectId = project.id;
    });
  }

  handleEditProject() {
    this.projectService
      .editProject(this.formUpdate.value, this.projectId)
      .subscribe((p) => {
        this.getAllProjects();
      });
  }

  handleDeleteProject(projectId: number) {
    if (window.confirm('Bạn có muốn xóa dự án này ?')) {
      this.projectService.deleteProject(projectId).subscribe((p) => {
        this.getAllProjects();
      });
    }
  }

  getAllProjects() {
    this.projectService.getAllProjects().subscribe(
      (projects) => {
        this.projectList = projects;
        this.newProjectList = projects;
        this.isLoading = false;
      },
      (err) => console.log(err)
    );
  }

  // Add new project
  formCreateSubmit() {
    this.project.status = 'Chưa hoàn thành';

    this.projectService.createProject(this.project).subscribe((p) => {
      this.getAllProjects();
    });
    this.formCreate.reset();
  }

  handleSearchProject() {
    const searchText = this.searchText.trim().toLowerCase();
    this.projectList = this.newProjectList.filter((p: any) => {
      return p.projectName.trim().toLowerCase().includes(searchText);
    });
  }

  ngOnInit(): void {
    this.getAllProjects();
  }
}
