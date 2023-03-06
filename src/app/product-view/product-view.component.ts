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
  brandData: any [] = [];
  brandInfo: any;
  constructor(public apiService: ApiAsosService, private shareData :ShareDataService) { }

 async ngOnInit(): Promise<void> {
    this.brandInfo = this.shareData.brandInfo;
    this.shareData.brandData$.subscribe( (data: any[]) => {
      this.brandData = data
    });
    if (!this.brandData.length) {
        try {
          const products = await this.apiService.fetchProducts(this.brandInfo.categoryId).toPromise();
          this.shareData.setBrandData(products)
          console.log('API call successful',this.brandData);
        } catch (error) {
          console.error(error);
        }
      } 
  }

  closePopUp(){
    this.popUpSort = false
    this.popUpCategory = false;
    this.popUpStyle = false;
  }
}

