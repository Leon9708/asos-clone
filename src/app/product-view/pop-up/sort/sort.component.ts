import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  selectedButton = '';
  @Input() category: any;
  @Output() categoryChange = new EventEmitter<any>();
/*   @Output() categoryUpdated = new EventEmitter<any>(); */
  @Output() closePopup = new EventEmitter<void>();
  sortTypes = ["What's new", 'Price high to low', 'Price low to high'];

  constructor(private apiService: ApiAsosService) { }

  ngOnInit(): void {
  }

  changeBackground(sortType: string): void {
    this.closePopup.emit();
    this.selectedButton = sortType;
    let sortParam: string;
    switch(sortType) {
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
     /*    this.categoryUpdated.emit(this.category) */
        localStorage.setItem('category', JSON.stringify(this.category));
      }, error => {
        console.error(error);
      });
    }
  }
}