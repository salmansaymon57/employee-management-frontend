import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-data',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './employee-data.html',
  styleUrl: './employee-data.scss'
})
export class EmployeeData implements OnInit {
  @ViewChild('empModal') empModal : ElementRef | undefined;
  employeeList: any[] = [];
  employeeobj: any = {
    employeeId: 0,
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    city: '',
    address: ''
  };
  isEditMode: boolean = false;

  http = inject(HttpClient);

  ngOnInit() {
    this.getallEmployee();
  }

  getallEmployee() {
    this.http.get(`https://salmansaymon-001-site1.qtempurl.com/api/Employeemaster`).subscribe({
      next: (res: any) => {
        this.employeeList = res;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        alert('Failed to load employees.');
      }
    });
  }

  saveEmployee() {
    if (this.isEditMode) {
      this.updateEmployee();
    } else {
      // Create a new object without employeeId for POST
      const { employeeId, ...employeeData } = this.employeeobj;
      this.http.post(`https://salmansaymon-001-site1.qtempurl.com/api/Employeemaster`, employeeData)
        .subscribe({
          next: (res: any) => {
            this.getallEmployee();
            this.resetForm();
            alert('Employee saved successfully!');
          },
          error: (err) => {
            console.error('Error saving employee:', err);
            alert('Failed to save employee. Please check the input data.');
          }
        });
    }
  }

  editEmployee(employee: any) {
    this.employeeobj = { ...employee };
    this.isEditMode = true;
    const formTitle = document.getElementById('form-title');
    if (formTitle) {
      formTitle.innerText = 'Edit Employee';
    }
  }

  updateEmployee() {
    this.http.put(`https://salmansaymon-001-site1.qtempurl.com/api/Employeemaster/${this.employeeobj.employeeId}`, this.employeeobj)
      .subscribe({
        next: (res: any) => {
          this.getallEmployee();
          this.resetForm();
          this.isEditMode = false;
          alert('Employee updated successfully!');
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Failed to update employee.');
        }
      });
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.http.delete(`https://salmansaymon-001-site1.qtempurl.com/api/Employeemaster/${employeeId}`)
        .subscribe({
          next: () => {
            this.getallEmployee();
            this.resetForm();
            alert('Employee deleted successfully!');
          },
          error: (err) => {
            console.error('Error deleting employee:', err);
            alert('Failed to delete employee.');
          }
        });
    }
  }

  resetForm() {
    this.employeeobj = {
      employeeId: 0,
      firstName: '',
      lastName: '',
      email: '',
      contactNo: '',
      city: '',
      address: ''
    };
    this.isEditMode = false;
    const formTitle = document.getElementById('form-title');
    if (formTitle) {
      formTitle.innerText = 'Add Employee';
    }
  }

  openModal(){
    if(this.empModal){
      this.empModal.nativeElement.style.display = 'block';

    }

  }

  



}
