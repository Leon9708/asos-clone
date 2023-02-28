  import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
  import { ApiAsosService } from 'src/app/service/api-asos.service';

  @Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
  })
  export class CategoryComponent implements OnInit {
    selectedButton = '';
    @Input() category: any;
    @Output() categoryUpdated = new EventEmitter<any>();
    @Output() closePopup = new EventEmitter<any>()
    CategoryFilterArray = [];

    constructor(private apiService: ApiAsosService) { }

    ngOnInit(): void {
      const selectedButtonCategory = localStorage.getItem('selectedButtonCategory');
      if (selectedButtonCategory) {
        this.selectedButton = selectedButtonCategory;
      }
      const element = this.category.facets.find((facet: { id: string; }) => facet.id === 'attribute_10992');

      if (element) {
        for (let i = 0; i < element.facetValues.length; i++) {
          const categoryfilter = {
            categoryName: element.facetValues[i].name,
            id: element.facetValues[i].id
          };
          this.CategoryFilterArray.push(categoryfilter);
        }
      }
    }

    changeBackground(categoryFilter: any): void {
      this.selectedButton = categoryFilter.categoryName;
      localStorage.setItem('selectedButtonCategory', this.selectedButton);
      localStorage.setItem('filteredCategoryId', categoryFilter.id), 
      this.setUpdate()   
    } 

     setUpdate(){
      this.apiService.updateProducts().subscribe(data => {
        this.category = data;
        this.categoryUpdated.emit(data);
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