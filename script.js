let grassArr = [];
let grassEaterArr = [];
let gazanikArr = []; 
let mardArr = [];
let jurArr = [];
let dzukArr = [];
let matrix = [];
function generator(n, gr, grEat, gazanik, mard, jur, dzuk) {
  for (let x = 0; x < n; x++) {
    matrix[x] = [];
    for (let y = 0; y < n; y++) {
      matrix[x][y] = 0;        
    }
  }
  for (let i = 0; i < gr; i++) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    if(matrix[x][y] == 0) {
      matrix[x][y] = 1;
    }
  }
  for (let i = 0; i < grEat; i++) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    if(matrix[x][y] == 0) {
      matrix[x][y] = 2;
    }
  }
  for (let i = 0; i < gazanik; i++) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    if(matrix[x][y] == 0) {
      matrix[x][y] = 3;
    }
  }
  for (let i = 0; i < mard; i++) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    if(matrix[x][y] == 0) {
      matrix[x][y] = 4;
    }
  }
  for (let i = 0; i < jur; i++) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    if(matrix[x][y] == 0) {
      matrix[x][y] = 5;
    }
  }
  for (let i = 0; i < dzuk; i++) {
    let x = Math.floor(Math.random() * n);
    let y = Math.floor(Math.random() * n);
    if(matrix[x][y] == 0) {
      matrix[x][y] = 6;
    }
  }
}
generator(60, 30, 40, 60, 20, 30, 40);
let side = 10;
function setup() {
  createCanvas(matrix[0].length * side + 1, matrix.length * side + 1);
  background("grey");
  frameRate(1000);
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] == 1) {
        let gr = new Grass(x, y);
        grassArr.push(gr);
      }
      else if (matrix[x][y] == 2) {
        let grEat = new GrassEater(x, y);
        grassEaterArr.push(grEat);
      }
      else if (matrix[x][y] == 3) {
        let gazanik = new Gazanik(x, y);
        gazanikArr.push(gazanik);
      }
      else if (matrix[x][y] == 4) {
        let mard = new Mard(x, y);
        mardArr.push(mard);
      } 
      else if (matrix[x][y] == 5) {
        let jur = new Jur(x, y);
        jurArr.push(jur);
      }
       else if (matrix[x][y] == 6) {
        let dzuk = new Dzuk(x, y);
        dzukArr.push(dzuk);
      }
    }
  }
}
function draw() {
  for (let x = 0; x < matrix.length; x++) {
    for (let y = 0; y < matrix[x].length; y++) {
      if (matrix[x][y] == 0) {
        fill("grey");
      } else if (matrix[x][y] == 1) {
        fill("green");
      }
       else if (matrix[x][y] == 2) {
        fill("yellow");
      }
      else if (matrix[x][y] == 3) {
        fill(230, 21, 21);
      }
      else if (matrix[x][y] == 4) {
        fill(140, 235, 52);
      } 
      else if (matrix[x][y] == 5) {
        fill("blue");
      }
       else if (matrix[x][y] == 6) {
        fill(232, 3, 252);
      }
      rect(y * side, x * side, side, side);
    }
  }
  for (const i in grassArr) {
    grassArr[i].mul();
  }
  for (const i in grassEaterArr) {
    grassEaterArr[i].mul();
    grassEaterArr[i].eat(); 
  } 
  for (const i in gazanikArr) {
    gazanikArr[i].mul();
  }
  for (const i in mardArr) {
    mardArr[i].mul();
  }
  for (const i in jurArr) {
    jurArr[i].mul();
  }
  for (const i in dzukArr) {
    dzukArr[i].mul();
    dzukArr[i].eat(); 
  }
}