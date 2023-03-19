import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss']
})

export class ProductdetailsComponent implements OnInit {
@Input() product: any;
  constructor() { }

  ngOnInit(): void {
  }

}
