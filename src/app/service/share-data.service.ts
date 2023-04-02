import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private brandDataSubject = new BehaviorSubject<any[]>([]);
  brandData$ = this.brandDataSubject.asObservable();
  private brandsSubject = new BehaviorSubject<any[]>([]);
  brands$ = this.brandsSubject.asObservable();
  private productObject = new BehaviorSubject<any[]>([])
  product$ = this.productObject.asObservable();
  private genderIdSubject = new BehaviorSubject<string>(null);
  genderId$ = this.genderIdSubject.asObservable();
  private showCartObject = new BehaviorSubject<boolean>(null)
  showCart$ = this.showCartObject.asObservable();
  private buttonStatusObject = new BehaviorSubject<any>(null)
  buttonStatus$ = this.buttonStatusObject.asObservable();
  private cartArraySubject = new BehaviorSubject<any[]>([]);
  cartArray$ = this.cartArraySubject.asObservable()

  prevGenderId: string;
  brandInfo: any;
  productId: number;

  filterCategoryId: number;
  filterSort: string;
  filterStyleId: number;
  filterTypeId:number;
  filterColorId:number;

 
  constructor() { }

  addToCartArray(item: any) {
    const currentCartArray = this.cartArraySubject.getValue();
    currentCartArray.push(item);
    this.cartArraySubject.next(currentCartArray);
  }

setProduct(product: any){
  this.productObject.next(product)
}

  setShowCart(value: any){
    this.showCartObject.next(value);
  }
  setProductId(id: number): void {
    this.productId = id;
  }
  
  getProductId(): number {
    return this.productId;
  }

  setGenderId(genderId: string): void {
    this.genderIdSubject.next(genderId);
  }

  setPrevGenderId(genderId: string){
    this.prevGenderId = genderId
  }

  getPrevGenderId(): string {
    return this.prevGenderId;
  }

  setButtonStatus(status: boolean): void {
    this.buttonStatusObject.next(status);
  }

  setBrands(brands: any[]): void {
    this.brandsSubject.next(brands);
  }

  setBrandData(data: any[]): void {
    this.brandDataSubject.next(data);
  }

  setFilterCategoryId(id: number): void {
    this.filterCategoryId = id;
  }
  
  getFilterCategoryId(): number {
    return this.filterCategoryId;
  }

  setFilterStyleId(filterStyleId: number): void {
    this.filterStyleId = filterStyleId;
  }
  
  getFilterStyleId(): number {
    return this.filterStyleId;
  }

  setFilterSort(filterSort: string): void {
    this.filterSort = filterSort;
  }
  
  getFilterSort(): string {
    return this.filterSort;
  }

  setFilterTypeId(filterTypeId: number): void {
    this.filterTypeId = filterTypeId;
  }
  
  getFilterTypeId(): number {
    return this.filterTypeId;
  }

  setFilterColorId(filterColorId: number): void {
    this.filterColorId = filterColorId;
  }
  
  getFilterColorId(): number {
    return this.filterColorId;
  }

  removeOtherCategories(selectedElement: string){
    if (selectedElement === 'category') {
      this.filterStyleId = undefined;
      this.filterTypeId = undefined;
      this.filterColorId = undefined
      this.setButtonStatus(false)
    } else if (selectedElement === 'style') {
      this.filterCategoryId = undefined;
      this.filterTypeId = undefined;
      this.filterColorId = undefined
      this.setButtonStatus(false)
    }else if (selectedElement === 'type') {
      this.filterStyleId = undefined;
      this.filterCategoryId = undefined;  
      this.filterColorId = undefined
      this.setButtonStatus(false)
    }else if (selectedElement === 'color') {
      this.filterStyleId = undefined;
      this.filterCategoryId = undefined;  
      this.filterTypeId = undefined;
      this.setButtonStatus(false)
    }
  } 
}
