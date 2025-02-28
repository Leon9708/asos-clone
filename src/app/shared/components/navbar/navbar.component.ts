import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../service/share-data.service';
import { Router } from '@angular/router';
import { Brand } from '../../models/item';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  showCart: boolean;
  btnValue: boolean;
  cartValue: boolean;
  cartName: string;
  cartArray: any;
  searchActive: boolean = false;
  keyword: string;
  brandCategories: [];
  allBrands: Brand[] = [];
  shownBrands: Brand[] = [];
  searchActiveDes: boolean = false;
  menuActive: boolean = false;

  constructor(
    private shareData: ShareDataService,
    private router: Router,
  ) {}

   ngOnInit() {
    this.shareData.showCart$.subscribe((value) => (this.showCart = value));
    this.shareData.cartArray$.subscribe(
      (cartArray) => (this.cartArray = cartArray)
    );
   
    this.shareData.brandCategories$.subscribe((data) => {
      this.brandCategories = data;
    });
    this.setAllBrands();
  }

 

  checkCart(element: string) {
    this.cartName = element;
    this.btnValue = false;
    this.cartValue = false;
  }

  hoverPreviewCart(value: boolean) {
    if (value === true) {
      this.shareData.setShowCart(value);
    } else {
      setTimeout(() => {
        this.shareData.setShowCart(value);
      }, 1000);
    }
  }

  openBasket() {
    this.shareData.setShowCart(false);
    this.router.navigateByUrl('cart');
  }

  backtoStart() {
    this.router.navigateByUrl('');
  }

  toBrands(id: string) {
    this.shareData.setGenderId(id);
    this.router.navigateByUrl('brands');
  }
  toSavedItems() {
    this.router.navigateByUrl('savedItems');
  }

  setAllBrands() {
    const genders = ['men', 'women']; 
    const entryNumbers = [0, 2];

    entryNumbers.forEach((index, i) => {
      this.brandCategories['brands'][index]['children'].forEach((child: []) => {
        this.allBrands.push({
          name: child['content']['title'],
          gender: genders[i],
          categoryId: child['link']['categoryId'],
        });
      });
    }); 
  }

  showRelatedBrands() {
    this.keyword.toLowerCase();
    if (this.keyword) {
      const filteredBrands = this.allBrands.filter((brand) => {
        let brandLetters = brand['name'].toLowerCase().slice(0, this.keyword.length); 
        if (brandLetters.includes(this.keyword)) {
          return brand;
        }
      });
      this.shownBrands = filteredBrands.sort(() => Math.random() - 0.5).slice(0, 10);
    } else {
      this.shownBrands = [];
    }
  }

  navigateToBrand(brand: []) {
    delete brand['gender'];
    this.shareData.setBrandInfo(brand);
    this.router.navigateByUrl('product-view');
  }
}
