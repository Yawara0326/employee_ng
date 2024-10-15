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

  selectedEmployee: EmployeeWithId = {
    id: '',
    name: '',
    idNumber: '',
    phoneNumber: '',
    email: ''
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
      email: this.selectedEmployee.email
    });
  }

  constructor( private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.employeeService.selectedEmployee.subscribe(employee => {
      this.selectedEmployee = employee;
      console.log("接收到的員工資料：",this.selectedEmployee);
    })
  }

}
