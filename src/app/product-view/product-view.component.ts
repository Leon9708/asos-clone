import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAsosService } from '../service/api-asos.service';
import { ShareDataService } from '../service/share-data.service';


@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  
  categoryId: string = '';
  brandData: any [] = [];
  brandInfo: any;
  constructor(public apiService: ApiAsosService, private shareData :ShareDataService, private router: Router) { }

 async ngOnInit(): Promise<void> {
    this.brandInfo = this.shareData.brandInfo;
    if (!this.brandData.length) {
        try {
          const products = await this.apiService.fetchProducts(this.brandInfo.categoryId).toPromise();
          this.shareData.setBrandData(products)
        } catch (error) {
          console.error(error);
        }
      } 
      this.shareData.brandData$.subscribe( (data: any[]) => {
        this.brandData = data
      });
        console.log('API call successful',this.brandData);
        debugger;
  }     

  openDetailView(productId: number){
    debugger;
    this.shareData.setProductId(productId)
    this.router.navigateByUrl('detailView')
  }

}

