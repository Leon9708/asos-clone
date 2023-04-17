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
  sites: any[];
  selectedNumber: number = 1;
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
        this. calculateResult();
      });
        console.log('API call successful',this.brandData);
  } 
  
  calculateResult() {
    const result = this.brandData['itemCount'] / 48;
    const start = 1;
    let end: number;
    if (Number.isInteger(result)) {
      end = result;
    } else {
      end = Math.ceil(result);
    }
    this.sites = Array.from({ length: end }, (_, i) => i + start);
  }

  setOffset(number: number): void {
    let offset = (number - 1) * 48;
    this.selectedNumber = number;
    this.shareData.setOffSet(offset)
    this.setUpdate();
  }

  setUpdate(){
    this.apiService.updateProducts().subscribe(newBrandData => {
     this.shareData.setBrandData(newBrandData)
     console.log(newBrandData)
   }, error => {
     console.error(error);
   });     
 }

  openDetailView(productId: number){  
    this.shareData.setProduct([])
    this.shareData.setProductId(productId)
    this.router.navigateByUrl('detail-view')
  }

  


}

