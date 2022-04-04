import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeDeleteComponent } from './components/employee-delete/employee-delete.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';
import { AngularDateHttpInterceptor } from './shared/interceptor/date.interceptor';
import { ControlMessages } from './shared/control-messages/control.messages';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeFormComponent,
    EmployeeDeleteComponent,
    ControlMessages
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataTablesModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AngularDateHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
