import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  ViewEncapsulation: ViewEncapsulation.Native
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
