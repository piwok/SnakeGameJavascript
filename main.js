class Cell {
    static cell_obj = {};

    constructor (x_index, y_index, x_pos, y_pos, clase) {
        this.objeto_ocupando_celda = '';
        this.x = x_index;
        this.y = y_index;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.cell = document.createElement('div');
        this.cell.setAttribute('class', 'celdaVacia');
        this.cell.style.left = `${this.x_pos}px`;
        this.cell.style.top = `${this.y_pos}px`;
        document.getElementById('grid').appendChild(this.cell);
        //this.cell.addEventListener('click', this.exploreCell());
        Cell.cell_obj[`${this.x},${this.y}`] = this;

        
    }
}

class Snake {
    //la posicion cero de this.snake es head y la ultima posicion tail
    
    constructor (initial_snake, speed) {
        this.speed = speed;
        this.animacion = setInterval(() => {
            
        }, this.speed);
        
        this.snake = [];
        initial_snake.forEach(element => this.snake.push(element));
        console.log(this.snake);
            
        }
        
    }

class Grid {

    constructor (width, height) {
        this.div = document.createElement('div');
        this.div.setAttribute('id', 'grid');
        this.width = width;
        this.height = height;
        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;
        document.getElementById('root').appendChild(this.div);
        
        
    }
}



window.onload = function init() {
    //tablero de 20 por 14.
    var grid = new Grid (700, 490);
//      for (var i = 0; i<20; i++) {
//          for (var j = 0; j<14; j++) {
//              new_cell = new Cell (i, j, 35*i, 35*j);
//          }
//      }
//  }
}
