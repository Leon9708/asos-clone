import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
popUpSort: boolean = false;
popUpCategory: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
