class Grass {          //indexy 1
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.multiply = 0;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y    ],
      [this.x + 1, this.y    ],
      [this.x - 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(char) {
    let found = [];
    for (const i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  mul() {
    this.multiply++;
    let emptyCell = this.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell && this.multiply >= 8) {
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 1;
      let gr = new Grass(newX, newY);
      grassArr.push(gr);
      this.multiply = 0;
    }
  }
}
class GrassEater {            //indexy 2
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 8;
    this.directions = [];
  }
  getNewCordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y    ],
      [this.x + 1, this.y    ],
      [this.x - 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(char) {
    this.getNewCordinates()
    let found = [];
    for (const i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  move() {    
    let emptyCells = this.chooseCell(0);
    let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (emptyCell && this.energy > 0) {
      this.energy--;
      let newX = emptyCell[0];
      let newY = emptyCell[1];
      matrix[newX][newY] = 2;
      matrix[this.x][this.y] = 0;
      this.x = newX;
      this.y = newY;
    } else if(this.energy <= 0){
      this.die();
    }
  }
  eat() {
    let grassCells = this.chooseCell(1);
    let grassCell = grassCells[Math.floor(Math.random() * grassCells.length)];
    if (grassCell && this.energy > 0) {
      this.energy++;
      let newX = grassCell[0];
      let newY = grassCell[1];
      matrix[newX][newY] = 2;
      matrix[this.x][this.y] = 0;
      for (let i = 0; i < grassArr.length; i++) {
        if(newX == grassArr[i].x && newY == grassArr[i].y){
          grassArr.splice(i, 1);
        }
      }
      this.x = newX;
      this.y = newY;
    } else{
      this.move();
    }
  }
  mul() {
    let emptyCell = this.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell && this.energy >= 9) {
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 2;
      let grEat = new GrassEater(newX, newY);
      grassEaterArr.push(grEat);
      this.energy = 8;
    }
  }
  die(){
    matrix[this.x][this.y] = 0;
    for (let i = 0; i < grassEaterArr.length; i++) {
      if(this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y){
        grassEaterArr.splice(i, 1);
      }
    }
  }
}
class Gazanik {         //indexy 3
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.directions = [];
    this.energy = 12;
  }
  getNewCordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y    ],
      [this.x + 1, this.y    ],
      [this.x - 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(char) {
    this.getNewCordinates()
    let found = [];
    for (const i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  move() {
    let grassCells = this.chooseCell(1);
    let emptyCells = this.chooseCell(0);
    let arr = [...grassCells, ...emptyCells];
    let newCell = arr[Math.floor(Math.random() * arr.length)];
    if (newCell && this.energy >= 0) { 
      this.energy--; 
      let newX = newCell[0];
      let newY = newCell[1];
      if(matrix[newX][newY] = 0) {
        matrix[newX][newY] = 3;
        matrix[this.x][this.y] = 0;
      } else  if(matrix[newX][newY] = 1) {
          matrix[newX][newY] = 3;
          matrix[this.x][this.y] = 1;
        }
        this.x = newX;
        this.y = newY;
      } else if (this.energy < 0) {
          this.die();
        }
  }
  mul() {
    let emptyCell= this.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell && this.energy >= 15) {
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 3;
      let gazanik = new Gazanik(newX, newY);
      gazanikArr.push(gazanik);
      this.energy -= 4;
    } else {
        this.eat();
      }
  }
  eat() {
    let emptyCell = this.chooseCell(2);  //"2" index unecoxina utum
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell) {
      this.energy += 2;
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 3;
      matrix[this.x][this.y] = 0;
      for (let i = 0; i < grassEaterArr.length; i++) {    //um utuma dra arr-ov petqa pttvenq
        if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY ){
          grassEaterArr.splice(i, 1);
        }
      }
      this.x = newX;
      this.y = newY;
    } else {
        this.move();
      }
  }
  die() {
    matrix[this.x][this.y] = 0;  //datarka sarqum ira texy
    for (let i = 0; i < gazanikArr.length; i++) {
      if (gazanikArr[i].x == this.x && gazanikArr[i].y == this.y) {
        gazanikArr.splice(i, 1);
      }
    }
  }
}
class Mard {         //indexy 4
  constructor(x, y) {
        this.x = x;
        this.y = y;
        this.directions = [];
        this.energy = 9;
    }
  getNewCordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y    ],
      [this.x + 1, this.y    ],
      [this.x - 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(ch) {
    this.getNewCordinates();
    let found = [];
    for (let i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == ch) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  move() {
    let emptyCell0 = this.chooseCell(0);
    let emptyCell1 = this.chooseCell(1);
    let arr = [...emptyCell0, ...emptyCell1]
    let newCell = arr[Math.floor(Math.random() * arr.length)];
    if (newCell && this.energy >= 0) { 
      this.energy--; 
      let newX = newCell[0];
      let newY = newCell[1];
      if(matrix[newX][newY] = 0) {
        matrix[newX][newY] = 4;
        matrix[this.x][this.y] = 0;
      } else if(matrix[newX][newY] = 1) {
          matrix[newX][newY] = 4;
          matrix[this.x][this.y] = 1;
        }
      this.x = newX;
      this.y = newY;
    } else if (this.energy < 0) {
        this.die();
      }
  }
  mul() {
    let emptyCell= this.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell && this.energy >= 15) {
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 4;
      let mard = new Mard(newX, newY);
      mardArr.push(mard);
      this.energy -= 4;
      } else {
        this.eat();
        }
  }
  eat() {
    let emptyCell0 = this.chooseCell(2);
    let emptyCell1 = this.chooseCell(3);
    let arr = [...emptyCell0, ...emptyCell1];
    let newCell = arr[Math.floor(Math.random() * arr.length)];
    if (newCell) {
      this.energy += 2;
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 4;
      matrix[this.x][this.y] = 0;
      for (let i = 0; i < grassEaterArr.length; i++) {   //grassEaterina utelu dra hamar ira arr-i vrov enq frum
        if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY ){
          grassEaterArr.splice(i, 1);
        }
      }
      for (let i = 0; i < gazanikArr.length; i++) { //gazanikina el a utelu dra hamar ira vrov el enq frum
        if (gazanikArr[i].x == newX && gazanikArr[i].y == newY ){
          gazanikArr.splice(i, 1);
        }
      }
      this.x = newX;
      this.y = newY;
    } else {
      this.move();
    }
  }
  die() {
    matrix[this.x][this.y] = 0;
    for (let i = 0; i < mardArr.length; i++) {
      if (mardArr[i].x == this.x && mardArr[i].y == this.y) {
        mardArr.splice(i, 1);
      }
    }
  }
}
class Jur {      //indexy 5
  constructor(x, y) {
    this.x = x; 
    this.y = y;
    this.multiply = 0;
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y    ],
      [this.x + 1, this.y    ],
      [this.x - 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(char) {
    let found = [];
    for (const i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  mul() {  
    this.multiply++; 
    console.log(this.multiply)
    let emptyCell = this.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell && this.multiply >= 3) {
      console.log('mul2')
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 5;
      let jur = new Jur(newX, newY);
      jurArr.push(jur);
      this.multiply = 0;
    }
  }
}
class Dzuk {            //indexy 6
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.energy = 8;
    this.directions = [];
  }
  getNewCordinates() {
    this.directions = [
      [this.x - 1, this.y - 1],
      [this.x    , this.y - 1],
      [this.x + 1, this.y - 1],
      [this.x - 1, this.y    ],
      [this.x + 1, this.y    ],
      [this.x - 1, this.y + 1],
      [this.x    , this.y + 1],
      [this.x + 1, this.y + 1],
    ];
  }
  chooseCell(char) {
    this.getNewCordinates();
    let found = [];
    for (const i in this.directions) {
      let x = this.directions[i][0];
      let y = this.directions[i][1];
      if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
        if (matrix[x][y] == char) {
          found.push(this.directions[i]);
        }
      }
    }
    return found;
  }
  move() {    
    let emptyCells = this.chooseCell(0);
    let emptyCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    if (emptyCell && this.energy > 0) {
      this.energy--;
      let newX = emptyCell[0];
      let newY = emptyCell[1];
      matrix[newX][newY] = 6;
      matrix[this.x][this.y] = 0;
      this.x = newX;
      this.y = newY;
    } else if(this.energy <= 0){
      this.die();
    }
  }
  eat() {
    let jurCells = this.chooseCell(5);    //"5" index unecoxina utum
    let jurCell = jurCells[Math.floor(Math.random() * jurCells.length)];
    if (jurCell && this.energy > 0) {
      this.energy++;
      let newX = jurCell[0];
      let newY = jurCell[1];
      matrix[newX][newY] = 6;
      matrix[this.x][this.y] = 0;
      for (let i = 0; i < jurArr.length; i++) {
        if(newX == jurArr[i].x && newY == jurArr[i].y){
          jurArr.splice(i, 1);
        }
      }
      this.x = newX;
      this.y = newY;
    } else {
      this.move();
    }
  }
  mul() {
    let emptyCell = this.chooseCell(0);
    let newCell = emptyCell[Math.floor(Math.random() * emptyCell.length)];
    if (newCell && this.energy >= 9) {
      let newX = newCell[0];
      let newY = newCell[1];
      matrix[newX][newY] = 6;
      let dzuk = new Dzuk(newX, newY);
      dzukArr.push(dzuk);
      this.energy = 8;
    }
  }
  die(){
    matrix[this.x][this.y] = 5;
    for (let i = 0; i < dzukArr.length; i++) {
      if(this.x == dzukArr[i].x && this.y == dzukArr[i].y){
        dzukArr.splice(i, 1);
      }
    }
  }
}