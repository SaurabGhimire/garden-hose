import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { authGuard, UserRole } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: TodoListComponent, canActivate: [authGuard([UserRole.user, UserRole.admin])] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [authGuard([UserRole.admin])] },
  { path: 'unauthorized', component: NotAuthorizedComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/todos', }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
