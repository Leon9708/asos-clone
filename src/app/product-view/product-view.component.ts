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
  sites: any[] = [];
  allowedSites:any[];
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
        this.setSites();
      });
        console.log('API call successful',this.brandData);
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

  openDetailView(productId: number){  
    this.shareData.setProduct([])
    this.shareData.setProductId(productId)
    this.router.navigateByUrl('detail-view')
  }

  


}

