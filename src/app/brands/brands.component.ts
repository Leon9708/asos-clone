import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private apiService: ApiAsosService, private shareData:ShareDataService, private router: Router) { }

  ngOnInit(): void {
    this.genderId = this.shareData.genderId;
    if (this.brands.length === 0 || JSON.stringify(this.brands) !== JSON.stringify(this.shareData.brands)) {
      if (this.genderId === 'men') {
        this.apiService.fetchCategoriesMen().subscribe(data => {
          this.brands = data['brands'][0]['children']
          this.brandsByLetter = this.groupBrandsByLetter();
       
        });
      } else {
        this.apiService.fetchCategoriesWomen().subscribe(data => {
          this.brands = data['brands'][2]['children']
          this.brandsByLetter = this.groupBrandsByLetter();
        });
      }
    }
    this.shareData.brands = this.brands
  }

  selectProductsId(brand:any) {
    this.shareData.brandInfo = brand; 
    this.router.navigateByUrl('productView');
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
