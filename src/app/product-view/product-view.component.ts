import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAsosService } from '../shared/service/api-asos.service';
import { ShareDataService } from '../shared/service/share-data.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  
  brandData: {};
  sites: number[] = [];
  allowedSites: number[];
  selectedNumber: number = 1;
  loading: boolean = false;
  products: [];

  constructor(public apiService: ApiAsosService, private shareData :ShareDataService, private router: Router) { }

  async ngOnInit(){
    this.loading = true;
    
    this.shareData.brandData$.subscribe(data => {
      this.brandData = data;
      this.setSites();
      this.loading = false
    }); 
 
  }

  ngOnDestroy(): void {
    this.shareData.setBrandData([]);
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
      this.apiService.updateBrandData()
      this.loading = true
    }
  }

  removeTags(value: string): number {
    const numberPattern = /[-+]?\d*\.?\d+/;
    const match = value.match(numberPattern); 
    return match ? parseInt(match[0], 10) : 0; 
  }
  
  openDetailView(productId: number, stockPrice: string) {  
    this.shareData.setProduct([]);
    const parsedPrice = this.removeTags(stockPrice); 
    this.shareData.setStockPrice(parsedPrice); 
    this.apiService.fetchProduct(productId)
    this.router.navigateByUrl('detail-view');
  }
}

