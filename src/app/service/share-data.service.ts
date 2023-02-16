import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }
  brand: [];
  buttonId: string;

  getButtonId(): string {
    return this.buttonId;
  }

  setButtonId(buttonId: string): void {
    this.buttonId = buttonId;
  }
  getCategoryId(): [] {
    return this.brand;
  }

  setCategoryId(brand: []): void {
    this.brand = brand;
  }

}
