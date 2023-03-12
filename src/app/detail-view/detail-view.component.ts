import { Component, OnInit } from '@angular/core';
import { ApiAsosService } from '../service/api-asos.service';
import { ShareDataService } from '../service/share-data.service';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  product: any[];
  popUpSize: boolean = false;
  constructor(private shareData: ShareDataService, private apiService: ApiAsosService ) { }

  async ngOnInit(): Promise<void> {
   
    const data = await this.apiService.getProduct().toPromise();
    this.product = data;
    console.log('product', this.product)
    debugger;
  }

}
