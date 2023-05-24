import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveProjectComponent } from './active-project/active-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { CompletedProjectComponent } from './completed-project/completed-project.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
// import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'home' , component:HomeComponent},
  { path: 'addproject', component:AddProjectComponent},
  { path: 'active', component: ActiveProjectComponent },
  { path :'completed' , component: CompletedProjectComponent},
  { path:'login' , component:LoginComponent}
  // { path:'signin' , component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
