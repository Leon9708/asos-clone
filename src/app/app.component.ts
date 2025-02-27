import { Component, OnInit } from '@angular/core';
import { ApiAsosService } from './shared/service/api-asos.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ApiAsosService]
})
export class AppComponent {
  title = 'asos';
  
  constructor( private asosApi:ApiAsosService){}

  ngOnInit(){
   
  }



}