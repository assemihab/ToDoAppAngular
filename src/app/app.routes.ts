import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { authGuard } from './core/auth.guard';
export const routes: Routes = [
    
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginPageComponent,

    },

    {
        path: 'tasks',
        loadComponent: () => import('./tasks-columns/tasks-columns.component').then((mod => mod.TasksColumnsComponent)),
        canActivate: [authGuard]

    },
];
