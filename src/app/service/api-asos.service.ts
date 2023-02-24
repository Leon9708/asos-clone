import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAsosService {
  categoryId: string;
  sortType: string;
  private categories = 'https://asos2.p.rapidapi.com/categories/list?country=US&lang=en-US';

  private options = {
    headers: {
      'X-RapidAPI-Key': 'e837991aa7mshf30c519bdea7725p15cb82jsn89b881e7e9c8',
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    }
  };
  
  constructor(private http: HttpClient) { }
  
  fetchCategoriesMen(): Observable<any[]> {
    return this.http.get<any[]>(this.categories, this.options);
  }
  fetchCategoriesWomen(): Observable<any[]> {
    return this.http.get<any[]>(this.categories, this.options);
  }
  fetchProducts(): Observable<any[]> {
    this.categoryId = localStorage.getItem('categoryId');
    console.log(this.categoryId)
    const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${this.categoryId}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`
    return this.http.get<any[]>(url, this.options);
  }
  updateProducts(sortType:string){
    this.categoryId = localStorage.getItem('categoryId');
    this.sortType = sortType
    const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${this.categoryId}&limit=48&country=US&sort=${sortType}&currency=USD&sizeSchema=US&lang=en-US`
    console.log(url)
    return this.http.get<any[]>(url, this.options)
  }


}