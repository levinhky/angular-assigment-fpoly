import { TasksComponent } from './tasks/tasks.component';
import { EmployeesComponent } from './employees/employees.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IntroduceComponent } from './introduce/introduce.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProjectsComponent } from './projects/projects.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'projects',
    component: ProjectsComponent,
    children: [
      { path: 'create', component: ProjectsComponent },
      { path: 'edit/:id', component: ProjectsComponent },
      { path: 'delete', component: ProjectsComponent },
    ],
  },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeesComponent,
    children: [
      { path: 'create', component: EmployeesComponent },
      { path: 'edit/:id', component: EmployeesComponent },
      { path: 'delete', component: EmployeesComponent },
    ],
  },
  { path: 'tasks', component: TasksComponent },
  { path: 'tasks/:id', component: TasksComponent },
  { path: 'introduce', component: IntroduceComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
