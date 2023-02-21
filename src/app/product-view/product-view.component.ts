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
  constructor(private apiService: ApiAsosService, private dataService :ShareDataService) { }
  categoryId: string = '';
  category: any [];

  async ngOnInit() {
    const categoryData = localStorage.getItem('category');
    if (categoryData) {
      this.category = JSON.parse(categoryData);
    } else {
      try {
        this.categoryId = this.dataService.brand['categoryId'].toString()
        const data = await this.apiService.fetchProducts(this.categoryId).toPromise();
        this.category = data;
        localStorage.setItem('category', JSON.stringify(this.category));
      } catch (error) {
        console.error(error);
      }
    }
    console.log(this.category)
  }
}
