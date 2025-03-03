import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { productDetails, brandDetails } from '../models/item';


@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private brandCategoriesSubject = new BehaviorSubject<[]>([]);
  brandCategories$ = this.brandCategoriesSubject.asObservable();
  private genderIdSubject = new BehaviorSubject<string>(null);
  genderId$ = this.genderIdSubject.asObservable();
  private brandDataSubject = new BehaviorSubject<{}>({});
  brandData$ = this.brandDataSubject.asObservable();
  private showCartObject = new BehaviorSubject<boolean>(null)
  showCart$ = this.showCartObject.asObservable();
  private buttonStatusObject = new BehaviorSubject<boolean>(null)
  buttonStatus$ = this.buttonStatusObject.asObservable();
  private cartArraySubject = new BehaviorSubject<any[]>([]);
  cartArray$ = this.cartArraySubject.asObservable();
  private likedItemsSubject = new BehaviorSubject<productDetails[]>([]);
  likedItems$ = this.likedItemsSubject.asObservable();
  
  genderId: string;
  product: [];
  brandInfo: brandDetails;
  prevBrandInfo: brandDetails;
  stockPrice: number;
  btnGender:  boolean;

  filterCategoryId: number;
  filterSort: string;
  filterStyleId: number;
  filterTypeId:number;
  filterColorId:number;
  offset: number = 0;
  
 
  constructor() { }

  setBrandCategories(brandCategories: []): void {
    this.brandCategoriesSubject.next(brandCategories);
  }

  setPrevBrandInfo(brandInfo: brandDetails): void {
    this.prevBrandInfo = brandInfo
  }

  getPrevBrandInfo(): brandDetails {
    return this.prevBrandInfo;
  }

  getBrandInfo(): brandDetails {
    return this.brandInfo
  }

  setBrandInfo(newBrandInfo: brandDetails ): void {
    this.brandInfo = newBrandInfo
  }

  setOffSet(value: number): void {
    this.offset = value
  }
  getOffSet(): number {
    return this.offset
  }

  getStockPrice(): number {
    return this.stockPrice
  }

  addTolikedArray(product: productDetails): void  {
    const currentLikedItems = this.likedItemsSubject.getValue();
    currentLikedItems.push(product);
    this.likedItemsSubject.next(currentLikedItems);
  }

  setlikedArray(likedItems: productDetails[]): void {
    this.likedItemsSubject.next(likedItems);
  }

  deleteLikedItem(likedItemData: {}): void {
    const currentLikedItems = this.likedItemsSubject.getValue();
    const deleteItemIndex = currentLikedItems.findIndex(item => item.id === likedItemData['id']);
    currentLikedItems.splice(deleteItemIndex, 1);
    this.likedItemsSubject.next(currentLikedItems);
  }

  getLikedArray(): productDetails[] {
    return this.likedItemsSubject.value;
  }

  addToCartArray(item: productDetails): void  {
    const currentCartArray = this.cartArraySubject.getValue();
    currentCartArray.push(item);
    this.cartArraySubject.next(currentCartArray);
  }
  setCartArray(cartArray: productDetails[]): void {
    this.cartArraySubject.next(cartArray);
  }
 
  setProduct(product: []): void {
    this.product = product
  }

  setStockPrice(stockPrice: number): void {
    this.stockPrice = stockPrice
  }

  getProduct(): []{
    return this.product
  }

  showCart(value: boolean): void {
    this.showCartObject.next(value);
  }

  setGenderId(genderId: string): void {
    this.genderIdSubject.next(genderId)
  }

  setButtonStatus(status: boolean): void {
    this.buttonStatusObject.next(status);
  }

  setBrandData(data: {}): void  {
    this.brandDataSubject.next(data);
  }

  setFilterCategoryId(id: number): void  {
    this.filterCategoryId = id;
  }
  
  getFilterCategoryId(): number {
    return this.filterCategoryId;
  }

  setFilterStyleId(filterStyleId: number) {
    this.filterStyleId = filterStyleId;
  }
  
  getFilterStyleId(): number {
    return this.filterStyleId;
  }

  setFilterSort(filterSort: string) {
    this.filterSort = filterSort;
  }
  
  getFilterSort(): string {
    return this.filterSort;
  }

  setFilterTypeId(filterTypeId: number) {
    this.filterTypeId = filterTypeId;
  }
  
  getFilterTypeId(): number {
    return this.filterTypeId;
  }

  setFilterColorId(filterColorId: number) {
    this.filterColorId = filterColorId;
  }
  
  getFilterColorId(): number {
    return this.filterColorId;
  }

  getProductPrice(): number{
    return this.stockPrice
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
