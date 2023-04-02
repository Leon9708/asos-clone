import { Component, OnInit } from '@angular/core';
import { ApiAsosService } from '../service/api-asos.service';
import { ShareDataService } from '../service/share-data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('hidden', style({
        opacity: 0,
        top: '-20px'
      })),
      state('visible', style({
        opacity: 1,
        top: "50%"
      })),
      state('fadeOut', style({
        opacity: 0,
        top: "50%"
      })),
      transition('visible => hidden', animate('0.5s cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('hidden => visible', animate('0.5s cubic-bezier(0.4, 0, 0.2, 1)')),
      transition('visible => fadeOut', animate('0.5s 7.5s cubic-bezier(0.4, 0, 0.2, 1)')),
    ])
  ]

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
  chooseSize: boolean;
  addToCart: boolean = false
  isButtonDisabled: boolean = false

  constructor(private shareData: ShareDataService, private apiService: ApiAsosService, private router: Router ) { }

  async ngOnInit(): Promise<void> {
    let productData = localStorage.getItem('productData');
    if (!productData) {
 /*    this.shareData.product$.subscribe((data: any[]) => {
      this.product = data;
    }); */   const data = await this.apiService.getProduct().toPromise();
    localStorage.setItem('productData', JSON.stringify(this.product));
  /*     this.shareData.setProduct(data); */
 /*    if (!this.product.length) {
   
    } */
    }else {
      this.product= JSON.parse(productData);
    }
    if (this.product['variants'].length <= 1) {
      this.selectedSize = this.product['variants'][0]['brandSize'];
    }
    console.log('product', this.product);
  }

  changeImage(imageIndex: number) {
    this.currentImageIndex = imageIndex;
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src = 'http://images.' + this.product['media']['images'][imageIndex].url.slice(7);
  }

  swipeImgLeft() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.product['media']['images'].length - 1;
    }
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src = 'http://images.' + this.product['media']['images'][this.currentImageIndex].url.slice(7);
  }
  swipeImgRight() {
    if (this.currentImageIndex < this.product['media']['images'].length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src = 'http://images.' + this.product['media']['images'][this.currentImageIndex].url.slice(7);
  }

  onSizeButtonClick(size: string) {
    this.chooseSize = false;
    this.selectedSize = size;
  }

  turnImg(buttonName: string) {
    if (this.selectedPopup === buttonName) {
      this.selectedPopup = '';
    } else {
      this.selectedPopup = buttonName;
    }
  }

  checkValue(){
    if(!this.selectedSize){
      this.chooseSize = true;
    }else{
      this.boughtAnimation()
      this.toBasket()
    }
  }

  boughtAnimation() {
    this.addToCart = true;
    this.isButtonDisabled = true;

    setTimeout(() => {
      this.isButtonDisabled = false;
    }, 1000);
    setTimeout(() => {
      this.addToCart = false;
    }, 7500);
    setTimeout(() => {
      this.shareData.setShowCart(true)
    }, 1000);
    setTimeout(() => {
      this.shareData.setShowCart(false)
    }, 7500);
  }




  toBasket(){
    let productDetails = {
      id: this.product['id'],
      name: this.product['name'],
      color: this.product['variants'][0]['colour'],
      size: this.selectedSize,
      img: this.product['media']['images'][0]['url'].slice(7),
      price: this.product['price']['current']['text'],
      qty: 1
    }
    console.log(productDetails,'productDetails')
    this.shareData.addToCartArray(productDetails);
  }

 

  
}
