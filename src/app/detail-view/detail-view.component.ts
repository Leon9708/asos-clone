import { Component, OnInit } from '@angular/core';
import { ApiAsosService } from '../service/api-asos.service';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  product: any[];
  popUpSize: boolean = false;
  currentImageIndex: number;
  selectedSize: string;
  productInfo: any[] = ['Product Details','Brand','Size and Fit', 'About Me']
  selectedPopup:string;
  rotatedBack: boolean;
  rotated: boolean;
  constructor(private shareData: ShareDataService, private apiService: ApiAsosService ) { }

  async ngOnInit(): Promise<void> {
   let productData = localStorage.getItem('productData');
    if (!productData) {
      const data = await this.apiService.getProduct().toPromise();
      this.product = data;
      localStorage.setItem('productData', JSON.stringify(this.product));
    } else {
      this.product= JSON.parse(productData);
    }
    console.log('product', this.product);
  }

  changeImage(imageIndex: number) {
    this.currentImageIndex = imageIndex;
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src = 'http://images.' + this.product['media']['images'][imageIndex].url.slice(7);
  }

  onLeftArrowClick() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.product['media']['images'].length - 1;
    }
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src = 'http://images.' + this.product['media']['images'][this.currentImageIndex].url.slice(7);
  }
  onRightArrowClick() {
    if (this.currentImageIndex < this.product['media']['images'].length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src = 'http://images.' + this.product['media']['images'][this.currentImageIndex].url.slice(7);
  }

  onSizeButtonClick(size: string) {
    this.selectedSize = size;
  }

  turnImg(buttonName: string) {
    if (this.selectedPopup === buttonName) {
      this.selectedPopup = '';
    } else {
      this.selectedPopup = buttonName;
    }
  }
}
