  import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectorRef, HostListener } from '@angular/core';
  import { ApiAsosService } from 'src/app/shared/service/api-asos.service';
  import { ShareDataService } from 'src/app/shared/service/share-data.service';

  @Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
  })
  export class CategoryComponent implements OnInit  {
    selectedButton = '';
    selectedButtonStatus: boolean = true;
    @Input() brandData: any;
    filterAvailable:boolean = false;
    filterArray = [];
    popUpCategory: boolean = false;

    constructor(private apiService: ApiAsosService, private shareData: ShareDataService, private cdRef: ChangeDetectorRef) { }

    ngOnInit(): void {
      this.shareData.buttonStatus$.subscribe((buttonStatus) => {
        this.selectedButtonStatus = buttonStatus
      });
    }
    ngOnChanges(): void {
      this.filterArray = [];
      if (this.brandData && this.brandData.facets) {
        const category = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'attribute_10992');
        if (category) {
          this.filterAvailable = true;
          for (let i = 0; i < category.facetValues.length; i++) {
            const categoryfilter = {
              categoryName: category.facetValues[i].name,
              id: category.facetValues[i].id
            };
            this.filterArray.push(categoryfilter);
          }
        }
      }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
      const targetElement = event.target as Element;
      if (!targetElement.closest('#boxCategory')) {
        this.popUpCategory = false;
      }
    }


    filterCategory(categoryFilter: any): void {
      this.popUpCategory = false;
      this.selectedButton = categoryFilter.categoryName;
      this.shareData.setFilterCategoryId(categoryFilter.id);
      this.shareData.removeOtherCategories('category')
      this.shareData.setOffSet(0)
      this.selectedButtonStatus = true;
      localStorage.setItem('selectedButtonCategory', this.selectedButton); 
      this.apiService.updateBrandData();
      this.cdRef.detectChanges();
    } 


    removeCategory(){
      this.shareData.filterCategoryId = undefined
      this.selectedButton = '';
      this.popUpCategory = false;
      this.apiService.updateBrandData();
    }
  }