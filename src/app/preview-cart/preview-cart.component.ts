import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preview-cart',
  templateUrl: './preview-cart.component.html',
  styleUrls: ['./preview-cart.component.scss']
})
export class PreviewCartComponent implements OnInit {
  productDetails: any[];
  subTotal: number = 0;
  productTotal: number = 0;
  constructor(private shareData:ShareDataService, private router: Router) { }

  ngOnInit(): void {
    this.shareData.cartArray$.subscribe((cart:[])=>{
      this.productDetails = cart
      this.checkDuplicates()
      this.calculateSubtotal()

    })
  }

  checkProductTotal(product: any) {
    this.productTotal += product.qty
  }

  calculateSubtotal(){
    this.subTotal = 0;
    this.productTotal = 0;
    this.productDetails.forEach((product)=>{
      let price = 0
      let priceQty = 0
      price += product.price
      priceQty =  price * product.qty
      this.subTotal += priceQty
      this.checkProductTotal(product)
    })
  }
  checkDuplicates(){
    let filteredProductDetails = this.productDetails.reduce((accumulator, current) => {
      let existingProduct = accumulator.find((product: { id: any; size: any; }) => product.id === current.id && product.size === current.size);
      if (existingProduct) {
        let modifiedProduct = Object.assign({}, existingProduct);
        modifiedProduct.qty += existingProduct.qty ;
        modifiedProduct.currentPrice += existingProduct.price;
        accumulator.splice(accumulator.indexOf(existingProduct), 1, modifiedProduct);
      } else {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    this.productDetails = [...filteredProductDetails];
    console.log(this.productDetails)
  }

  openBasket(){
    this.router.navigateByUrl('cart')
  }

}
