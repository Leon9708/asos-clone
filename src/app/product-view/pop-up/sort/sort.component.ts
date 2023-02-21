import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  selectedIndexes: number[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  buttonClicked(index: number) {
    if (this.isSelected(index)) {
      // Remove index if it is already selected
      this.selectedIndexes = this.selectedIndexes.filter(i => i !== index);
    } else {
      // Add index if it is not selected
      this.selectedIndexes.push(index);
    }
  }

  isSelected(index: number) {
    return this.selectedIndexes.includes(index);
  }
}


