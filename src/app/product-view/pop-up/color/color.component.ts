import { ChangeDetectorRef, Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { ApiAsosService } from 'src/app/service/api-asos.service';
import { ShareDataService } from 'src/app/service/share-data.service';

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
  ngOnChanges(): void {

    const element = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'base_colour');

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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as Element;
    if (!targetElement.closest('#boxColor')) {
      this.popUpColor = false;
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

  filterType(color: any): void {
    debugger;
    this.selectedButton = color.name;
    this.shareData.setFilterColorId(color.id)  
    this.shareData.removeOtherCategories('color');
    this.selectedButtonStatus = true;
    localStorage.setItem('selectedButtonColor', this.selectedButton);
    this.setUpdate();
    this.cdRef.detectChanges();
  } 

  removeType(){
    this.shareData.filterColorId = undefined
    this.selectedButton = '';
    this.setUpdate();
  }
}



