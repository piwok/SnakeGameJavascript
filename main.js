function convertPxToInt (number_in_px) {
    number_str = number_in_px.slice(0,-2);
    number_str = parseInt(number_str);
    return number_str;

}

function convertIntToPx (int) {
    number = int.toString();
    number += 'px';
    return number;

}


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
        Cell.cell_obj[`${this.x},${this.y}`] = this;

        
    }

    getX_Pos () {
        return this.x_pos;

    }

    getY_Pos () {
        return this.y_pos;
        
    }

}

class Snake {
    //la posicion cero de this.snake es head y la ultima posicion tail
    static options = {'n':'+1,+0', 'e':'+0,-1', 's':'-1,+0', 'w':'+1,+0'};

    constructor (initial_snake, speed) {
        this.speed = speed;
        this.snake = initial_snake;
        this.options = Snake.options['e'];
        
        
            
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
        this.snake = false;
        document.getElementById('root').appendChild(this.div);
                
    }
    addCell (new_cell) {
        this.div.appendChild(new_cell);

    }

    addSnake (new_snake) {
        this.snake = new_snake;
        this.snake.snake.forEach (element => Cell.cell_obj[element].cell.style.backgroundColor = 'green');
        var id_set_interval = setInterval(this.snakeMoves(this.snake), 1000);

    }

    snakeMoves (snake) {
        snake.snake.forEach (function (element) {
            Cell.cell_obj[element].cell.x_pos += '35px';
        
        })
    }

    }

window.onload = function init() {
    //tablero de 20 por 14.
    var grid = new Grid (700, 490);
    var snake = new Snake(['5,10', '6,10', '7,10', '8,10'], 1);
    for (var i = 0; i<20; i++) {
        for (var j = 0; j<14; j++) {
            new_cell = new Cell (i, j, 35*i, 35*j);
            }
        }
    
    grid.addSnake(snake);
    console.log(typeof(Cell.cell_obj['10,0'].getX_Pos()));
    //console.log(convertPxToInt(Cell.cell_obj['0,0'].getX_Pos()));
}

