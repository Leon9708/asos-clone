import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../service/share-data.service';
import { Router } from '@angular/router';
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
  categories: any[];
  allBrands: any[] = [];
  relatedItems: any[] = [];
  searchActiveDes: boolean = false;
  menuActive: boolean = false;

  constructor(
    private shareData: ShareDataService,
    private router: Router,
    private apiService: ApiAsosService
  ) {}

  async ngOnInit(): Promise<void> {
    this.shareData.showCart$.subscribe((value) => (this.showCart = value));
    this.shareData.cartArray$.subscribe(
      (cartArray) => (this.cartArray = cartArray)
    );
    await this.loadBrands();
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

  async loadBrands() {
    this.shareData.categories$.subscribe((data) => {
      this.categories = data;
    });
    if (this.categories.length === 0) {
      try {
        this.categories = await this.apiService.fetchCategories().toPromise();
        this.shareData.setCategories(this.categories);
      } catch (error) {
        console.error(error);
      }
    }
  }

  setAllBrands() {
    for (let i = 0; i < this.categories['brands'][0]['children'].length; i++) {
      const menBrand = {
        name: this.categories['brands'][0]['children'][i]['content']['title'],
        gender: 'men',
        categoryId:
          this.categories['brands'][0]['children'][i]['link']['categoryId'],
      };
      this.allBrands.push(menBrand);
    }
    for (let i = 0; i < this.categories['brands'][2]['children'].length; i++) {
      const womenBrand = {
        name: this.categories['brands'][2]['children'][i]['content']['title'],
        gender: 'women',
        categoryId:
          this.categories['brands'][2]['children'][i]['link']['categoryId'],
      };
      this.allBrands.push(womenBrand);
    }
  }

  showRelatedBrands() {
    this.keyword.toLowerCase();
    if (this.keyword) {
      const relatedItems = this.allBrands.filter((brand) => {
        let brandLowerCase = brand['name'].toLowerCase();
        if (brandLowerCase.includes(this.keyword)) {
          return brand;
        }
      });
      const randomizedItems = relatedItems.sort(() => Math.random() - 0.5);
      this.relatedItems = randomizedItems.slice(0, 10);
    } else {
      this.relatedItems = [];
    }
  }
  navigateToBrand(brand: any[]) {
    delete brand['gender'];
    this.shareData.setBrandInfo(brand);
    this.router.navigateByUrl('product-view');
  }
}
