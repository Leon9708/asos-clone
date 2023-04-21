import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showCart: boolean;
  btnValue: boolean;
  cartValue: boolean;
  cartName: string;
  cartArray: any;
  searchActive: boolean = false;
    
  constructor(private shareData: ShareDataService, private router: Router) { }

  ngOnInit(): void {
    this.shareData.showCart$.subscribe(
      value => this.showCart = value
      );
      this.shareData.cartArray$.subscribe( 
        cartArray=> this.cartArray = cartArray
      )
  }

  checkCart(element: string){
   this.cartName = element;
   this.btnValue = false;
   this.cartValue = false;
  }
  
  hoverPreviewCart(value: boolean){
    if(value === true){
      this.shareData.setShowCart(value)
    }else {
      setTimeout(() => {
        this.shareData.setShowCart(value) 
      }, 1000);
    }
  }

  openBasket(){
    this.shareData.setShowCart(false)
    this.router.navigateByUrl('cart')
   }

   backtoStart(){
    this.router.navigateByUrl('')
  }

  toBrands(id: string){
    this.shareData.setGenderId(id)
    this.router.navigateByUrl('brands')
  }
  toSavedItems(){
    this.router.navigateByUrl('savedItems')
  }
}