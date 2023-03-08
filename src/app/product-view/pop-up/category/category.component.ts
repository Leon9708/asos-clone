  import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
  import { ApiAsosService } from 'src/app/service/api-asos.service';
  import { ShareDataService } from 'src/app/service/share-data.service';

  @Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
  })
  export class CategoryComponent implements OnInit {
    selectedButton = '';
    @Input() brandData: any;
    @Output() closePopup = new EventEmitter<any>()
    @Output() hidecategory = new EventEmitter <any>()
    CategoryFilterArray = [];

    constructor(private apiService: ApiAsosService, private shareData: ShareDataService) { }

    ngOnInit(): void {
      const selectedButtonCategory = localStorage.getItem('selectedButtonCategory');
      if (selectedButtonCategory) {
        this.selectedButton = selectedButtonCategory;
      }
      const category = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'attribute_10992');
      debugger;
      if (category) {
        for (let i = 0; i < category.facetValues.length; i++) {
          const categoryfilter = {
            categoryName: category.facetValues[i].name,
            id: category.facetValues[i].id
          };
          this.CategoryFilterArray.push(categoryfilter);
        }
      }else{
        this.shareData.hideCategory('category')
      }

     
    }

    setUpdate(){
       this.apiService.updateProducts().subscribe(newBrandData => {
        this.shareData.setBrandData(newBrandData)
        this.closePopup.emit();
        console.log(newBrandData)
      }, error => {
        console.error(error);
      });     
    }

    filterCategory(categoryFilter: any): void {
      debugger;
      this.selectedButton = categoryFilter.categoryName;
      this.shareData.setFilterCategoryId(categoryFilter.id);
      this.shareData.removeOtherCategories('category')
      localStorage.clear();
      localStorage.setItem('selectedButtonCategory', this.selectedButton);
      this.setUpdate()   
    } 


    removeCategory(){
      this.shareData.filterCategoryId = undefined
      localStorage.removeItem('selectedButtonCategory');
      this.setUpdate()
    }
  }