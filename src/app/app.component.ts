import { Component, OnInit } from '@angular/core';
import { ApiAsosService } from './service/api-asos.service';
import { ShareDataService } from './service/share-data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ShareDataService, ApiAsosService]
})
export class AppComponent {
  title = 'asos';
  
  constructor(private shareData : ShareDataService, private asosApi:ApiAsosService){}

  ngOnInit(){
   
  }



}