import { Component, OnInit } from '@angular/core';
import { ShareDataService } from './service/share-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ShareDataService]
})
export class AppComponent {
  title = 'asos';
  
  constructor(private shareData : ShareDataService){}

  ngOnInit(){
   
  }



}