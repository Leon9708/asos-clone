import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAsosService } from '../shared/service/api-asos.service';
import { ShareDataService } from '../shared/service/share-data.service';

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
  brandCategories: any[];
  loading: boolean = false;


  constructor(private apiService: ApiAsosService, private shareData:ShareDataService, private router: Router) { }

  ngOnInit(): void {
    this.shareData.brandCategories$.subscribe((data)=>{
      this.brandCategories = data
      this.shareData.genderId$.subscribe((genderId)=>{
        this.triggerGender(genderId);
        if(this.brandCategories){  
          this.brands = this.brandCategories['brands'][this.genderId === 'men' ? 0 : 2]['children'];
          this.brandsByLetter = this.groupBrandsByLetter();
        }
      })
    })
  }

  triggerGender(genderId: string) {
    this.genderId = genderId
    window.scrollTo({
      behavior: 'smooth',
      top: 0
    });
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
    const elementPosition = element.getBoundingClientRect().top; 
    const navbarHeight = 65
    const newElementPosition = elementPosition - navbarHeight;

    window.scrollTo({
      top: newElementPosition,
      behavior: 'smooth'
    });
  }
}
