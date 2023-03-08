import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  selectedButton = '';
  @Input() brandData: any;
  @Output() closePopup = new EventEmitter<any>()
  filterArray = [];

  constructor(private apiService: ApiAsosService, private shareData: ShareDataService) { }

  ngOnInit(): void {
    const selectedButtonType = localStorage.getItem('selectedButtonType');
    if (selectedButtonType) {
      this.selectedButton = selectedButtonType;
    }
  
    const element = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'attribute_1047');

    if (element) {
      for (let i = 0; i < element.facetValues.length; i++) {
        const typeFilter = {
          name: element.facetValues[i].name,
          id: element.facetValues[i].id
        };
        this.filterArray.push(typeFilter);
      }
    }
  }

  setUpdate(){
    this.apiService.updateProducts().subscribe(data => {
      this.shareData.setBrandData(data)
      this.closePopup.emit();
      console.log(data)
    }, error => {
      console.error(error);
    });
  }

  filterType(type: any): void {
    debugger;
    this.selectedButton = type.name;
    this.shareData.setFilterTypeId(type.id)  
    this.shareData.removeOtherCategories('type')
    localStorage.clear();
    localStorage.setItem('selectedButtonType', this.selectedButton);
    this.setUpdate();
  } 

  removeType(){
    this.shareData.filterTypeId = undefined
    localStorage.removeItem('selectedButtonType');
    this.setUpdate();
  }
}

