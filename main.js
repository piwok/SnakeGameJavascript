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

class InfoPanel {

    constructor (name, div_class, text_class, initial_text) {
        this.name = name;
        this.div_class_ = div_class;
        this.text_class = text_class;
        this.initial_text = initial_text;
        this.div = document.createElement('div');
        this.div.setAttribute('class', div_class);
        document.getElementById('root').appendChild(this.div);
        this.text = document.createElement('p');
        this.text.setAttribute('class', text_class);
        this.div.appendChild(this.text);
        this.text.innerHTML= initial_text;
    
    }
}


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

    comerFruta (new_head_coordinates) {
        this.snake['body'].unshift(this.snake['head']);
        this.snake['head'] = new_head_coordinates;
    
    }        
    }

class Grid {

    constructor (width, height, left_top_panel, right_top_panel) {
        this.cell_obj = {};
        this.left_top_panel = left_top_panel;
        this.right_top_panel = right_top_panel;
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
        this.fruta = '';
        this.intervals = {'timer fruta': ''};
        this.fruta_podrida_counter = 0;
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
        this.id_interval = setInterval(() => {this.snakeMoves()}, 150);
    }

    snakeMoves () {
        let new_head_coordinates = sumTwoStrNumArrays(this.cell_obj[this.snake.snake['head']].coordinates, this.direction);
        if (this.cell_obj[new_head_coordinates].cell.getAttribute('class') === 'celdaVacia') {
            this.cell_obj[new_head_coordinates].cell.setAttribute('class', 'celdaSnake');
            let new_tail_coordinates = this.snake.snake['body'].slice(-1).toString();
            this.snake.snake['body'].unshift(this.snake.snake['head']);
            let new_body_coordinates = this.snake.snake['body'].slice(0,-1);
            this.snake.snake['head'] = new_head_coordinates;
            this.posibleFruta = extractValueFromArray(this.snake.snake['head'], this.posibleFruta);
            this.snake.snake['body'] = new_body_coordinates;
            this.cell_obj[this.snake.snake['tail']].cell.setAttribute('class', 'celdaVacia');
            this.posibleFruta.push(this.snake.snake['tail']);
            this.snake.snake['tail'] = new_tail_coordinates;
        }
            
    
        else if (this.cell_obj[new_head_coordinates].cell.getAttribute('class') === "celdaSnake") {
            clearInterval(this.id_interval);

        }

        else {
            this.snake.comerFruta(new_head_coordinates);
            clearTimeout(this.intervals['timer fruta']);
            this.left_top_panel.text.innerText = `La serpiente esta de gorda ${this.snake.snake['body'].length+2}`;
            this.cell_obj[new_head_coordinates].cell.setAttribute('class', 'celdaSnake');
            this.posibleFruta = extractValueFromArray(this.snake.snake['head'], this.posibleFruta);
            this.generarFruta();
        }
      
        
    
    }

    generarFruta () {
        let seed = Math.floor(this.posibleFruta.length*Math.random());
        this.cell_obj[this.posibleFruta[seed]].cell.setAttribute('class', 'celdaFruta');
        this.fruta = this.cell_obj[this.posibleFruta[seed]];
        this.fruta_podrida_counter = 0;
        console.log(this.fruta_podrida_counter);
        this.intervals['timer fruta'] = setInterval(() => {
            this.right_top_panel.text.innerHTML = `La fruta se pudre en: ${5 - this.fruta_podrida_counter}`;
            this.fruta_podrida_counter += 1;
            if (this.fruta_podrida_counter === 2) {
                this.fruta.cell.setAttribute('class', 'celdaFrutaPodridaFase1');

            }

            else if (this.fruta_podrida_counter === 4) {
                this.fruta.cell.setAttribute('class', 'celdaFrutaPodridaFase2');

            }

            else if (this.fruta_podrida_counter === 5) {
                this.fruta.cell.setAttribute('class', 'celdaVacia');
                clearInterval(this.intervals['timer fruta']);
                this.generarFruta();
            }

        }, 1000)
        
    }

}

window.onload = function init() {
    //tablero de 20 por 14.
    let snake = new Snake(['14,10', '13,10', '12,10', '11,10', '10,10', '9,10', '8,10', '7,10', '6,10', '5,10'], 1);
    let info_panel_snake = new InfoPanel ('info panel snake', 'infoPanelSnake','textInfoPanelSnake', `La serpiente esta de gorda ${snake.snake['body'].length + 2}`);
    let info_panel_fruta = new InfoPanel ('info panel fruta', 'infoPanelFruta', 'textInfoPanelFruta', 'La fruta se pudre en:');
    let grid = new Grid (700, 490, info_panel_snake, info_panel_fruta);
    
    for (var i = 0; i<20; i++) {
        for (var j = 0; j<14; j++) {
            new_cell = new Cell (i, j, 35*i, 35*j);
            grid.addCell(new_cell);
            }
        }
    
    grid.addSnake(snake);
    grid.generarFruta();
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



