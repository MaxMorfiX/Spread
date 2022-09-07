const SEP = '_';
let cells = [];
let gameField = $('#gameSquare');
let cellSize;





class Game {
    
    mapSize = 5;
    playerCount = 3;
    
    constructor() {}
    
    start() {
        this.fitToSize();
        
        this.createMap(this.mapSize);
    }
    
    fitToSize() {
        $('#gameSquare').height(window.innerHeight).width(window.innerHeight);
    }
    
    
    createMap(size) {
        
        cellSize = gameField.height()/(size + (size - 1)/3);
        
        for(let j = 0; j < size; j++) {
            for(let i = 0; i < size; i++) {
                
                
                let x = Math.floor(i*(cellSize + cellSize / 3));
                let y = gameField.height() - cellSize - Math.floor(j*(cellSize + cellSize / 3));
                
                if (j === 0) {
                    if (i === 0) {
                        cells.push(new Cell(vec2(x, y), 'LT'));
                    } else if (i === size - 1) {
                        cells.push(new Cell(vec2(x, y), 'RT'));
                    } else {
                        cells.push(new Cell(vec2(x, y), 'T'));
                    }
                } else if (j === size - 1) {
                    if (i === 0) {
                        cells.push(new Cell(vec2(x, y), 'LB'));
                    } else if (i === size - 1) {
                        cells.push(new Cell(vec2(x, y), 'RB'));
                    } else {
                        cells.push(new Cell(vec2(x, y), 'B'));
                    }
                } else if (i === 0) {
                    cells.push(new Cell(vec2(x, y), 'L'));
                } else if (i === size - 1) {
                    cells.push(new Cell(vec2(x, y), 'R'));
                } else {
                    cells.push(new Cell(vec2(x, y), 'C'));
                }
            }
        }
        
        $('.cell').show();
        $('.cell').width(cellSize);
        $('.cell').height(cellSize);
        
    }
}




class Cell {
    
    x;
    y;
    type;
    id;
    stableBlocks = [];
    batteries;
    
    constructor(pos, type) {
        
        this.x = pos.x;
        this.y = pos.y;
        this.type = type;
        this.id = cells.length;
        this.htmlId = 'cell' + this.id;
        
        var html;
                
        if (type === 'LB') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Co.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: false, 3: true, 4: false, 'total': 2};
        } else if (type === 'B') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Bo.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: true, 3: true, 4: false, 'total': 3};
        } else if (type  === 'RB') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Co.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: true, 3: false, 4: false, 'total': 2};
        } else if (type  === 'L') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Bo.png'); background-size: 100% 100%; left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: false, 3: true, 4: true, 'total': 3};
        } else if (type  === 'C') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Ce.png'); background-size: 100% 100%; left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: true, 3: true, 4: true, 'total': 4};
        } else if (type  === 'R') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Bo.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: true, 3: false, 4: true, 'total': 3};
        } else if (type  === 'LT') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Co.png'); background-size: 100% 100%; left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: false, 2: false, 3: true, 4: true, 'total': 2};
        } else if (type  === 'T') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Bo.png'); background-size: 100% 100%; transform: rotate(500grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: false, 2: true, 3: true, 4: true, 'total': 3};
        } else if (type === 'RT') {
            html = `<div id="${this.id}" onclick="addElement(${cells[this.id]});" class="cell" style=" background: url('../../textures/Co.png'); background-size: 100% 100%; left: ${pos.x}px; transform: rotate(500grad); bottom: ${pos.y}px"></div>`;
            this.batteries = {1: false, 2: true, 3: false, 4: true, 'total': 2};
        }
        
//        if(this.batteries['1'])
//            this.stableBlocks.push(new StableBlock(vec2(pos.x + 32, pos.y + 62), this, this.stableBlocks.length));
//        if(this.batteries['2'])
//            this.stableBlocks.push(new StableBlock(vec2(pos.x + 2, pos.y + 32), this, this.stableBlocks.length));
//        if(this.batteries['3'])
//            this.stableBlocks.push(new StableBlock(vec2(pos.x + 62, pos.y + 32), this, this.stableBlocks.length));
//        if(this.batteries['4'])
//            this.stableBlocks.push(new StableBlock(vec2(pos.x + 32, pos.y + 2), this, this.stableBlocks.length));
//        
        gameField.append(html);
        
    }
    
    addElement() {
        
    }
    
}

class StableBlock {
    
    x;
    y;
    ownerCell;
    htmlId;
    
    constructor(pos, owner, id) {
        this.x = pos.x;
        this.y = pos.y;
        this.ownerCell = owner.id;
        this.htmlId = owner + SEP + id;
        
        var html = `<div id="stBl${this.htmlId}" class="block"
                    style="background-color: red; color: red;
                    left: ${pos.x}px; bottom: ${pos.y}px"></div>`;
        
        gameField.append(html);
    }
    
}











let game = new Game();
game.mapSize = 3;
game.start();