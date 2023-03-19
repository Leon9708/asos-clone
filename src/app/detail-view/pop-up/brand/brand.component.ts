import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {
  @Input() product:any;
  productDescription: SafeHtml;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.productDescription = this.sanitizer.bypassSecurityTrustHtml(this.removeTags(this.product.brand.description));
  }

  removeTags(description: string): string {
    return description.replace(/<[^>]+>/g, '');
  }
}