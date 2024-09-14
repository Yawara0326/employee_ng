import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
 
  isAddingTask = false;

  employees = [
    {
      id: '1',
      name: 'Yawara',
      id_number: 'E123456789',
      phone_number:'0912345678',
      email:'123456@gmail.com',
      image_url:'image.png'
    },
    {
      id: '2',
      name: 'Jacky',
      id_number: 'E123434369',
      phone_number:'0938184455',
      email:'97754@gmail.com',
      image_url:''
    },
    {
      id: '3',
      name: 'noriko',
      id_number: 'A947584656',
      phone_number:'0935281666',
      email:'as5868@yahoo.com.tw',
      image_url:'image2.png'
    },
    {
      id: '4',
      name: 'nanako',
      id_number: 'F999584656',
      phone_number:'0935281984',
      email:'nanako7754@gmail.com',
      image_url:'image3.png'
    },
    {
      id: '5',
      name: 'amy',
      id_number: 'S909846563',
      phone_number:'09352854584',
      email:'amy98545@gmail.com',
      image_url:'image4.png'
    },
  ]

  onAddTask(){
    this.isAddingTask = true;
  }

  onCancelAddTask(){
    this.isAddingTask = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
