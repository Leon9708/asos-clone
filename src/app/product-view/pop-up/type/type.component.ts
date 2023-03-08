import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output,  } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.scss']
})
export class TypeComponent implements OnInit {
  selectedButton = '';
  selectedButtonStatus: boolean;
  filterAvailable:boolean = false;
  popUpType: boolean = false;
  filterArray = [];
  @Input() brandData: any;
  constructor(private apiService: ApiAsosService, private shareData: ShareDataService,private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.shareData.buttonStatus$.subscribe((buttonStatus) => {
      this.selectedButtonStatus = buttonStatus
    });
  }

  ngOnChanges(): void { 
    const element = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'attribute_1047');
    if (element) {
      this.filterAvailable = true;
      for (let i = 0; i < element.facetValues.length; i++) {
        const typeFilter = {
          name: element.facetValues[i].name,
          id: element.facetValues[i].id
        };
        this.filterArray.push(typeFilter);
      }
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('#boxType')) {
      this.popUpType = false;
    }
  }

  setUpdate(){
    this.apiService.updateProducts().subscribe(data => {
      this.shareData.setBrandData(data)
      console.log(data)
    }, error => {
      console.error(error);
    });
  }

  filterType(type: any): void {
    this.selectedButton = type.name;
    this.shareData.setFilterTypeId(type.id)  
    this.shareData.removeOtherCategories('type')
    this.selectedButtonStatus = true
    localStorage.setItem('selectedButtonType', this.selectedButton);
    this.setUpdate();
    this.cdRef.detectChanges();
  } 

  removeType(){
    this.shareData.filterTypeId = undefined
    this.selectedButton = '';
    this.setUpdate();
  }
}

