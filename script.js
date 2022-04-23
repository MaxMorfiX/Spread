const SEP = '_';
var field = $('#field')
var mapSize = 4;
var blockSize = 100;

startGame();

function start() {
    
}
function startGame() {
    createMap();
}
function create(type, left, bottom) {
    
    if(type == 'LB') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Co.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type == 'B') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Bo.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'RB') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Co.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'L') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Bo.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'C') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Ce.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'R') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Bo.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'LT') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Co.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'T') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Bo.png'); background-size: 100% 100%; transform: rotate(500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type == 'RT') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="" class="mapBlock" style=" background: url('textures/Co.png'); background-size: 100% 100%; left: ${left}px; transform: rotate(500grad); bottom: ${bottom}px"></div>`;
    }
    console.log(type);
    field.append(html);
}

function createMap() {
    function createWhichBlock(left, center, right) {
        if(i == 0) {
            create(left, x, y);
        } else if(i == mapSize - 1) {
            create(right, x, y);
        } else {
            create(center, x, y);
        }
    }
    for (j = 0; j < mapSize; j++) {
        for (i = 0; i < mapSize; i++) {
            
            var x = Math.floor(i*(blockSize + blockSize / 3));
            var y = field.height() - blockSize - Math.floor(j*(blockSize + blockSize / 3));
            
            if(j == 0) {
                createWhichBlock('LT', 'T', 'RT');
            } else if(j == mapSize - 1) {
                createWhichBlock('LB', 'B', 'RB');
            } else {
                createWhichBlock('L', 'C', 'R');
            }
        }
    }
  $('.mapBlock').show();
}
