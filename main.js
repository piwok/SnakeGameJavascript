class Cell {
    static cell_obj = {};

    constructor(x_index, y_index, x_pos, y_pos) {
        this.x = x_index;
        this.y = y_index;
        this.x_pos = x_pos;
        this.y_pos = y_pos;
        this.cell = document.createElement('div');
        this.cell.setAttribute('class', 'celdaVacia');
        this.cell.style.left = `${this.x_pos}px`;
        this.cell.style.top = `${this.y_pos}px`;
        this.cell.style.padding = '5px';
        document.getElementById('grid').appendChild(this.cell);
        //this.cell.addEventListener('click', this.exploreCell());
        Cell.cell_obj[`${this.x},${this.y}`] = this;

        
    }
}

window.onload = function init() {
    //tablero de 20 por 14.
    for (var i = 0; i<20; i++) {
        for (var j = 0; j<14; j++) {
            new_cell = new Cell (i, j, 35*i, 35*j);
        }
    }
}

console.log(Cell.cell_obj);