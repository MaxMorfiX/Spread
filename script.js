const SEP = '_';
var field = $('#field')
var mapSize = 3;
var blockSize = 50;

startGame();

function start() {
    
}
function startGame() {
    createMap();
}
function create(type, left, bottom) {
    var html = `<div id="${left}${SEP}${bottom}" background: url('textures/${type}') onclick='', class="mapBlock" style= left: ${left}px; bottom: ${bottom}px">`;
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
            
            var x = Math.floor(i*(blockSize + blockSize / 3) + blockSize / 3);
            var y = Math.floor(j*(blockSize + blockSize / 3) + blockSize / 3);
            
            if(j == 0) {
                createWhichBlock('LB0', 'B0', 'RB0');
            } else if(j == mapSize - 1) {
                createWhichBlock('LT0', 'T0', 'RT0');
            } else {
                createWhichBlock('L0', 'C0', 'R0');
            }
        }
    }
  $('.mapBlock').show();
}
