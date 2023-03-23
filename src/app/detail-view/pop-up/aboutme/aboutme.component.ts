import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.scss'], 
 
})
export class AboutmeComponent implements OnInit {
  @Input() product:any;
  constructor() { }

  ngOnInit(): void {
   
  }

}
