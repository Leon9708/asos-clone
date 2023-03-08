import { style } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {
  selectedButton = '';
  @Input() brandData: any;
  @Output() closePopup = new EventEmitter<any>()
  StyleFilterArray = [];

  constructor(private apiService: ApiAsosService, private shareData: ShareDataService) { }

  ngOnInit(): void {
    const selectedButtonStyle = localStorage.getItem('selectedButtonStyle');
    if (selectedButtonStyle) {
      this.selectedButton = selectedButtonStyle;
    }
  
    const element = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'attribute_1046');

    if (element) {
      for (let i = 0; i < element.facetValues.length; i++) {
        const styleFilter = {
          styleName: element.facetValues[i].name,
          id: element.facetValues[i].id
        };
        this.StyleFilterArray.push(styleFilter);
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

  filterStyle(styleFilter: any): void {
    this.selectedButton = styleFilter.styleName;
    this.shareData.setFilterStyleId(styleFilter.id)  
    this.shareData.removeOtherCategories('style');
    localStorage.clear();
    localStorage.setItem('selectedButtonStyle', this.selectedButton);
    this.setUpdate();
  } 

  removeStyle(){
    this.shareData.filterStyleId = undefined
    localStorage.removeItem('selectedButtonStyle');
    this.setUpdate();
  }
}