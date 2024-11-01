import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeWithId, EmployeeWithoutId } from './employee.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';  // 導入 environment

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

  constructor(
    private http: HttpClient,
  ) { }

  private apiUrl = environment.apiUrl;

  //BehaviorSubject用來保存員工數據
  private employeesSource = new BehaviorSubject<any>(null);
  private employeeSource = new BehaviorSubject<any>(null);
  private searchedEmployee = new BehaviorSubject<any>(null);

  //http url
  // private url = 'http://localhost:8080/Employee';
  employees: EmployeeWithId[] = [];

  //可觀察對象 Observable
  //當前總員工列表
  currentEmployees = this.employeesSource.asObservable();
  //當前被選擇的員工
  selectedEmployee = this.employeeSource.asObservable();
  //根據搜尋結果回傳的員工列表
  searchResult = this.searchedEmployee.asObservable();

  //更新可觀察對象的方法
  //更新所有員工列表
  updateEmployee(employees: EmployeeWithId[]) {
    this.employeesSource.next(employees)
  }

  //更新被選擇的員工
  updateSelectedEmployee(employee: EmployeeWithId) {
    this.employeeSource.next(employee)
  }

  //更新員工搜尋結果
  updateSearchedEmployee(employees: any) {
    this.searchedEmployee.next(employees)
  }

  //新增員工資料
  onSubmitCreate(employeeData: EmployeeWithoutId) {
    // 發送 HTTP POST 請求到後端 API，createEmployee
    this.http.post(this.apiUrl, employeeData).subscribe({
      next: (response) => {
        console.log('新增成功:', response);

        //取得新增員工過後的員工列表並在service統一更新
        this.getEmployees();
      },
      error: (err) => {
        console.error('新增失敗:', err);
      }
    });
  }

  //取得所有員工的資料
  getEmployees() {
    this.http.get<EmployeeWithId[]>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('成功取得員工資料:', data);
        this.updateEmployee(data);
      },
      error: (err) => {
        console.error('取得員工資料失敗:', err);
      },
    });
  }

  //取得查詢員工資料
  onSubmitSearch(employeeData: EmployeeWithoutId) {
    // 使用 HttpParams 構建查詢參數
    let params = new HttpParams();
    if (employeeData.name) {
      params = params.append('name', employeeData.name);
    }
    if (employeeData.idNumber) {
      params = params.append('idNumber', employeeData.idNumber);
    }
    if (employeeData.phoneNumber) {
      params = params.append('phoneNumber', employeeData.phoneNumber);
    }
    if (employeeData.email) {
      params = params.append('email', employeeData.email);
    }

    this.http.get<EmployeeWithId[]>(this.apiUrl, { params }).subscribe({
      next: (data) => {
        this.updateSearchedEmployee(data);
        console.log('成功取得員工資料:', data);
      },
      error: (err) => {
        console.error('取得員工資料失敗:', err);
      },
    });
  }

  //更新員工資料
  onSubmitUpdate(employeeData: EmployeeWithId) {
    const url = `${this.apiUrl}/${employeeData.id}`;  // 完整的 API URL

    this.http.put(url, employeeData).subscribe({
      next: (response) => {
        console.log('更新成功:', response);
      },
      error: (err) => {
        console.error('更新失敗:', err);
      }
    });
  }

  //刪除員工資料
  onConfirmDelete(employeeId: string) {
    const confirmed = confirm('確定要刪除這項資料嗎？');

    if (confirmed) {
      const url = `${this.apiUrl}/${employeeId}`;  // 構建完整的 URL，例如 /api/employees/1

      // 發出 DELETE 請求
      this.http.delete(url).subscribe({
        next: (response) => {
          console.log('刪除成功:', response);
          this.getEmployees();
        },
        error: (err) => {
          console.error('刪除失敗:', err);
        },
        complete: () => {
          console.log('請求完成');
        }
      });
    } else {
      console.log('刪除操作已取消');
    }
  }

  onUploadPhoto(loc: string, id: string, file: File) {
    const url = `${this.apiUrl}/${loc}/${id}/photo`; // 組合 API 路徑

    const formData = new FormData();
    formData.append('image', file); // 上傳檔案

    // 發出 PUT 請求
    this.http.put<EmployeeWithId>(url, formData).subscribe({
      next: (response) => {
        this.updateSelectedEmployee(response);
        console.log('上傳成功:', response);
        console.log(this.employeeSource)
      },
      error: (err) => {
        console.error('上傳失敗:', err);
      },
      complete: () => {
        console.log('上傳請求已完成');
        alert('上傳成功')
      },
    });
  }

  onDownloadPhoto(loc: string, id: string) {
    const url = `${this.apiUrl}/${loc}/${id}/photo`; // 組合 API 路徑

    // 發出 PUT 請求
    this.http.get(url).subscribe({
      next: (response) => {
        console.log('下載成功:', response);
      },
      error: (err) => {
        console.error('下載失敗:', err);
      },
      complete: () => {
        console.log('下載完成');
        alert('下載完成')
      },
    });
  }
}


