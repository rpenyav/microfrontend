import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'feature2-sub',
  templateUrl: './feature2-sub.component.html',
  styleUrls: ['./feature2-sub.component.scss']
})
export class Feature2SubComponent implements OnInit {
  isOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

}
