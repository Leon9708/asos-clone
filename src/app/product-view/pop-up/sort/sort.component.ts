import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  selectedButton = "What's new";
  @Input() category: any;
  @Output() categoryUpdated = new EventEmitter<any>(); 
  @Output() closePopup = new EventEmitter<any>();
  sortTypes = ["What's new", 'Price high to low', 'Price low to high'];

  constructor(private apiService: ApiAsosService) { }

  ngOnInit(): void {
    const selectedButtonSort = localStorage.getItem('selectedButtonSort');
    if (selectedButtonSort) {
      this.selectedButton = selectedButtonSort;
    }
  }

  changeBackground(sortType: string): void {
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
    localStorage.setItem('sortType', sortParam )
    this.apiService.updateProducts().subscribe(data => {
        this.category = data;
        this.categoryUpdated.emit(this.category) 
        this.closePopup.emit();
        localStorage.setItem('category', JSON.stringify(this.category));
      }, error => {
        console.error(error);
      });
  }
}