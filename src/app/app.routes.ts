import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TablesComponent } from './tables/tables.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TableComponent } from './tables/table/table.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
    },
    {
        path: 'tables',
        component: TablesComponent,
        title: 'Tables',
    },
    {
        path: 'table',
        component: TableComponent,
        title: 'Table'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'NotFound',
    },
];
