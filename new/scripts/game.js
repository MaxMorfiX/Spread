const SEP = '_';
let sceneController = new SceneController();
let cells = [];
let flBlocks = [];
let gameField = $('#gameSquare');
let cellSize;
let pixMult;






class Game {
    
    mapSize = 5;
    playerCount = 3;
    
    constructor() {}
    
    start() {
        this.createMap(this.mapSize);
    }
    
    createMap(size) {
        
        cellSize = gameField.height()/(size + (size - 1)/3);
        pixMult = cellSize/90;
        
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
        $('.cell').width(cellSize).height(cellSize);
        
    }
}


    

class GameObject {
    htmlId;
    
    show() {
        $('#' + this.htmlId).show();
    }
    hide() {
        $('#' + this.htmlId).hide();
    }
}

class Cell extends GameObject {
    
    x;
    y;
    type;
    id;
    stableBlocks = [];
    batteries = {};
    cycle;
    power = 0;
    
    constructor(pos, type) {
        super();
        
//        console.log('type: ' + type + ', x: ' + pos.x + ', y: ' + pos.y);
        
        this.x = pos.x;
        this.y = pos.y;
        this.type = type;
        this.id = cells.length;
        this.htmlId = 'cell' + this.id;
        
        var html;
                
        if (type === 'LB') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Co.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: false, 2: false, 3: true, 4: true, 'total': 2};
        } else if (type === 'B') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Bo.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: false, 3: true, 4: true, 'total': 3};
        } else if (type  === 'RB') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Co.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: false, 2: false, 3: true, 4: true, 'total': 2};
        } else if (type  === 'L') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Bo.png'); background-size: 100% 100%; left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: false, 3: true, 4: true, 'total': 3};
        } else if (type  === 'C') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Ce.png'); background-size: 100% 100%; left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: true, 3: true, 4: true, 'total': 4};
        } else if (type  === 'R') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Bo.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: false, 3: true, 4: true, 'total': 3};
        } else if (type  === 'LT') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Co.png'); background-size: 100% 100%; left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: false, 2: false, 3: true, 4: true, 'total': 2};
        } else if (type  === 'T') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Bo.png'); background-size: 100% 100%; transform: rotate(500grad); left: ${pos.x}px; bottom: ${pos.y}px;"></div>`;
            this.batteries = {1: true, 2: false, 3: true, 4: true, 'total': 3};
        } else if (type === 'RT') {
            html = `<div id="${this.htmlId}" onclick="cells[${this.id}].addElement();" class="cell" style=" background: url('../textures/Co.png'); background-size: 100% 100%; left: ${pos.x}px; transform: rotate(500grad); bottom: ${pos.y}px"></div>`;
            this.batteries = {1: false, 2: false, 3: true, 4: true, 'total': 2};
        }
        
        $('#cellsContainer').append(html);
        
        if(this.batteries['1'])
            this.stableBlocks.push(new StableBlock(vec2(32, 62), this, this.stableBlocks.length));
        if(this.batteries['2'])
            this.stableBlocks.push(new StableBlock(vec2(2, 32), this, this.stableBlocks.length));
        if(this.batteries['3'])
            this.stableBlocks.push(new StableBlock(vec2(62, 32), this, this.stableBlocks.length));
        if(this.batteries['4'])
            this.stableBlocks.push(new StableBlock(vec2(32, 2), this, this.stableBlocks.length));
        
        this.cycle = new CellCycle(this);
        
    }
    
    addElement() {
        
        this.stableBlocks[this.power].show();
        
        if(this.power === 0) {
            this.cycle.show();
        } else if(this.power + 1 >= this.batteries.total) {
            this.explode();
            return;
        }
        
        this.power++;
        
    }
    
    explode() {
        this.cycle.hide();
        for(let i in this.stableBlocks) {
            this.stableBlocks[i].hide();
            flBlocks.push(new FlyingBlock(this, vec2(this.stableBlocks[i].x, this.stableBlocks[i].y)));
        }
        this.power = 0;
    }
}

class StableBlock extends GameObject {
    
    x;
    y;
    ownerCell;
    htmlId;
    
    constructor(pos, owner, id) {
        super();
        
        this.x = pos.x*pixMult;
        this.y = pos.y*pixMult;
        this.ownerCell = owner.id;
        this.htmlId = 'stBl' + owner.id + SEP + id;
        
        var html = `<div id="${this.htmlId}" class="stableBlock"
                    style="background-color: red; color: red;
                    width: ${26*pixMult}px; height: ${26*pixMult}px;
                    left: ${this.x}px; bottom: ${this.y}px;
                    "></div>`;
        
        $('#' + owner.htmlId).append(html);
    }

}

class CellCycle extends GameObject {
    
    x;
    y;
    ownerCell;
    htmlId;
    
    constructor(owner) {
        super();
        
        this.x = 31.5*pixMult;
        this.y = 31.5*pixMult;
        this.ownerCell = owner.id;
        this.htmlId = 'cycle' + owner.id;
        
        var html = `<div id="${this.htmlId}" class="cycle"
                    style="background-color: red; color: red;
                    width: ${27*pixMult}px; height: ${27*pixMult}px;
                    background: url('../textures/cycle.png');
                    background-size: 100% 100%;
                    left: ${this.x}px; bottom: ${this.y}px;
                    "></div>`;
        
        $('#' + owner.htmlId).append(html);
    }
    
}

class FlyingBlock extends GameObject {
    constructor(owner, pos, vec2Dest) {
        super();
        
        this.x = owner.x + pos.x;
        this.y = owner.y + pos.y;
        this.id = flBlocks.length;
        this.htmlId = 'flBl' + this.id;
        
        var html = `<div id="${this.htmlId}" class="flyingBlock"
                    style="background-color: red; color: red;
                    width: ${26*pixMult}px; height: ${26*pixMult}px;
                    left: ${this.x}px; bottom: ${this.y}px;
                    "></div>`;
        
        $('#flBlocksContainer').append(html);
    }
}






fitToSize();

sceneController.startGame();



