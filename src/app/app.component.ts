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
    if (this.newMinefield.gameStatus === "In Progress") {
      if (spot.countMines === 0) {
        this.newMinefield.expandBlanks(spot);
      }
      if (spot.isMine) {
        spot.clickedMine = true;
      }
      spot.isCovered = false;
      this.isGameOver();
    }
  }

  isGameOver() {
    let counter: number = 0;
    for(let y = 0; y < 9; y++) {
      for(let x = 0; x < 9; x++) {
        let checkedSpot = this.newMinefield.getSpot(x, y);
        if (checkedSpot.isMine && !checkedSpot.isCovered) {
          this.newMinefield.gameStatus = "Game Over";
          this.newMinefield.revealMines();
        } else if (!checkedSpot.isCovered) {
          counter++;
        }
      }
    }
    if (counter === 81 - this.newMinefield.mineNumber) {
      this.newMinefield.gameStatus = "You Win";
    }
  }

  
  ngOnInit() {
    this.newMinefield = new Minefield();
    this.newMinefield.createMinefield();
    this.newMinefield.plantMine();
    this.newMinefield.getNumbers();
  }
}
