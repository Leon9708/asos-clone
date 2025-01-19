import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../service/share-data.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})


export class CartComponent implements OnInit {
  products: any[];
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
  buyActive: boolean = false;
  stockPrice: number;

  constructor(private shareData:ShareDataService, private router: Router) { }

  ngOnInit(): void {
    this.shareData.cartArray$.subscribe((cart:[])=>{
      this.products = cart
      if(this.products.length >= 1){
        this.render()
      }
    })

  }
  
  render(){
    this.checkDuplicates()
    this.calculateSubtotal()
    this.calculateTotal()
    this.checkMinimumPrice();
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
    this.buyActive = this.products.length !== 0 ? true : false;
  }

  checkShipping(){
    if(this.subTotal >= this.shippingfreeValue){
      this.shippingFree = true
    }
  }

  calculateSubtotal(){
    let subTotalNumber = 0;
    this.products.forEach((product)=>{
      let price = 0
      let priceQty = 0
      price += product.price
      priceQty =  price * product.qty
      subTotalNumber += priceQty
    })
    this.subTotal = +subTotalNumber.toFixed(2);
  }

  checkMinimumPrice(){
   this.orderValue = this.shippingfreeValue - this.subTotal
  }

  checkDuplicates(){
    let filteredProductDetails = this.products.reduce((accumulator, current) => {
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
    this.products = [...filteredProductDetails];
  }

  changeSize(size:string,index: number){
    this.products[index]['editSize'] = false;
    this.products[index]['size'] = size;
    this.shareData.setCartArray(this.products)
  }

  changeQty(qty:number, index:number){
    this.products[index]['editQty'] = false;
    this.products[index]['qty'] = qty
    this.products[index]['currentPrice'] = qty * this.products[index]['price'];
    this.shareData.setCartArray(this.products)
  }

  checkCode() {
    if(this.code.toLowerCase() !== undefined){
      if (this.code.toLowerCase() === "newbie") {
        if (!this.discount) {
          this.discount = true;
          this.shareData.setCartArray(this.products);
        }
      } else if (this.discount) {
        this.discount = false;
        this.shareData.setCartArray(this.products);
      }
    }
  }
}


