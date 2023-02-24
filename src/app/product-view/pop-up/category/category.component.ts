import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  selectedButton = '';
/*   @Input() category: any;
  @Output() categoryUpdated = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<void>(); */
  sortCategory = ["What's new", 'Price high to low', 'Price low to high'];

  constructor(private apiService: ApiAsosService) { }

  ngOnInit(): void {
  }

 /*  changeBackground(sortCategory: string): void {
    this.closePopup.emit();
    this.selectedButton = sortCategory;
    let sortParam: string;
    switch(sortCategory) {
      case "What's new":
        sortParam = 'freshness';
        break;
      case 'Price high to low':
        sortParam = 'pricedesc';
        break;
      case 'Price low to high':
        sortParam = 'priceasc';
        break;
    }

    if (sortParam) {
      this.apiService.updateProducts(sortParam).subscribe(data => {
        this.category = data;
        this.categoryUpdated.emit(data);
     
        console.log(data)
      }, error => {
        console.error(error);
      });
    }
  } */
}