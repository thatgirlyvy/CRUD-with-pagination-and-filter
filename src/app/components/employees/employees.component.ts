import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs';
import { Employee } from '../../model/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { ApiResponse } from 'src/app/shared/apiresponse';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Position2LabelMapping } from 'src/app/model/position.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  public Position2LabelMapping = Position2LabelMapping;

  employees: Observable<ApiResponse<Employee>>;
  empDetail: FormGroup;
  empObj: Employee = new Employee();
  empList : Employee[] = [];
  page: number = 0;
  pageSize: number = 10;
  field: string = 'firstName';
  employeeSize: number;
  

  constructor(private employeeService: EmployeesService, private formBuilder : FormBuilder) {
   }

  ngOnInit(): void {
    this.getEmployees();
    
    this.empDetail = this.formBuilder.group({
      id : [''],
      firstName : [''],
      lastName: [''],
      position: [''],
      startDate: [''],
      salary: ['']
    });   
  }

  getEmployees(): void {
      this.employees = this.employeeService.find(this.page, this.pageSize, this.field);
  }
  
  onPageChange(page: number): void { 
    this.employees = this.employeeService.find(page-1, this.pageSize, this.field);
  }

  onSizeChange(pageSize: number): void {
    this.employees = this.employeeService.find(this.page, pageSize, this.field);
    console.log(pageSize);
  }

  addEmployee() {
    console.log(this.empDetail);
    this.empObj.id = this.empDetail.value.id;
    this.empObj.firstName = this.empDetail.value.firstName;
    this.empObj.lastName = this.empDetail.value.lastName;
    this.empObj.position = this.empDetail.value.position;
    this.empObj.startDate = this.empDetail.value.startDate;
    this.empObj.salary = this.empDetail.value.salary;

    this.employeeService.save(this.empObj).subscribe(res=>{
        console.log(res);
        this.getEmployees();
    },err=>{
        console.log(err);
    });

  }

  editEmployee(emp : Employee) {
    this.empDetail.controls['id'].setValue(emp.id);
    this.empDetail.controls['firstName'].setValue(emp.firstName);
    this.empDetail.controls['lastName'].setValue(emp.lastName);
    this.empDetail.controls['position'].setValue(emp.position);
    this.empDetail.controls['startDate'].setValue(emp.startDate);
    this.empDetail.controls['salary'].setValue(emp.salary);

  }

  updateEmployee() {

    this.empObj.id = this.empDetail.value.id;
    this.empObj.firstName = this.empDetail.value.firstName;
    this.empObj.lastName = this.empDetail.value.lastName;
    this.empObj.position = this.empDetail.value.position;
    this.empObj.startDate = this.empDetail.value.startDate;
    this.empObj.salary = this.empDetail.value.salary;

    this.employeeService.update(this.empObj).subscribe(res=>{
      console.log(res);
      this.getEmployees();
    },err=>{
      console.log(err);
    })

  }

  deleteEmployee(emp : Employee) {

    this.employeeService.delete(emp).subscribe(res=>{
      console.log(res);
      alert('Employee deleted successfully');
      this.getEmployees();
    },err => {
      console.log(err);
    });

  }

}
