import { Component, OnInit } from '@angular/core';
import { ShareDataService } from '../shared/service/share-data.service';
import { productDetails } from '../shared/models/item';	

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss']
})
export class SavedItemsComponent implements OnInit {
  likedItems: productDetails[] = [];
  ditSize:boolean = false;
  editQty:boolean = false;

  constructor(private shareData:ShareDataService) { }

  ngOnInit(): void {
    this.shareData.likedItems$.subscribe((likedItems:[])=>{
      this.likedItems = likedItems
    })
  }

  changeSize(size:string,index: number){
    this.likedItems[index]['editSize'] = false;
    this.likedItems[index]['size'] = size;
    this.shareData.setlikedArray(this.likedItems)
  }

  moveToBag(itemIndex: number){
    this.shareData.addToCartArray(this.likedItems[itemIndex])
    this.shareData.deleteLikedItem(this.likedItems[itemIndex])
    this.addAnimation()
  }

  addAnimation() {
    setTimeout(() => {
      this.shareData.showCart(true)
    }, 750);
    setTimeout(() => {
      this.shareData.showCart(false)
    }, 7500);
  }
}
