import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';
import { ShareDataService } from 'src/app/service/share-data.service';


@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  selectedButton = "What's new";
  @Input() brandData: any;
  @Output() closePopup = new EventEmitter<any>();
  sortTypes = ["What's new", 'Price high to low', 'Price low to high'];

  constructor(private apiService: ApiAsosService, private shareData: ShareDataService) { }

  ngOnInit(): void {
    const selectedButtonSort = localStorage.getItem('selectedButtonSort');
    if (selectedButtonSort) {
      this.selectedButton = selectedButtonSort;
    }
  }

  filterSort(sortType: string): void {
    this.selectedButton = sortType;
    localStorage.setItem('selectedButtonSort',sortType)
    let sort: string;
    switch(sortType) {
      case "What's new":
        sort = 'freshness';
        break;
      case 'Price high to low':
        sort = 'pricedesc';
        break;
      case 'Price low to high':
        sort = 'priceasc';
        break;
    }
    this.shareData.filterSort = sort
    this.apiService.updateProducts().subscribe(data => {
        this.shareData.setBrandData(data)
        this.closePopup.emit();
      }, error => {
        console.error(error);
      });
  }
}