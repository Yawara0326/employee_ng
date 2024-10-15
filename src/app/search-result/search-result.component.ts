import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { EmployeeWithId, EmployeeWithoutId } from '../employee.model';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private employeeService: EmployeeServiceService
  ) { }

  url = 'http://localhost:8080/Employee';
  employees: EmployeeWithId[] = [];
  searchedEmployees:EmployeeWithId[] = [];

  //更新員工資料
  isUpdatetingEmployee = false;
  isSearchResult = false;
  updateEmployeeId!:string;
  selectedEmployee?:EmployeeWithId;

  onUpdateEmployee(employeeId: string){
    this.isUpdatetingEmployee=true;
    this.updateEmployeeId = employeeId;
    this.selectedEmployee  = this.employees.find((employee) => employee.id == employeeId)
    if (this.selectedEmployee) {
      this.employeeService.updateSelectedEmployee(this.selectedEmployee);
    } else {
      console.error('找不到該員工');
    }
  }

  onCancelUpdate(){
    this.isUpdatetingEmployee = false;
  }

  onSubmitUpdate(employeeData: EmployeeWithId){
    this.isUpdatetingEmployee = false;
    this.employeeService.onSubmitUpdate(employeeData);
  }

  onConfirmDelete(employeeId: string){
    this.employeeService.onConfirmDelete(employeeId)
    // this.searchedEmployees = this.searchedEmployees.filter(employees => employees.id !== employeeId);
  }

  ngOnInit(): void {
    //載入網頁時取得所有員工資料
    this.employeeService.getEmployees();
    // 持續訂閱所有員工資料
    this.employeeService.currentEmployees.subscribe(currentEmployees => {
      this.employees = currentEmployees;
      console.log("所有員工列表",currentEmployees);
    })

    //訂閱searchResult，一開始沒有查詢動作會回傳null
    //searchedEmployees=null時就會隱藏搜尋結果的html，只顯示所有員工列表的結果
    this.employeeService.searchResult.subscribe(employees => {
      this.searchedEmployees = employees;
      console.log("搜尋到的員工列表",this.searchedEmployees);
    })
  }
}
