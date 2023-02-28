import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {
  selectedButton = '';
  @Input() category: any;
  @Output() categoryUpdated = new EventEmitter<any>();
  @Output() closePopup = new EventEmitter<any>()
  StyleFilterArray = [];

  constructor(private apiService: ApiAsosService) { }

  ngOnInit(): void {
    const selectedButtonStyle = localStorage.getItem('selectedButtonStyle');
    if (selectedButtonStyle) {
      this.selectedButton = selectedButtonStyle;
    }
  
    const element = this.category.facets.find((facet: { id: string; }) => facet.id === 'attribute_1046');

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

  changeBackground(styleFilter: any): void {
    debugger;
    this.selectedButton = styleFilter.styleName;
    localStorage.setItem('selectedButtonStyle', this.selectedButton);
    localStorage.setItem('styleId', styleFilter.id), 
    this.setUpdate();
    
  } 

  setUpdate(){
    this.apiService.updateProducts().subscribe(data => {
      this.category = data;
      this.categoryUpdated.emit(data);
      this.closePopup.emit();
      console.log(data)
    }, error => {
      console.error(error);
    });
  }
  removeStyle(){
    localStorage.removeItem('styleId');
    localStorage.removeItem('selectedButtonStyle');
    this.setUpdate();
  }
}