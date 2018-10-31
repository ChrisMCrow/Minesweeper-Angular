export class Minefield {
    constructor(public rows: Row[] = [], public mineNumber: number = 10, public gameStatus: string = "In Progress") { }
    createMinefield() {
        for(let y = 0; y < 9; y++) {
            let newRow = new Row(y);
            this.rows.push(newRow);
            for(let x = 0; x < 9; x++) {
                let newSpot = new Spot(x, y);
                this.rows[y].spots.push(newSpot);
            }
        }
    }

    plantMine(){
        for(let i = 0; i<this.mineNumber; i++){
            let x = Math.floor(Math.random()*9);
            let y = Math.floor(Math.random()*9);
            let mineSpot = this.getSpot(x,y);
            if (mineSpot.isMine) {
                i--;
            } else {
                mineSpot.isMine = true;
            }
        }
    }

    getNumbers() {
        for(let y = 0; y < 9; y++) {
            for(let x = 0; x < 9; x++) {
                let thisSpot = this.getSpot(x, y);
                for (let h = -1; h <= 1; h++) {
                    for (let v = -1; v <= 1; v++) {
                        if (this.getSpot(x + h, y + v)) {
                            if (this.getSpot(x + h, y + v).isMine) {
                                thisSpot.countMines++;
                            }
                        }
                    }
                }
            }
        }
    }

    expandBlanks(spot) {
        for (let h = -1; h <= 1; h++) {
            for (let v = -1; v <= 1; v++) {
                if (this.getSpot(spot.xvalue + h, spot.yvalue + v)) {
                    let newSpot: Spot = this.getSpot(spot.xvalue + h, spot.yvalue + v);
                    if (newSpot.isCovered) {
                        newSpot.isCovered = false;
                        if (newSpot.countMines === 0) {
                            this.expandBlanks(newSpot);
                        }
                    }
                }
            }
        }
    }


    getSpot(x, y){
        if(x >= 0 && x < 9 && y >=0 && y < 9) {
            return this.rows[y].spots[x];
        } else {
            return null;
        }
    }

    revealMines() {
        for(let y = 0; y < 9; y++) {
          for(let x = 0; x < 9; x++) {
            let checkedSpot = this.getSpot(x, y);
            if (checkedSpot.isMine) {
              checkedSpot.isCovered = false;
            }
          }
        }
      }
    
}

export class Row {
    constructor(public yvalue: number, public spots: Spot[] = []) {}
}

export class Spot {
    constructor(
        public xvalue: number, 
        public yvalue: number, 
        public isCovered: boolean = true, 
        public isMine: boolean = false, 
        public countMines: number = 0,
        public clickedMine: boolean = false
    ) {}
}