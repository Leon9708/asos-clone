import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../../service/share-data.service';
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

  countProductTotal(product: any) {
    this.productTotal += product.qty
  }

  calculateSubtotal(){
    this.productTotal = 0;
    let subTotalNumber = 0;
    this.productDetails.forEach((product)=>{
      let price = 0
      let priceQty = 0
      price += product.price
      priceQty =  price * product.qty
      subTotalNumber += priceQty
       this.countProductTotal(product) 
    })
    this.subTotal = +subTotalNumber.toFixed(2);
  }
  checkDuplicates(){
    let filteredProductDetails = this.productDetails.reduce((accumulator, current) => {
      let existingProduct = accumulator.find((product: { id: any; size: any; }) => product.id === current.id && product.size === current.size);
      if (existingProduct) {
        let modifiedProduct = Object.assign({}, existingProduct);
        modifiedProduct.qty += current.qty;
        modifiedProduct.currentPrice = modifiedProduct.qty * current.price
        accumulator.splice(accumulator.indexOf(existingProduct), 1, modifiedProduct);
      } else {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    this.productDetails = [...filteredProductDetails];
  }

  openBasket(){
    this.shareData.setShowCart(false)
    this.router.navigateByUrl('cart')
  }

}
