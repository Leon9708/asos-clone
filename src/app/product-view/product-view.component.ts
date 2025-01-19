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
  sites: any[] = [];
  allowedSites:any[];
  selectedNumber: number = 1;
  prevBrandInfo: any[];
  loading: boolean = false;

  constructor(public apiService: ApiAsosService, private shareData :ShareDataService, private router: Router) { }

  async ngOnInit() {
    this.loading = true
    let brandInfo =  this.shareData.getValueFromBrandInfo()
    this.prevBrandInfo = this.shareData.getPrevBrandInfo();
    if (typeof this.prevBrandInfo === 'undefined' || brandInfo['categoryId'] !== this.prevBrandInfo['categoryId']) {
      this.shareData.setPrevBrandInfo(brandInfo);
      try {
        const products = await this.apiService.fetchProducts(brandInfo['categoryId']).toPromise();
        this.shareData.setBrandData(products);
        console.log(products)
      } catch (error) {
        console.error(error);
      }
    }
    this.shareData.brandData$.subscribe(data => {
      this.brandData = data;
      this.setSites();
      this.loading = false
      console.log(this.brandData)
    });
  }

  
  setSites() {
    const result = this.brandData['itemCount'] / 48;
    let end: number;
    if (Number.isInteger(result)) {
      end = result;
    } else {
      end = Math.ceil(result);
    }
    this.sites = Array.from({length: end},(_, i) => i + 1)
    this.showAllowedSites()
  }

  showAllowedSites(){
    let minSite = this.selectedNumber - 2
    let maxSite = this.selectedNumber + 2
    minSite = minSite <= 0 ? 0 : minSite;
    maxSite = maxSite > this.sites.length ? this.sites.length : maxSite;

    this.allowedSites = this.sites.filter((site) => site >= minSite && site <= maxSite);
  }

  setOffset(number: number): void {
    if(this.selectedNumber !== number){
      let offset = (number - 1) * 48;
      this.selectedNumber = number;
      this.shareData.setOffSet(offset)
      this.apiService.updateProducts()
    }
  }

  removeTags(value: string): number {
    const numberPattern = /[-+]?\d*\.?\d+/;
    const match = value.match(numberPattern); 
    return match ? parseInt(match[0], 10) : 0; 
  }
  
  openDetailView(productId: number, stockPrice: string) {  
    this.shareData.setProduct([]);
    console.log(stockPrice);
    const parsedPrice = this.removeTags(stockPrice); // Convert the string to a number
    this.shareData.setStockPrice(parsedPrice); // Pass the number to setStockPrice
    this.shareData.setProductId(productId);
    this.router.navigateByUrl('detail-view');
  }

  


}

