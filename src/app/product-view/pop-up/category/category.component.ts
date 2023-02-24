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
  CategoryFilterArray = [];

  constructor(private apiService: ApiAsosService) { }

  ngOnInit(): void {
    const selectedButtonCategory = localStorage.getItem('selectedButtonCategory');
    if (selectedButtonCategory) {
      this.selectedButton = selectedButtonCategory;
    }
    for (let i = 0; i < this.category.facets[1].facetValues.length; i++) {
      const categoryFilter = {categoryName : this.category.facets[1].facetValues[i].name, id : this.category.facets[1].facetValues[i].id}
      this.CategoryFilterArray.push(categoryFilter);
    }
  }

  changeBackground(categoryFilter: any): void {
    this.selectedButton = categoryFilter.categoryName;
    localStorage.setItem('selectedButtonCategory', this.selectedButton);
    localStorage.setItem('filteredCategoryId', categoryFilter.id), 
    this.apiService.updateProducts().subscribe(data => {
        this.category = data;
        this.categoryUpdated.emit(data);
        console.log(data)
      }, error => {
        console.error(error);
      });
    
  } 
}