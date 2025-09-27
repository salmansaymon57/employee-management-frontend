import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeData } from './employee-data/employee-data';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EmployeeData],
  template: `
    
    <app-employee-data></app-employee-data>

    <router-outlet />

    
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('employee-management');
}
