
import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { ShareDataService } from 'src/app/shared/service/share-data.service';

@Component({
  selector: 'app-start-screen-component',
  templateUrl: './start-screen-component.component.html',
  styleUrls: ['./start-screen-component.component.scss']
})
export class StartScreenComponentComponent {
  isHoveredWomen: boolean = false;
  isHoveredMen: boolean = false;
  constructor(private router: Router, private shareData: ShareDataService) { }

  loadNext(id:string){
    this.shareData.setGenderId(id)
    this.router.navigateByUrl('brands')
  }

}