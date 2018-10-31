import { Component, OnInit } from '@angular/core';
import { Minefield, Row, Spot } from './minefield.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  gridSize: number = 9;
  game: Minefield;

  markSpot(spot) {
    if (spot.mark < 2) {
      spot.mark++;
    } else {
      spot.mark = 0;
    }
  }

  uncoverSpot(spot) {
    if (this.game.gameStatus === "In Progress") {
      if (spot.countMines === 0) {
        this.game.expandBlanks(spot);
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
    for(let y = 0; y < this.game.grid; y++) {
      for(let x = 0; x < this.game.grid; x++) {
        let checkedSpot = this.game.getSpot(x, y);
        if (checkedSpot.isMine && !checkedSpot.isCovered) {
          this.game.gameStatus = "Game Over";
          this.game.revealMines();
        } else if (!checkedSpot.isCovered) {
          counter++;
        }
      }
    }
    if (counter === 81 - this.game.mineNumber) {
      this.game.gameStatus = "You Win";
    }
  }

  newGame(grid: string, difficulty: string) {
    console.log(difficulty);
    let gridNumber: number = parseInt(grid);
    this.game = new Minefield(gridNumber, difficulty);
    this.game.createMinefield();
    this.game.plantMine();
    this.game.getNumbers();
  }
  
  ngOnInit() {
  }
}
