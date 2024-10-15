import { EmployeeServiceService } from './../employee-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';  // 引入 HttpClient
import { EmployeeWithId, EmployeeWithoutId } from '../employee.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  //控制跳窗顯示
  isCreatingEmployee = false;
  isSearchingEmployee = false;
  url = "http://localhost:8080/Employee";
  employees: EmployeeWithId[] = [];

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeServiceService
  ) {}

  //新增員工資料
  onCreateEmployee(){
    this.isCreatingEmployee = true;
  }

  onCancelCreate(){
    this.isCreatingEmployee = false;
  }

  onSubmitCreate(employeeData: EmployeeWithoutId){
    //關閉新增員工的dialog
    this.isCreatingEmployee = false;

    //新增員工
    this.employeeService.onSubmitCreate(employeeData)
    };

  //查詢員工資料
  onSearchEmployee(){
    this.isSearchingEmployee = true;
  }

  onCancelSearch(){
    this.isSearchingEmployee = false;
  }

  onSubmitSearch(employeeData: EmployeeWithoutId){

    //關閉查詢員工資料的dialog
    this.isSearchingEmployee = false;

    //查詢員工資料
    this.employeeService.onSubmitSearch(employeeData)
  }

  //員工資料列表
  onGetEmployees(){
    this.employeeService.getEmployees();
    this.employeeService.updateSearchedEmployee(null);
    this.employeeService.updateEmployee(this.employees);
  }

  ngOnInit(): void {
    this.employeeService.currentEmployees.subscribe(employees =>
      this.employees = employees
    )
 }

}
