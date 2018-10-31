export class Minefield {
    public rows: Row[] = [];
    public gameStatus: string = "In Progress";
    public mineNumber: number = 0;
    constructor(public grid: number = 9, public difficulty?: string) {
        if (this.difficulty === "easy") {
            this.mineNumber = Math.floor(Math.pow(this.grid, 2) * .1);
        }
        if (this.difficulty === "intermediate") {
            this.mineNumber = Math.floor(Math.pow(this.grid, 2) * .15);
        }
        if (this.difficulty === "difficult") {
            this.mineNumber = Math.floor(Math.pow(this.grid, 2) * .2);
        }
        if (this.difficulty === "expert") {
            this.mineNumber = Math.floor(Math.pow(this.grid, 2) * .25);
        }
        console.log(this.mineNumber);
    }

    createMinefield() {
        for(let y = 0; y < this.grid; y++) {
            let newRow = new Row(y);
            this.rows.push(newRow);
            for(let x = 0; x < this.grid; x++) {
                let newSpot = new Spot(x, y);
                this.rows[y].spots.push(newSpot);
            }
        }
    }

    plantMine(){
        if (this.mineNumber < Math.pow(this.grid, 2)) {
            for (let i = 0; i<this.mineNumber; i++){
                let x = Math.floor(Math.random() * this.grid);
                let y = Math.floor(Math.random() * this.grid);
                let mineSpot = this.getSpot(x,y);
                if (mineSpot.isMine) {
                    i--;
                } else {
                    mineSpot.isMine = true;
                }
            }
        } else {
            alert("Number of mines exceeds possible tiles.");
        }
    }

    getNumbers() {
        for(let y = 0; y < this.grid; y++) {
            for(let x = 0; x < this.grid; x++) {
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
        if(x >= 0 && x < this.grid && y >=0 && y < this.grid) {
            return this.rows[y].spots[x];
        } else {
            return null;
        }
    }

    revealMines() {
        for(let y = 0; y < this.grid; y++) {
            for(let x = 0; x < this.grid; x++) {
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