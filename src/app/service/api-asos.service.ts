import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShareDataService } from './share-data.service';
HttpClientModule
@Injectable()
export class ApiAsosService {
  brand: any;
  sortType: string;
  private categories = 'https://asos2.p.rapidapi.com/categories/list?country=US&lang=en-US';
   options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a0180db7camshee129c41ed0a557p11395fjsn8bf119f2bea9',
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    }
  };
  
  constructor(private http: HttpClient, private shareData: ShareDataService) { }

  fetchCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categories, this.options);
  }
  
  fetchProducts (brandId:string): Observable<any[]> {
    const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${brandId}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`
    return this.http.get<any[]>(url, this.options);
  }
  updateProducts(){
    let offset = this.shareData.getOffSet();
    let category = this.shareData.getFilterCategoryId();  
    let sortType =  this.shareData.getFilterSort()
    let style =  this.shareData.getFilterStyleId()
    let type = this.shareData.getFilterTypeId()
    let color = this.shareData.getFilterColorId();
    let brandInfo = this.shareData.getValueFromBrandInfo()
    let url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${offset}&categoryId=${brandInfo['categoryId']}&limit=48&country=US&`;

    if(sortType){
      url +=`sort=${sortType}`
    }else{
      url +=`sort=freshness`
    }
    if(style){
    url += `&attribute_1046=${style}`;
    }
    if (category) {
      url += `&attribute_10992=${category}`;
    }
    if(type){
      url += `&attribute_1047=${type}`;
    }
    if(color){
      url += `&base_colour=${color}`;
    }
        
    url += '&currency=USD&sizeSchema=US&lang=en-US';
    this.http.get<any[]>(url, this.options).subscribe((data) => {
      this.shareData.setBrandData(data);
    });

  }

  getProduct(){
    let productId = this.shareData.getProductId() ;
    let url = `https://asos2.p.rapidapi.com/products/v4/detail?id=${productId}&lang=en-US&store=US&sizeSchema=US&currency=USD`;
    return this.http.get<any[]>(url, this.options)
  }


}