import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  selectedButton = '';
  @Input() brandData: any;
  @Output() closePopup = new EventEmitter<any>()
  filterArray = [];

  constructor(private apiService: ApiAsosService, private shareData: ShareDataService) { }

  ngOnInit(): void {
    const selectedButtonColor = localStorage.getItem('selectedButtonColor');
    if (selectedButtonColor) {
      this.selectedButton = selectedButtonColor;
    }
  
    const element = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'base_colour');

    if (element) {
      for (let i = 0; i < element.facetValues.length; i++) {
        const colorFilter = {
          name: element.facetValues[i].name,
          id: element.facetValues[i].id
        };
        this.filterArray.push(colorFilter);
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

  filterType(color: any): void {
    debugger;
    this.selectedButton = color.name;
    this.shareData.setFilterColorId(color.id)  
    this.shareData.removeOtherCategories('color');
    localStorage.clear();
    localStorage.setItem('selectedButtonColor', this.selectedButton);
    this.setUpdate();
  } 

  removeType(){
    this.shareData.filterColorId = undefined
    localStorage.removeItem('selectedButtonColor');
    this.setUpdate();
  }
}



