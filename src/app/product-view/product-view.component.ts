import { Component, OnInit } from '@angular/core';
import { ApiAsosService } from '../service/api-asos.service';
import { ShareDataService } from '../service/share-data.service';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  popUpSort: boolean = false;
  popUpCategory: boolean = false;
  popUpStyle:boolean = false
  constructor(public apiService: ApiAsosService, private dataService :ShareDataService) { }
  categoryId: string = '';
  category: any [];

  async ngOnInit() {
    const categoryData = localStorage.getItem('category');
    if (categoryData) {
      this.category = JSON.parse(categoryData);
      console.log(this.category,'local')
    } else {
      try {
        this.categoryId = this.dataService.brand['categoryId'].toString()
        const data = await this.apiService.fetchProducts().toPromise();
        this.category = data;
        localStorage.setItem('category', JSON.stringify(this.category));
        console.log(this.category, 'api')
      } catch (error) {
        console.error(error);
      }
    }
  }
   onCategoryUpdated(category: any) {
    this.category = category
  } 
  closePopUp(){
    this.popUpSort = false
    this.popUpCategory = false;
    this.popUpStyle = false;
  }
}

