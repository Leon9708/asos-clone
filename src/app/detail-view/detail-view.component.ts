import { Component, OnInit } from '@angular/core';
import { ApiAsosService } from '../service/api-asos.service';
import { ShareDataService } from '../service/share-data.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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
  productDescription: SafeHtml;
  liked: boolean = false
  dataLoaded: boolean = false;
  constructor(private shareData: ShareDataService, private apiService: ApiAsosService, private router: Router, private sanitizer: DomSanitizer ) { }

  async ngOnInit(): Promise<void> { 
    this.product = this.shareData.getProduct()
    if (this.product.length === 0) {
      this.product = await this.apiService.getProduct().toPromise();
      this.shareData.setProduct(this.product)
    }
    this.showSize()
    this.formatDescription()
    this.checkLikedArray()
    this.dataLoaded = true
  }

  formatDescription(){
    this.productDescription = this.sanitizer.bypassSecurityTrustHtml(this.removeTags(this.product['brand'].description));
  }

  removeTags(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }

  showSize(){
    if (this.product['variants'].length <= 1) {
      this.selectedSize = this.product['variants'][0]['brandSize'];
    }
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

  checkValueBuy(){
    if(!this.selectedSize){
      this.chooseSize = true;
    }else{
      this.addAnimation()
      this.toBasket()
    }
  }

  addAnimation() {
    this.addToCart = true;
    this.isButtonDisabled = true;
    setTimeout(() => {
      this.isButtonDisabled = false;
      this.shareData.setShowCart(true)
    }, 1000);
    setTimeout(() => {
      this.addToCart = false;
      this.shareData.setShowCart(false)
    }, 7500);
  }

  toBasket(){
    let productDetails = {
      id: this.product['id'],
      name: this.product['name'],
      color: this.product['variants'][0]['colour'],
      size: this.selectedSize,
      sizeOptions: this.product['variants'],
      img: this.product['media']['images'][0]['url'].slice(7),
      price: this.product['price']['current']['value'],
      qty: 1,
      currentPrice: this.product['price']['current']['value'],
      editQty: false,
      editSize: false
    }
    this.shareData.addToCartArray(productDetails);
  }

  checkLikedArray(){
    const likedItems = this.shareData.getLikedArrayValue()
    this.liked = !!likedItems.find(item => item.id === this.product['id']);
  }

  checkValueLike(){
    if(this.liked){
      this.liked = false;
      this.shareData.deleteLikedItem(this.product);
    }else{
      if(this.selectedSize){
        this.liked = true
        this.toLikedItems()
      }else{
        this.chooseSize = true;
      }
    }
  }

  toLikedItems(){
    let productDetails = {
      id: this.product['id'],
      name: this.product['name'],
      color: this.product['variants'][0]['colour'],
      size: this.selectedSize,
      sizeOptions: this.product['variants'],
      img: this.product['media']['images'][0]['url'].slice(7),
      price: this.product['price']['current']['value'],
      qty: 1,
      currentPrice: this.product['price']['current']['value'],
      editQty: false,
      editSize: false
    }
    this.shareData.addTolikedArray(productDetails);
  }



  
}
