import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShareDataService } from './share-data.service';


@Injectable({
  providedIn: 'root'
})
export class ApiAsosService {
  brand: any;
  sortType: string;
  private categories = 'https://asos2.p.rapidapi.com/categories/list?country=US&lang=en-US';

  private options = {
    headers: {
      'X-RapidAPI-Key': 'a0180db7camshee129c41ed0a557p11395fjsn8bf119f2bea9',
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    }
  };
  
  constructor(private http: HttpClient, private dataService: ShareDataService) { }
  
  fetchCategoriesMen(): Observable<any[]> {
    return this.http.get<any[]>(this.categories, this.options);
  }
  fetchCategoriesWomen(): Observable<any[]> {
    return this.http.get<any[]>(this.categories, this.options);
  }
  fetchProducts(categoryId:string): Observable<any[]> {
    const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${categoryId}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`
    return this.http.get<any[]>(url, this.options);
  }
  updateProducts(){
    const filteredCategoryId = localStorage.getItem('filteredCategoryId');
    const sortType = localStorage.getItem('sortType');
    const style = localStorage.getItem('styleId');
    let url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${this.brand}&limit=48&country=US&sort=${sortType}`;
    
    url += '&currency=USD&sizeSchema=US&lang=en-US';

    if(style){
    url += `&attribute_1046=${style}`;
    }
    if (filteredCategoryId) {
      url += `&attribute_10992=${filteredCategoryId}`;
    }
    
    console.log(url)
    return this.http.get<any[]>(url, this.options)
  }
}