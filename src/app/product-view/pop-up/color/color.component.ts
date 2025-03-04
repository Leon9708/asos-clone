import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ApiAsosService } from 'src/app/shared/service/api-asos.service';
import { ShareDataService } from 'src/app/shared/service/share-data.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit  {
  selectedButton = '';
  selectedButtonStatus: boolean;
  @Input() brandData: any;
  popUpColor: boolean = false;
  filterArray = [];
  filterAvailable:boolean = false;


  constructor(private apiService: ApiAsosService, private shareData: ShareDataService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.shareData.buttonStatus$.subscribe((buttonStatus) => {
      this.selectedButtonStatus = buttonStatus
    });
  }
  ngOnChanges(): void{
    this.filterArray = [];
    if (this.brandData && this.brandData.facets) {
      const element = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'base_colour')
      if (element) {
        this.filterAvailable = true;
        for (let i = 0; i < element.facetValues.length; i++) {
          const colorFilter = {
            name: element.facetValues[i].name,
            id: element.facetValues[i].id
          };
          this.filterArray.push(colorFilter);
        }
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('#boxColor')) {
      this.popUpColor = false;
    }
  }



  filterType(color: any): void {
    this.popUpColor = false
    this.selectedButton = color.name;
    this.shareData.setFilterColorId(color.id)  
    this.shareData.removeOtherCategories('color');
    this.shareData.setOffSet(0)
    this.selectedButtonStatus = true;
    localStorage.setItem('selectedButtonColor', this.selectedButton);
    this.apiService.updateBrandData()
    this.cdRef.detectChanges();
  } 

  removeType(){
    this.shareData.filterColorId = undefined
    this.selectedButton = '';
    this.popUpColor = false
    this.apiService.updateBrandData()
  }
}



