import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodosComponent} from './components/todos/todos.component';
import { AboutComponent } from './components/pages/about/about.component';
import {NotfoundComponent} from './components/notfound/notfound.component';
import {ContactusComponent} from './components/pages/contactus/contactus.component';
import {LoginComponent} from './components/pages/login/login.component';
import {RegisterComponent} from './components/pages/register/register.component';
import {AuthGuard} from './guard/auth.guard';
import {ProfileComponent} from './components/pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: TodosComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactusComponent },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
