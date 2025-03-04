import { style } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef, HostListener  } from '@angular/core';
import { ApiAsosService } from 'src/app/shared/service/api-asos.service';
import { ShareDataService } from 'src/app/shared/service/share-data.service';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit  {
  selectedButton = '';
  selectedButtonStatus: boolean;
  @Input() brandData: any;
  popUpStyle: boolean = false
  filterArray = [];
  filterAvailable: boolean = false;


  constructor(private apiService: ApiAsosService, private shareData: ShareDataService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.shareData.buttonStatus$.subscribe((buttonStatus) => {
      this.selectedButtonStatus = buttonStatus
    });
  }

  ngOnChanges(): void {
    this.filterArray = [];
    if (this.brandData && this.brandData.facets) {
      const element = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'attribute_1046');

      if (element) {
        this.filterAvailable = true;
        for (let i = 0; i < element.facetValues.length; i++) {
          const styleFilter = {
            styleName: element.facetValues[i].name,
            id: element.facetValues[i].id
          };
          this.filterArray.push(styleFilter);
        }
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('#boxStyle')) {
      this.popUpStyle = false;
    }
  }


  filterStyle(styleFilter: any): void {
    this.popUpStyle = false;
    this.selectedButton = styleFilter.styleName;
    this.shareData.setFilterStyleId(styleFilter.id)  
    this.shareData.removeOtherCategories('style'); 
    this.shareData.setOffSet(0)
    this.selectedButtonStatus = true
    localStorage.setItem('selectedButtonStyle', this.selectedButton);
    this.apiService.updateBrandData()
    this.cdRef.detectChanges();
  } 

  removeStyle(){
    this.shareData.filterStyleId = undefined
    this.selectedButton = '';
    this.popUpStyle = false;
    this.apiService.updateBrandData();
  }
}