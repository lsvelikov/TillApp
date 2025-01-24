import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TablesComponent } from './tables/tables.component';
import { NumberInputComponent } from './number-input/number-input.component';

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
        path: 'login/input',
        component: NumberInputComponent,
    }
];
