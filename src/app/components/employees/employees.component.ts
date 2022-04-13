import { Component, OnInit} from '@angular/core';
import { Observable} from 'rxjs';
import { Employee } from '../../model/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { ApiResponse } from 'src/app/shared/apiresponse';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowDownAZ, faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {


  employees: Observable<ApiResponse<Employee>>;
  empDetail: FormGroup;
  empObj: Employee = new Employee();
  empList : Employee[] = [];
  page: number = 0;
  pageSize: number = 5;
  field: string = 'id';
  employeeSize: number;
  firstName : string = "";
  lastName : string = "";
  position: string = "";
  salary : number;
  startDate : string = "";
  faArrow = faArrowDownAZ;

  constructor(private employeeService: EmployeesService, private formBuilder : FormBuilder) {
   }

  ngOnInit(): void {
    this.getEmployees();
    // this.employees.subscribe(res => {
    //   console.log(res);
    // });
    this.empDetail = this.formBuilder.group({
      id : [''],
      firstName : [''],
      lastName: [''],
      position: [''],
      startDate: [''],
      salary: ['']
    });   
  }

  getEmployees() {
    this.employees = this.employeeService.find(this.page, this.pageSize, this.field)
    console.log(this.field);
    console.log(this.page);
    console.log(this.pageSize)
  }

  getEmployeesf(page: number = this.page): void {
      this.employees = this.employeeService.findf(page, this.pageSize, this.field, this.firstName);
  }

  getEmployeesl(page: number = this.page): void {
    this.employees = this.employeeService.findl(page, this.pageSize, this.field, this.lastName);
}

getEmployeesp(page: number = this.page): void {
  this.employees = this.employeeService.findp(page, this.pageSize, this.field, this.position);
}
  
getEmployeess(page: number = this.page): void {
  this.employees = this.employeeService.finds(page, this.pageSize, this.field, this.salary);
}

getEmployeest(page: number = this.page): void {
  this.employees = this.employeeService.findt(page, this.pageSize, this.field, this.startDate);
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

  onChangeFieldp(field : string) {
    console.log(this.page)
    this.employees = this.employeeService.find(this.page-1, this.pageSize, 'position')
    this.employeeService.find(this.page-1, this.pageSize, 'position').subscribe(res=>{
      console.log(res);
      console.log(field);
      console.log(this.page);
      console.log(this.pageSize);
    },err=>{
      console.log(err);
    });

  }

  onChangeFieldf(field : string) {
    console.log(this.page)
    this.employees = this.employeeService.find(this.page-1, this.pageSize, 'firstName')
    this.employeeService.find(this.page-1, this.pageSize, 'firstName').subscribe(res=>{
      console.log(res);
      console.log(field);
      console.log(this.page);
      console.log(this.pageSize);
    },err=>{
      console.log(err);
    });

  }

  onChangeFieldl(field : string) {
    console.log(this.page)
    this.employees = this.employeeService.find(this.page-1, this.pageSize, 'lastName')
    this.employeeService.find(this.page-1, this.pageSize, 'lastName').subscribe(res=>{
      console.log(res);
      console.log(field);
      console.log(this.page);
      console.log(this.pageSize);
    },err=>{
      console.log(err);
    });

  }

  onChangeFieldt(field : string) {
    console.log(this.page)
    this.employees = this.employeeService.find(this.page-1, this.pageSize, 'startDate')
    this.employeeService.find(this.page-1, this.pageSize, 'startDate').subscribe(res=>{
      console.log(res);
      console.log(field);
      console.log(this.page);
      console.log(this.pageSize);
    },err=>{
      console.log(err);
    });

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

  ngOnChanges(changes: any) {
    console.log(changes.myInput.currentValue);
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
