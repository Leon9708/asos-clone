import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  private categoriesSubject = new BehaviorSubject<any[]>([]);
  categories$ = this.categoriesSubject.asObservable();
  private genderIdSubject = new BehaviorSubject<string>(null);
  genderId$ = this.genderIdSubject.asObservable();
  private brandDataSubject = new BehaviorSubject<any[]>([]);
  brandData$ = this.brandDataSubject.asObservable();
  private showCartObject = new BehaviorSubject<boolean>(null)
  showCart$ = this.showCartObject.asObservable();
  private buttonStatusObject = new BehaviorSubject<any>(null)
  buttonStatus$ = this.buttonStatusObject.asObservable();
  private cartArraySubject = new BehaviorSubject<any[]>([]);
  cartArray$ = this.cartArraySubject.asObservable();
  private likedArraySubject = new BehaviorSubject<any[]>([]);
  likedArray$ = this.likedArraySubject.asObservable();
  
  genderId: string;
  product: any[]
  brands: any[];
  brandInfo: any[];
  prevBrandInfo: any[];
  productId: number;
  stockPrice: number;

  filterCategoryId: number;
  filterSort: string;
  filterStyleId: number;
  filterTypeId:number;
  filterColorId:number;
  offset: number = 0;
  
 
  constructor() { }

  setCategories(categories: any[]){
    this.categoriesSubject.next(categories);
  }

  setPrevBrandInfo(brandInfo: any[]){
    this.prevBrandInfo = brandInfo
  }

  getPrevBrandInfo(): any[] {
    return this.prevBrandInfo;
  }

  getValueFromBrandInfo() {
    return this.brandInfo
  }

  setBrandInfo(newBrandInfo: any[]){
    this.brandInfo = newBrandInfo
  }

  setOffSet(value:number){
    this.offset = value
  }
  getOffSet(){
    return this.offset
  }

  getStockPrice(){
    return this.stockPrice
  }

  addTolikedArray(item: any) {
    const currentLikedArray = this.likedArraySubject.getValue();
    currentLikedArray.push(item);
    this.likedArraySubject.next(currentLikedArray);
  }
  setlikedArray(likedArray: any[]){
    this.likedArraySubject.next(likedArray);
  }

  deleteLikedItem(likedItem: any[]){
    const currentLikedArray = this.likedArraySubject.getValue();
    const deleteItemIndex = currentLikedArray.findIndex(item => item.id === likedItem['id']);
    currentLikedArray.splice(deleteItemIndex, 1);
    this.likedArraySubject.next(currentLikedArray);
  }

  getLikedArrayValue(){
    return this.likedArraySubject.value;
  }

  addToCartArray(item: any) {
    const currentCartArray = this.cartArraySubject.getValue();
    currentCartArray.push(item);
    this.cartArraySubject.next(currentCartArray);
  }
  setCartArray(cartArray: any[]){
    this.cartArraySubject.next(cartArray);
  }
 

  setProduct(product: any){
    this.product = product
  }

  setStockPrice(stockPrice: number){
    this.stockPrice = stockPrice
  }

  getProduct(){
    return this.product
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
    this.genderIdSubject.next(genderId)
  }

  setButtonStatus(status: boolean): void {
    this.buttonStatusObject.next(status);
  }

  setBrands(brands: any[]): void {
    this.brands = brands
  }
  getBrands(){
    return this.brands
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

  getProductPrice(){
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
