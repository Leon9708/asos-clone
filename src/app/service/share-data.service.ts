import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }
  brand: {title: string, categoryId: string}[]
  buttonId: string;

  getButtonId(): string {
    return this.buttonId;
  }

  setButtonId(buttonId: string): void {
    this.buttonId = buttonId;
  }

  setCategoryId(brand: []): void {
    this.brand = brand;
  }

}
