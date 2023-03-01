import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  constructor() { }
  private brandIdSubject = new BehaviorSubject<{ title: string, categoryId: string }>(null);
  brand$ = this.brandIdSubject.asObservable();
  private genderIdSubject = new BehaviorSubject<string>(null)
  genderId$ = this.genderIdSubject.asObservable();
  brandData: any[];
  private brandsSubject = new BehaviorSubject<any[]>([]);
  brands$ = this.brandsSubject.asObservable();
  private brandDataSubject = new BehaviorSubject<any[]>([]);
  brandData$ = this.brandDataSubject.asObservable();

  setGenderId(genderId: string): void {
    this.genderIdSubject.next(genderId);
  }

  setBrandId(brand: { title: string, categoryId: string }): void {
    this.brandIdSubject.next(brand);
  }

  setBrands(brands: any[]): void {
    this.brandsSubject.next(brands);
  }
  
  setBrandData(data: any[]): void {
    this.brandDataSubject.next(data);
  }
}
