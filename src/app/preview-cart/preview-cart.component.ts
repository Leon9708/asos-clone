import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-preview-cart',
  templateUrl: './preview-cart.component.html',
  styleUrls: ['./preview-cart.component.scss']
})
export class PreviewCartComponent implements OnInit {
  productDetails: any[];
  subTotal: number = 0;

  constructor(private shareData:ShareDataService) { }

  ngOnInit(): void {
    this.shareData.cartArray$.subscribe((cart:[])=>{
      this.productDetails = cart
      this.calculateSubtotal()
    
    })
  }

  calculateSubtotal(){
    this.productDetails.forEach((product)=>{
      const priceString = product.price.slice(1); // Remove the first character from the price string
      const price = parseFloat(priceString)
      this.subTotal += price
    })
  }

}
