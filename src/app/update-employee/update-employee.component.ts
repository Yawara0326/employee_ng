import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';
import { EmployeeWithId } from '../employee.model';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  @Output() update = new EventEmitter<EmployeeWithId>();
  @Output() cancel = new EventEmitter<void>();

  selectedFile: File | null = null;

  selectedEmployee: EmployeeWithId = {
    id: '',
    name: '',
    idNumber: '',
    phoneNumber: '',
    email: '',
    imageUrl: ''
  };

  //更新員工資料
  onCancel(){
    this.cancel.emit();
  }

  onSubmit(){
    this.update.emit({
      id:this.selectedEmployee.id,
      name: this.selectedEmployee.name,
      idNumber: this.selectedEmployee.idNumber,
      phoneNumber: this.selectedEmployee.phoneNumber,
      email: this.selectedEmployee.email,
      imageUrl: this.selectedEmployee.imageUrl
    });
  }

  constructor( private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.employeeService.selectedEmployee.subscribe(employee => {
      this.selectedEmployee = employee;
      console.log("接收到的員工資料：",this.selectedEmployee);
    })
  }

  onFileSelected(event: Event):void {
    const input = event.target as HTMLInputElement; // 轉換事件目標為 HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // 取得第一個檔案並儲存
      console.log('選擇的檔案:', this.selectedFile);
    }
  }

  onUpload():void{
    if (this.selectedFile){
      this.employeeService.onUploadPhoto('employee-image',this.selectedEmployee.id,this.selectedFile)
    }else{
      alert('請選擇檔案')
    }

  }

  onDownload():void{
    if(this.selectedEmployee.imageUrl){
      console.log(this.selectedEmployee.imageUrl)
      this.employeeService.onDownloadPhoto('employee-image',this.selectedEmployee.id);
    }
  }

}
