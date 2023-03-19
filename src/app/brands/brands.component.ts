import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { distinctUntilChanged } from 'rxjs';
import { ApiAsosService } from '../service/api-asos.service';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  alphabetUpper = this.alphabet.map(letter => letter.toUpperCase());
  brands: any[] = [];
  brandsByLetter: { letter: string, brands:{title:string, categoryId: string}[]}[] = []
  genderId: string;
  prevGenderId: string;
  constructor(private apiService: ApiAsosService, private shareData:ShareDataService, private router: Router) { }

  ngOnInit(): void {
    this.shareData.brands$.subscribe(brands => {
      this.brands = brands;
    });

    this.shareData.genderId$.subscribe(genderId => {
      this.genderId = genderId;
      this.prevGenderId = this.shareData.getPrevGenderId();
      if (this.genderId !== this.prevGenderId) {
        this.shareData.setPrevGenderId(this.genderId)
        this.fetchData();
      }else{
        this.brandsByLetter = this.groupBrandsByLetter();
      }
    });
  }

  fetchData(): void {
    const apiCall = this.genderId === 'men' ? this.apiService.fetchCategoriesMen() : this.apiService.fetchCategoriesWomen();
    
    apiCall.subscribe(data => {
      this.brands = data['brands'][this.genderId === 'men' ? 0 : 2]['children'];
      this.shareData.setBrands(this.brands);
      this.shareData.setGenderId(this.genderId);
      this.brandsByLetter = this.groupBrandsByLetter();
      console.log(this.genderId, data);
    });
  }

  selectProductsId(brand:any) {
    this.shareData.brandInfo = brand; 
    localStorage.removeItem('selectedButtonSort')
    localStorage.removeItem('selectedButtonCategory')
    localStorage.removeItem('selectedButtonColor')
    localStorage.removeItem('selectedButtonType')
    localStorage.removeItem('selectedButtonStyle')
    this.router.navigateByUrl('product-view');
  }

  groupBrandsByLetter(): { letter: string, brands: {title:string, categoryId: string}[]}[] {
    const groupedBrands: { letter: string, brands: {title:string, categoryId: string} [] } [] = [];
    this.alphabetUpper.forEach(letter => {
      const letterBrands = this.brands
        .filter(brand => brand['content']['title'].toUpperCase().charAt(0) === letter)
        .map(brand => ({ title: brand['content']['title'], categoryId: brand['link']['categoryId'] }));
       
      if (letterBrands.length > 0) {
        groupedBrands.push({ letter, brands: letterBrands });
      }
      
    });
    return groupedBrands;
  }
}
