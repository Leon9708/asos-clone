import { Component, Input, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
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
  sortTypes = ["What's new", 'Price high to low', 'Price low to high'];
  popUpSort: boolean = false;

  constructor(private apiService: ApiAsosService, private shareData: ShareDataService) { }

  ngOnInit(): void {
    const selectedButtonSort = localStorage.getItem('selectedButtonSort');
    if (selectedButtonSort) {
      this.selectedButton = selectedButtonSort;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('#boxSort')) {
      this.popUpSort = false;
    }
  }

  filterSort(sortType: string): void {
    this.selectedButton = sortType;
    this.popUpSort = false
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
    this.shareData.setFilterSort(sort); 
    this.apiService.updateProducts().subscribe(data => {
        this.shareData.setBrandData(data)
   
      }, error => {
        console.error(error);
      });
  }
}