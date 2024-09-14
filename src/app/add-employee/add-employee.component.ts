import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  
  @Output() add = new EventEmitter<{name: string, idNumber: string, phoneNumber: string, Email: string,}>();
  @Output() cancel = new EventEmitter<void>();

  enteredName='';
  enteredIdNumber='';
  enteredPhoneNumber='';
  enteredEmail='';

  constructor() { }

  onCancelAddEmployee(){

  }

  onSubmit(){
    
  }

  ngOnInit(): void {
  }

}
