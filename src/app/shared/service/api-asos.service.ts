import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ShareDataService } from './share-data.service';
import { firstValueFrom } from 'rxjs';
HttpClientModule
@Injectable()
export class ApiAsosService {
  private categories = 'https://asos2.p.rapidapi.com/categories/list?country=US&lang=en-US';
   options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'a0180db7camshee129c41ed0a557p11395fjsn8bf119f2bea9',
      'X-RapidAPI-Host': 'asos2.p.rapidapi.com'
    }
  };
  
  constructor(private http: HttpClient, private shareData: ShareDataService) {
    this.loadBrands();
  }

  async loadBrands(): Promise<void> {   
    let brandCategories = localStorage.getItem('brandCategories');

    if (!brandCategories) {
      try {
        const brandCategories = await firstValueFrom(this.http.get<[]>(this.categories, this.options));
        this.shareData.setBrandCategories(brandCategories);
        localStorage.setItem('brandCategories', JSON.stringify(brandCategories));
        console.log('Daten aus API geladen:', brandCategories);
      } catch (error) {
        console.error('Fehler beim Laden der Daten:', error);
      }
    }
    else{
      this.shareData.setBrandCategories(JSON.parse(brandCategories));
    }
  }

  async fetchBrandData(): Promise<void> {
    let brandData: any; /*  = JSON.parse(localStorage.getItem('products')); */
    if (!brandData) {
      let brandInfo =  this.shareData.getBrandInfo();
      let prevBrandInfo = this.shareData.getPrevBrandInfo();
      const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${brandInfo['id']}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`
      if (typeof prevBrandInfo === 'undefined' || brandInfo['id'] !== prevBrandInfo['id']) {
        this.shareData.setPrevBrandInfo(brandInfo);
        try {
          brandData = await firstValueFrom(this.http.get<[]>(url, this.options));
          localStorage.setItem('products', JSON.stringify(brandData));
          console.log(brandData);
        } catch (error) {
          console.error(error);
        }
      } 
    }
    this.shareData.setBrandData(brandData);
  }

  updateBrandData() {
    let offset = this.shareData.getOffSet();
    let category = this.shareData.getFilterCategoryId();  
    let sortType = this.shareData.getFilterSort()
    let style =  this.shareData.getFilterStyleId()
    let type = this.shareData.getFilterTypeId()
    let color = this.shareData.getFilterColorId();
    let brandInfo = this.shareData.getBrandInfo()
    let url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=${offset}&categoryId=${brandInfo['categoryId']}&limit=48&country=US&`;

    if(sortType){
      url +=`sort=${sortType}`
    }else{
      url +=`sort=freshness`
    }

    if (style) url += `&attribute_1046=${style}`;
    if (category) url += `&attribute_10992=${category}`;
    if (type) url += `&attribute_1047=${type}`;
    if (color) url += `&base_colour=${color}`;
        
    url += '&currency=USD&sizeSchema=US&lang=en-US';

    this.http.get<{}>(url, this.options).subscribe((data) => {
      this.shareData.setBrandData(data);
    });

  }

  async fetchProduct(productId): Promise<void> {
    /* this.product = this.shareData.getProduct(); */
    let product = JSON.parse(localStorage.getItem('product')); 
    if(!product){
      const url = `https://asos2.p.rapidapi.com/products/v4/detail?id=${productId}&lang=en-US&store=US&sizeSchema=US&currency=USD`;
      if (product.length == 0 || product == undefined) {
        product = await firstValueFrom(this.http.get<[]>(url, this.options))
        console.log(product, 'api')
        localStorage.setItem('product', JSON.stringify(product));
        this.shareData.setProduct(product);
      }
    }
  }
} 