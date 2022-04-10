import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../model/employee.model';
import { ApiResponse } from '../shared/apiresponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  // list(firstName: string, lastName: string, position: string, startDate: Date, salary: number, page: number, pageSize: number, field: string): Observable<Employee[]> {
  //   let params = new HttpParams();
  //   params = params.append('firstName', firstName);
  //   params = params.append('lastName', lastName);
  //   params = params.append('position', "" + position);
  //   params = params.append('startDate', "" + startDate);
  //   params = params.append('salary', "" + salary);
  //   params = params.append('page', page.toString());
  //   params = params.append('pageSize', pageSize.toString());
  //   params = params.append('field', field);
  //   return this.http.get<Employee[]>(`${environment.baseUrl}/employees`, { params });
  //   //return this.http.get<Employee[]>(`${environment.baseUrl}/employees?firstName=${firstName}&lastName=${lastName}&position=${position}&startDate=${startDate}&salary=${salary}&page=${page}&pageSize=${pageSize}&field=${field}`);
  // }

  find(page: number, pageSize: number, field: string): Observable<ApiResponse<Employee>> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('field', field);
    return this.http.get<ApiResponse<Employee>>(`${environment.baseUrl}/employees`, { params });
  }

  filter(firstName: string, lastName: string, position: string, startDate: Date, salary: number): Observable<ApiResponse<Employee>> {
    let params = new HttpParams();
    params = params.append('firstName', firstName);
    params = params.append('lastName', lastName);
    params = params.append('position', "" + position);
    params = params.append('startDate', "" + startDate);
    params = params.append('salary', "" + salary);
    return this.http.get<ApiResponse<Employee>>(`${environment.baseUrl}/employees`, { params });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}/employees/${id}`);
   }

  delete(employee: Employee): Observable<ApiResponse<Employee>> {
    return this.http.delete<ApiResponse<Employee>>(`${environment.baseUrl}/employees/${employee.id}`);
  }

  save(employee: Employee): Observable<ApiResponse<Employee>> {
    return this.http.post<ApiResponse<Employee>>(`${environment.baseUrl}/employees`, employee);
  }

  update(employee: Employee): Observable<ApiResponse<Employee>> {
    return this.http.put<ApiResponse<Employee>>(`${environment.baseUrl}/employees`, employee);
  }


}
