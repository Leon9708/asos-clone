import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],  
  
})
export class ProductdetailsComponent {
  @Input() product: any;

  ngOnInit(): void {
  
  }
}