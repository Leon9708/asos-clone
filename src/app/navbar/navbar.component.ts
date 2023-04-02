import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  showCart: boolean = false;
  btnValue: boolean;
  cartValue: boolean;
  cartName: string;
  
  constructor(private shareData: ShareDataService) { }

  ngOnInit(): void {
    this.shareData.showCart$.subscribe(
      value => this.showCart = value
      );
  }

  checkCart(element: string){
   this.cartName = element;
  }
  

}