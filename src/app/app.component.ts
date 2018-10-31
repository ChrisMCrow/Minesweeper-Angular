import { Component, OnInit } from '@angular/core';
import { Minefield, Row, Spot } from './minefield.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  newMinefield: Minefield;

  uncoverSpot(spot) {
    spot.isCovered = false;
  }
  
  ngOnInit() {
    this.newMinefield = new Minefield();
    this.newMinefield.createMinefield();
    this.newMinefield.plantMine();
    this.newMinefield.getNumbers();
  }
}
