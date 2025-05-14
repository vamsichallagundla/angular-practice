import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  studentArray = [
    { id: 3, name: 'three' },
    { id: 1, name: 'one' },
    { id: 6, name: 'six' },
    { id: 2, name: 'two' },
    { id: 4, name: 'four' }
  ];
  
  constructor(private router: Router) {
    
    // this.sortedArray();
  }

  // sortedArray() {
  //   let names =[];
  //   this.sortedArray.forEach((obj) => {

  //   })
  // }

}
