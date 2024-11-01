import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @Output() create = new EventEmitter<{name: string, idNumber: string, phoneNumber: string, email: string}>();
  @Output() cancel = new EventEmitter<void>();

  selectedFile: File | null = null;
  enteredName='';
  enteredIdNumber='';
  enteredPhoneNumber='';
  enteredEmail='';

  constructor(private employeeService: EmployeeServiceService) { }

  onCancelCreate(){
    this.cancel.emit();
  }

  onSubmit(){
    this.create.emit({
      name: this.enteredName,
      idNumber: this.enteredIdNumber,
      phoneNumber: this.enteredPhoneNumber,
      email: this.enteredEmail,
    });
  }


  ngOnInit(): void {
  }

  onFileSelected(event: Event):void {
    const input = event.target as HTMLInputElement; // 轉換事件目標為 HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // 取得第一個檔案並儲存
      console.log('選擇的檔案:', this.selectedFile);
    }
  }

  onUpload():void{

  }

  onDownload():void{

  }

}
