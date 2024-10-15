import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  @Output() create = new EventEmitter<{name: string, idNumber: string, phoneNumber: string, email: string,}>();
  @Output() cancel = new EventEmitter<void>();

  enteredName='';
  enteredIdNumber='';
  enteredPhoneNumber='';
  enteredEmail='';

  constructor() { }

  onCancelCreate(){
    this.cancel.emit();
  }

  onSubmit(){
    this.create.emit({
      name: this.enteredName,
      idNumber: this.enteredIdNumber,
      phoneNumber: this.enteredPhoneNumber,
      email: this.enteredEmail
    });
  }


  ngOnInit(): void {
  }

}
