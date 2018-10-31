export class Minefield {
    constructor(public rows: Row[] = [], public mineNumber: number = 10) { }
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
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (this.getSpot(x + i, y + j)) {
                            if (this.getSpot(x + i, y + j).isMine) {
                                thisSpot.countMines++;
                            }
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
}

export class Row {
    constructor(public yvalue: number, public spots: Spot[] = []) {}
}

export class Spot {
    constructor(public xvalue: number, public yvalue: number, public isCovered: boolean = true, public isMine: boolean = false, public countMines: number = 0) {}

    uncoverSpot(spot) {
        spot.isCovered = false;
    }
}