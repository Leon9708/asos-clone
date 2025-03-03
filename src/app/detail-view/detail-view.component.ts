import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../shared/service/share-data.service';
import { productDetails } from '../shared/models/item';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'hidden',
        style({
          opacity: 0,
          top: '-20px',
        })
      ),
      state(
        'visible',
        style({
          opacity: 1,
          top: '50%',
        })
      ),
      state(
        'fadeOut',
        style({
          opacity: 0,
          top: '50%',
        })
      ),
      transition(
        'visible => hidden',
        animate('0.5s cubic-bezier(0.4, 0, 0.2, 1)')
      ),
      transition(
        'hidden => visible',
        animate('0.5s cubic-bezier(0.4, 0, 0.2, 1)')
      ),
      transition(
        'visible => fadeOut',
        animate('0.5s 7.5s cubic-bezier(0.4, 0, 0.2, 1)')
      ),
    ]),
  ],
})
export class DetailViewComponent implements OnInit {
  product: [] = [];
  popUpSize: boolean = false;
  currentImageIndex: number;
  selectedSize: string;
  selectedPopup: string;
  choosenSize: boolean;
  addToCart: boolean = false;
  isButtonDisabled: boolean = false;
  liked: boolean = false;
  dataLoaded: boolean = false;
  stockPrice: number;
  productDescription: SafeHtml;

  constructor(
    private shareData: ShareDataService,
    private sanitizer: DomSanitizer,
    
  ) {}

  async ngOnInit(): Promise<void> {
    this.product = this.shareData.getProduct();
    this.stockPrice = this.shareData.getStockPrice();
    localStorage.setItem('stockPrice', JSON.stringify(this.stockPrice));
   
    this.showSize();
    this.formatDescription();
    this.checkLikedArray();

    this.dataLoaded = true;
  }

  formatDescription() {
    this.productDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.removeTagsDescription(this.product['brand']['description'])
    );
  }

  removeTagsDescription(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }

  showSize() {
    if (this.product['variants'].length <= 1) {
      this.selectedSize = this.product['variants'][0]['brandSize'];
    }
  }

  changeImage(imageIndex: number) {
    this.currentImageIndex = imageIndex;
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src =
      'http://images.' +
      this.product['media']['images'][imageIndex].url.slice(7);
  }

  swipeImgLeft() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    } else {
      this.currentImageIndex = this.product['media']['images'].length - 1;
    }
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src =
      'http://images.' +
      this.product['media']['images'][this.currentImageIndex].url.slice(7);
  }
  swipeImgRight() {
    if (this.currentImageIndex < this.product['media']['images'].length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
    const mainImage = document.getElementById('mainImg') as HTMLImageElement;
    mainImage.src =
      'http://images.' +
      this.product['media']['images'][this.currentImageIndex].url.slice(7);
  }

  onSizeButtonClick(size: string) {
    this.choosenSize = false;
    this.selectedSize = size;
  }

  showAndCloseDetails(detailsName: string) {
    if (this.selectedPopup === detailsName) {
      this.selectedPopup = '';
    } else {
      this.selectedPopup = detailsName;
      this.navigateToDetails(detailsName);
    }
  }

  navigateToDetails(detailsName: string) {
    setTimeout(() => { {
      const element = document.getElementById(detailsName);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }}, 20);
  }

  addAnimationCart() {
    this.addToCart = true;
    this.isButtonDisabled = true;
    setTimeout(() => {
      this.isButtonDisabled = false;
      this.shareData.showCart(true);
    }, 1000);
    setTimeout(() => {
      this.addToCart = false;
      this.shareData.showCart(false);
    }, 7500);
  }

  checkValueBuy() {
    if (!this.selectedSize) {
      this.choosenSize = true;
    } else {
      this.addAnimationCart();
      this.createAndSetProductDetails("basket");
    }
  }

  checkLikedArray() {
    const likedItems = this.shareData.getLikedArray();
    this.liked = !!likedItems.find((item) => item.id === this.product['id']);
  }

  checkValueLike() {
    if (this.liked) {
      this.liked = false;
      this.shareData.deleteLikedItem(this.product);
    } else {
      if (this.selectedSize) {
        this.liked = true;
        this.createAndSetProductDetails("liked");
      } else {
        this.choosenSize = true;
      }
    }
  }

  createAndSetProductDetails(value: string) {
    let productDetails: productDetails ={
      id: this.product['id'],
      name: this.product['name'],
      color: this.product['variants'][0]['colour'],
      size: this.selectedSize, 
      sizeOptions: this.product['variants'],
      img: this.product['media']['images'][0]['url'].slice(7),
      price: this.stockPrice,
      qty: 1,
      currentPrice: this.stockPrice,
      editQty: false,
      editSize: false,
    };

    if (value === "liked") {
      this.shareData.addTolikedArray(productDetails);
    }else{
      this.shareData.addToCartArray(productDetails);
    }
  }
}
