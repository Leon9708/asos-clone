import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../service/share-data.service';
import { Router } from '@angular/router';
import {  brandDetails } from '../../models/item';
import { ApiAsosService } from '../../service/api-asos.service';

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
  allBrands: brandDetails[] = [];
  shownBrands: brandDetails[] = [];
  searchActiveDes: boolean = false;
  menuActive: boolean = false;
  loading: boolean = false;

  constructor(
    private shareData: ShareDataService,
    private router: Router,
    private apiService: ApiAsosService
  ) {}

  ngOnInit() {
    this.shareData.showCart$.subscribe((value) => (this.showCart = value));
    this.shareData.cartArray$.subscribe((cartArray) => (this.cartArray = cartArray));
  
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
      this.shareData.showCart(value);
    } else {
      setTimeout(() => {
        this.shareData.showCart(value);
      }, 1000);
    }
  }

  openBasket() {
    this.shareData.showCart(false);
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
      this.brandCategories['brands'][index]['children'].forEach((brand: brandDetails[]) => {
        this.allBrands.push({
          name: brand['content']['title'],
          gender: genders[i],
          id: brand['link']['categoryId'],
        });
      });
    }); 
  }

  showRelatedBrands() {
    this.keyword.toLowerCase();
    if (this.keyword) {
      const filteredBrands = this.allBrands.filter((brand) =>
        brand.name.toLowerCase().startsWith(this.keyword)
      );
      this.shownBrands = filteredBrands.sort(() => Math.random() - 0.5).slice(0, 10);
    } else {
      this.shownBrands = [];
    }
  }

  async navigateToBrand(brand: brandDetails) {
    this.keyword = '';
    this.shownBrands = [];
    delete brand['gender'];
    this.shareData.setBrandInfo(brand);
    this.loading = true;
    await this.apiService.fetchBrandData();
    this.loading = false;
    this.router.navigateByUrl('product-view');
  }
}
