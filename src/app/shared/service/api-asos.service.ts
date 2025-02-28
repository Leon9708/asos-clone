import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  
  constructor(private http: HttpClient, private shareData: ShareDataService) {
    this.loadBrands();
   }

   async fetchAndStoreProducts(categoryId: number): Promise<void> {
    let products= JSON.parse(localStorage.getItem('products'));
  
    if (!products) {
      try {
        products = await this.fetchProducts(categoryId).toPromise();
        localStorage.setItem('products', JSON.stringify(products));
        console.log(products);
      } catch (error) {
        console.error(error);
      }
    }
    this.shareData.setBrandData(products);
    console.log('storage', products);
  }


  async loadBrands(): Promise<void> {   
    let brandCategories = localStorage.getItem('brandCategories');

    if (!brandCategories) {
      try {
        const brandCategories = await this.fetchCategories().toPromise();
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

  fetchCategories() {
    return this.http.get<[]>(this.categories, this.options);
  }
  
  fetchProducts (brandId:number) {
    const url = `https://asos2.p.rapidapi.com/products/v2/list?store=US&offset=0&categoryId=${brandId}&limit=48&country=US&sort=freshness&currency=USD&sizeSchema=US&lang=en-US`
    return this.http.get<[]>(url, this.options);
  }
  updateProducts(){
    let offset = this.shareData.getOffSet();
    let category = this.shareData.getFilterCategoryId();  
    let sortType = this.shareData.getFilterSort()
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

    if (style) url += `&attribute_1046=${style}`;
    if (category) url += `&attribute_10992=${category}`;
    if (type) url += `&attribute_1047=${type}`;
    if (color) url += `&base_colour=${color}`;
        
    url += '&currency=USD&sizeSchema=US&lang=en-US';

    this.http.get<{}>(url, this.options).subscribe((data) => {
      this.shareData.setBrandData(data);
    });

  }

  getProduct(){
    let productId = this.shareData.getProductId() ;
    let url = `https://asos2.p.rapidapi.com/products/v4/detail?id=${productId}&lang=en-US&store=US&sizeSchema=US&currency=USD`;
    return this.http.get<[]>(url, this.options)
  }


}