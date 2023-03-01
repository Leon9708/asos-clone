import { Component, Input, OnInit } from '@angular/core';
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
  categoryId: string = '';
  brandData: any [];
  brand: any;
  previousBrandId: string;
  constructor(public apiService: ApiAsosService, private shareData :ShareDataService) { }

  ngOnInit(): void {
    this.shareData.brand$.subscribe(async (brand: { title: string, categoryId: string }) => {
      if (brand.categoryId !== this.previousBrandId) {
        this.brand = brand;
        try { 
          const data = await this.apiService.fetchProducts(this.brand.categoryId).toPromise();
          this.brandData = data;
          this.shareData.setBrandData(this.brandData);
          console.log(this.brandData, 'api');
        } catch (error) {
          console.error(error);
        }
      }
      this.previousBrandId = brand.categoryId;
    });
  }


  onCategoryUpdated(brandData: any) {
    this.shareData.setBrandData(brandData) 
  } 
  closePopUp(){
    this.popUpSort = false
    this.popUpCategory = false;
    this.popUpStyle = false;
  }
}

