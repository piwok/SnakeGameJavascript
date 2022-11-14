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

function sumTwoStrNumArrays (array1, array2) {
    var temp = [];
    array1 = array1.split(',');
    array2 = array2.split(',');
    for(i = 0; i < array1.length; i++) {
        temp[i] = parseInt(array1[i]) + parseInt(array2[i]);
    }

    return temp.toString();
}

function extractValueFromArray (value, array) {
    let index = array.indexOf(value);
    low = array.slice(0, index);
    high = array.slice(index+1);
    return low.concat(high);

}

// function createInterval(f,dynamicParameter,interval) {
//      setInterval(function() {
//          f(dynamicParameter); }, interval); 
// } 


class Cell {
    
    constructor (x_index, y_index, x_pos, y_pos) {
        this.coordinates = [x_index, y_index].toString();
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.cell = document.createElement('div');
        this.cell.setAttribute('class', 'celdaVacia');
        this.cell.style.left = `${this.x_pos}px`;
        this.cell.style.top = `${this.y_pos}px`;
    }

    getX_Pos () {
        return this.x_pos;

    }

    getY_Pos () {
        return this.y_pos;
        
    }

    getClass () {
        console.log(this.getClass());
    }

}

class Snake {
    
    static options = {'n':'1,0', 'e':'0,1', 's':'1,0', 'w':'1,0'};

    constructor (initial_snake, speed) {
        this.speed = speed;
        this.compass = '1,0';
        this.snake = {'head': '', 'body': [], 'tail': ''};
        this.snake['head'] = initial_snake[0];
        this.snake['tail'] = initial_snake.slice(-1).toString();
        this.snake[`body`] = initial_snake.slice(1,-1);
        
    }
        
    }

class Grid {

    constructor (width, height) {
        this.cell_obj = {};
        this.div = document.createElement('div');
        this.div.setAttribute('id', 'grid');
        this.width = width;
        this.height = height;
        this.div.style.width = `${this.width}px`;
        this.div.style.height = `${this.height}px`;
        this.direction = '1,0'
        this.snake = '';
        this.id_interval = '';
        this.posibleFruta = [];
        document.getElementById('root').appendChild(this.div);
                
    }

    addCell (new_cell) {
        
        
        this.cell_obj[new_cell.coordinates.toString()] = new_cell;
        this.posibleFruta.push(new_cell.coordinates);
        this.div.appendChild(new_cell.cell);

    }
    
    addSnake (new_snake) {
        this.snake = new_snake;
        this.cell_obj[this.snake.snake['head']].cell.setAttribute('class', 'celdaSnake');
        this.snake.snake['body'].forEach ( (element => 
            this.cell_obj[element].cell.setAttribute('class', 'celdaSnake')));
        this.cell_obj[this.snake.snake['tail']].cell.setAttribute('class', 'celdaSnake');
        this.posibleFruta = extractValueFromArray(this.snake.snake['head'], this.posibleFruta);
        this.posibleFruta = extractValueFromArray(this.snake.snake['tail'], this.posibleFruta);
        for (let i = 0; i<this.snake.snake['body'].length; i++) {
            this.posibleFruta = extractValueFromArray(this.snake.snake['body'][i], this.posibleFruta);
        }
        this.id_interval = setInterval(() => {this.snakeMoves()}, 100);
    }

    snakeMoves () {
        var new_head_coordinates = sumTwoStrNumArrays(this.cell_obj[this.snake.snake['head']].coordinates, this.direction);
        this.cell_obj[new_head_coordinates].cell.setAttribute('class', 'celdaSnake');
        var new_tail_coordinates = this.snake.snake['body'].slice(-1).toString();
        this.snake.snake['body'].unshift(this.snake.snake['head']);
        var new_body_coordinates = this.snake.snake['body'].slice(0,-1);
        this.snake.snake['head'] = new_head_coordinates;
        this.posibleFruta = extractValueFromArray(this.snake.snake['head'], this.posibleFruta);
        this.snake.snake['body'] = new_body_coordinates;
        this.cell_obj[this.snake.snake['tail']].cell.setAttribute('class', 'celdaVacia');
        this.posibleFruta.push(this.snake.snake['tail']);
        console.log(this.snake.snake['tail']);
        this.snake.snake['tail'] = new_tail_coordinates;
        console.log(this.posibleFruta.length);
        if (this.posibleFruta.length>270) {
            clearInterval(this.id_interval);
            console.log(this.posibleFruta);
        }
        
    
    }

    generarFruta () {
        let seed = Math.floor(this.posibleFruta.length*Math.random());
        this.cell_obj[this.posibleFruta[seed]].cell.setAttribute('class', 'celdaFruta');
        console.log(this.cell_obj[this.posibleFruta[seed]].cell.getAttribute('class'));
    }

}

window.onload = function init() {
    //tablero de 20 por 14.
    var grid = new Grid (700, 490);
    var snake = new Snake(['14,10', '13,10', '12,10', '11,10', '10,10', '9,10', '8,10', '7,10', '6,10', '5,10'], 1);
    for (var i = 0; i<20; i++) {
        for (var j = 0; j<14; j++) {
            new_cell = new Cell (i, j, 35*i, 35*j);
            grid.addCell(new_cell);
            }
        }
    
    grid.addSnake(snake);
    window.addEventListener("keydown", function(event) {
        if (event.defaultPrevented) {
            return;
        }
        if (event.code === "ArrowDown" && grid.direction != '0,-1') {
            grid.direction = '0,1';
        }

        else if (event.code === "ArrowUp" && grid.direction != '0,1') {
            grid.direction = '0,-1';
            
        }

        else if (event.code === "ArrowLeft" && grid.direction != '1,0') {
            grid.direction = '-1,0';
        } 
        
        else if (event.code === "ArrowRight" && grid.direction != '-1,0'){
            grid.direction = '1,0';
        }

        
        event.preventDefault();
      }, true);
    //createInterval(prueba, grid, 500);
    
    
    
    
}



