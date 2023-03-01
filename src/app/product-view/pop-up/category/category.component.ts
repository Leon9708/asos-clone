  import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
  import { ApiAsosService } from 'src/app/service/api-asos.service';

  @Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
  })
  export class CategoryComponent implements OnInit {
    selectedButton = '';
    @Input() brandData: any;
    @Output() categoryUpdated = new EventEmitter<any>();
    @Output() closePopup = new EventEmitter<any>()
    CategoryFilterArray = [];

    constructor(private apiService: ApiAsosService) { }

    ngOnInit(): void {
      const selectedButtonCategory = localStorage.getItem('selectedButtonCategory');
      if (selectedButtonCategory) {
        this.selectedButton = selectedButtonCategory;
      }
      const category = this.brandData.facets.find((facet: { id: string; }) => facet.id === 'attribute_10992');

      if (category) {
        for (let i = 0; i < category.facetValues.length; i++) {
          const categoryfilter = {
            categoryName: category.facetValues[i].name,
            id: category.facetValues[i].id
          };
          this.CategoryFilterArray.push(categoryfilter);
        }
      }
    }

    filterCategory(categoryFilter: any): void {
      this.selectedButton = categoryFilter.categoryName;
      localStorage.setItem('selectedButtonCategory', this.selectedButton);
      localStorage.setItem('filteredCategoryId', categoryFilter.id), 
      this.setUpdate()   
    } 

     setUpdate(){
      this.apiService.updateProducts().subscribe(data => {
        this.brandData = data;
        this.categoryUpdated.emit(this.brandData);
        this.closePopup.emit(null);
        console.log(data)
      }, error => {
        console.error(error);
    });
    
    }
    removeCategory(){
      localStorage.removeItem('filteredCategoryId');
      localStorage.removeItem('selectedButtonCategory');
      this.setUpdate();
    }
  }