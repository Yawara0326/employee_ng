import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EmployeeWithId, EmployeeWithoutId } from '../employee.model';

@Component({
  selector: 'app-search-employee',
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {

  @Output() cancel  = new EventEmitter<void>();
  @Output() search  = new EventEmitter<EmployeeWithoutId>();

  enteredName='';
  enteredIdNumber='';
  enteredPhoneNumber='';
  enteredEmail='';

  onSubmit(){
    this.search.emit({
      name: this.enteredName,
      idNumber: this.enteredIdNumber,
      phoneNumber: this.enteredPhoneNumber,
      email: this.enteredEmail
    });
  }

  onCancel(){
    this.cancel.emit();
  }
  constructor() { }

  ngOnInit(): void {
  }

}
