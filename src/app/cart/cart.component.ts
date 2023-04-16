import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})


export class CartComponent implements OnInit {
  productDetails: any[];
  subTotal: number = 0;
  total:number = 0;
  editSize:boolean = false;
  editQty:boolean = false;
  shippingFree:boolean = false;
  shippingfreeValue: number = 75
  orderValue: number = 0;
  code:string;
  discount:boolean = false;
  popUpBuy: boolean = false;

  constructor(private shareData:ShareDataService, private router: Router) { }

  ngOnInit(): void {
    this.shareData.cartArray$.subscribe((cart:[])=>{
      this.productDetails = cart
      this.render()
    })
  }
  
  render(){
    this.checkDuplicates()
    this.calculateSubtotal()
    this.calculateTotal()
    this.checkMinimumOrder();
    this.checkCode();
  }

  calculateTotal() {
    let totalNumber = 0;
    this.checkShipping();
    if (this.shippingFree) {
      totalNumber = this.subTotal;
    } else if (this.subTotal > 0) {
      totalNumber = this.subTotal + 5;
    }
    if (this.discount) {
      totalNumber = totalNumber * 0.9;
    }
    this.total = +totalNumber.toFixed(2); 
  }

  checkShipping(){
    if(this.subTotal >= this.shippingfreeValue){
      this.shippingFree = true
    }
  }

  calculateSubtotal(){
    let subTotalNumber = 0;
    this.productDetails.forEach((product)=>{
      let price = 0
      let priceQty = 0
      price += product.price
      priceQty =  price * product.qty
      subTotalNumber += priceQty
    })
    this.subTotal = +subTotalNumber.toFixed(2);
  }

  checkMinimumOrder(){
   this.orderValue = this.shippingfreeValue - this.subTotal
  }

  checkDuplicates(){
    let filteredProductDetails = this.productDetails.reduce((accumulator, current) => {
      let existingProduct = accumulator.find((product: { id: any; size: any; }) => product.id === current.id && product.size === current.size);
      if (existingProduct) {
        let modifiedProduct = Object.assign({}, existingProduct);
        modifiedProduct.qty += current.qty;
        accumulator.splice(accumulator.indexOf(existingProduct), 1, modifiedProduct);
      } else {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    this.productDetails = [...filteredProductDetails];
  }

  changeSize(size:string,index: number){
    this.productDetails[index]['editSize'] = false;
    this.productDetails[index]['size'] = size;
    this.shareData.setCartArray(this.productDetails)
  }

  changeQty(qty:number, index:number){
    this.productDetails[index]['editQty'] = false;
    this.productDetails[index]['qty'] = qty
    this.shareData.setCartArray(this.productDetails)
  }

  checkCode() {
    if (this.code.toLowerCase() === "newbie") {
      if (!this.discount) {
        this.discount = true;
        this.shareData.setCartArray(this.productDetails);
      }
    } else if (this.discount) {
      this.discount = false;
      this.shareData.setCartArray(this.productDetails);
    }
  }
}


