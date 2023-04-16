import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/service/share-data.service';

@Component({
  selector: 'app-bought',
  templateUrl: './bought.component.html',
  styleUrls: ['./bought.component.scss']
})
export class BoughtComponent implements OnInit {

  constructor(private router: Router, private shareData:ShareDataService) { }

  ngOnInit(): void {
  }

  backtoStart(){
    this.shareData.setCartArray([])
    this.router.navigateByUrl('')
  }
}
