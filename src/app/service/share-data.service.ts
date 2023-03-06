import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  constructor() { }
  private brandDataSubject = new BehaviorSubject<any[]>([]);
  brandData$ = this.brandDataSubject.asObservable();
  genderId: string;
  brands: any[];
  brandInfo: any;
  filterCategoryId: number = 5623;
  filterSort: string;
  filterStyleId: number;
  
  setBrandData(data: any[]): void {
    this.brandDataSubject.next(data);
  }
  
}
