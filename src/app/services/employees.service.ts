import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Employee } from '../model/employee.model';
import { Position } from '../model/position.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private http: HttpClient) { }

  list(firstName: string, lastName: string, position: Position, startDate: Date, salary: number, page: number, pageSize: number, field: string): Observable<Employee[]> {
    let params = new HttpParams();
    params = params.append('firstName', firstName);
    params = params.append('lastName', lastName);
    params = params.append('position', position.toString());
    params = params.append('startDate', startDate.toString());
    params = params.append('salary', salary.toString());
    params = params.append('page', page.toString());
    params = params.append('pageSize', pageSize.toString());
    params = params.append('field', field);
    return this.http.get<Employee[]>(`${environment.baseUrl}/employees`, { params });
    //return this.http.get<Employee[]>(`${environment.baseUrl}/employees?firstName=${firstName}&lastName=${lastName}&position=${position}&startDate=${startDate}&salary=${salary}&page=${page}&pageSize=${pageSize}&field=${field}`);
  }

  deleteAll(ids: string[]): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/employees/delete`, ids);
  }

  save(employee: Employee): Observable<void> {
    return this.http.post<void>(`${environment.baseUrl}/employees`, employee);
  }

  update(employee: Employee): Observable<void> {
    return this.http.put<void>(`${environment.baseUrl}/employees/${employee.id}`, employee);
  }


}
