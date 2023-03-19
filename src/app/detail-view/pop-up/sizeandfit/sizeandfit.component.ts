import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sizeandfit',
  templateUrl: './sizeandfit.component.html',
  styleUrls: ['./sizeandfit.component.scss']
})
export class SizeandfitComponent implements OnInit {
  @Input() product:any;
  constructor() { }

  ngOnInit(): void {
  }

}
