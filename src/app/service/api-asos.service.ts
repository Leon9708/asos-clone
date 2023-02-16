import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiAsosService {

  private categories = 'https://asos2.p.rapidapi.com/categories/list?country=US&lang=en-US'
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

}