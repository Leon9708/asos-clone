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
      'X-RapidAPI-Key': '5e49889959mshc2f4fb1b13ba7d1p1b0cf0jsnf7850f2cab0a',
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    }
  };
  
  constructor(private http: HttpClient, private shareData: ShareDataService) { }
  
  fetchCategoriesMen(): Observable<any[]> {
    return this.http.get<any[]>(this.categories, this.options);
  }
  fetchCategoriesWomen(): Observable<any[]> {
    return this.http.get<any[]>(this.categories, this.options);
  }
  fetchProducts(brandId:string): Observable<any[]> {
    const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${brandId}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`
    return this.http.get<any[]>(url, this.options);
  }
  updateProducts(){
    debugger;
    let filteredCategoryId = this.shareData.filterCategoryId
    let sortType =  this.shareData.filterSort
    let style =  this.shareData.filterStyleId
    let url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${this.shareData.brandInfo.id}&limit=48&country=US&`;

    if(sortType){
      url +=`sort=${sortType}`
    }else{
      url +=`sort=freshness`
    }
    if(style){
    url += `&attribute_1046=${style}`;
    }
    if (filteredCategoryId) {
      url += `&attribute_10992=${filteredCategoryId}`;
    }
        
    url += '&currency=USD&sizeSchema=US&lang=en-US';

    
    console.log(url)
    return this.http.get<any[]>(url, this.options)
  }
}