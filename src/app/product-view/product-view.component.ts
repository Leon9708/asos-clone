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
  brandInfo: any;
  constructor(public apiService: ApiAsosService, private shareData :ShareDataService) { }

  ngOnInit(): void {
    debugger;
    this.brandInfo = this.shareData.brandInfo;
    this.shareData.brandData$.subscribe(async (data: any[]) => {
      if (!data || JSON.stringify(this.brandData) !== JSON.stringify(data)) {
        try {
          const products = await this.apiService.fetchProducts(this.brandInfo.categoryId).toPromise();
          this.brandData = products;
          this.shareData.setBrandData(products);
          console.log('API call successful');
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Data not changed');
      }
    });
  }


  closePopUp(){
    this.popUpSort = false
    this.popUpCategory = false;
    this.popUpStyle = false;
  }
}

