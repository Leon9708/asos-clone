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
  prevGenderId: string;
  categories: any[];
  constructor(private apiService: ApiAsosService, private shareData:ShareDataService, private router: Router) { }

  ngOnInit(): void {
    this.shareData.categories$.subscribe((data)=>{
      this.categories = data
      this.shareData.genderId$.subscribe((genderId)=>{
        this.genderId = genderId
        if(this.categories){  
          this.brands = this.categories['brands'][this.genderId === 'men' ? 0 : 2]['children'];
          this.brandsByLetter = this.groupBrandsByLetter();
        }
      })
    })
  }

  selectProductsId(brand:any) {
    this.shareData.setBrandInfo(brand) 
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

  navigateToSection(letter: string) {
    const uppercaseLetter = letter.toUpperCase();
    const element = document.getElementById(uppercaseLetter);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
