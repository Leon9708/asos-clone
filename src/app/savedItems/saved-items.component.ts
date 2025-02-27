import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../shared/service/share-data.service';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss']
})
export class SavedItemsComponent implements OnInit {
  productDetails: any[] = [];
  ditSize:boolean = false;
  editQty:boolean = false;
  constructor(private shareData:ShareDataService) { }

  ngOnInit(): void {
    this.shareData.likedArray$.subscribe((likedItems:[])=>{
      this.productDetails = likedItems
    })
  }

  changeSize(size:string,index: number){
    this.productDetails[index]['editSize'] = false;
    this.productDetails[index]['size'] = size;
    this.shareData.setlikedArray(this.productDetails)
  }

  moveToBag(itemIndex: number){
    this.shareData.addToCartArray(this.productDetails[itemIndex])
    this.shareData.deleteLikedItem(this.productDetails[itemIndex])
    this.addAnimation()
  }

  addAnimation() {
    setTimeout(() => {
      this.shareData.setShowCart(true)
    }, 750);
    setTimeout(() => {
      this.shareData.setShowCart(false)
    }, 7500);
  }
}
