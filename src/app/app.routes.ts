import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'employee-data',
    loadComponent: () => import('./employee-data/employee-data').then(c => c.EmployeeData)
}
];
