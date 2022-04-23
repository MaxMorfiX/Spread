const SEP = '_';
var field = $('#field')
var mapSize = 4;
var blockSize = 90;
var energy = {};
blocksIds = {};

start();

function start() {
    mapSize = prompt("Name");
    startGame();
}

function startGame() {
    createMap();
}

function create(type, left, bottom) {
    
    if(type == 'LB') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Co.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type == 'B') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Bo.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'RB') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Co.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'L') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Bo.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'C') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Ce.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'R') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Bo.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'LT') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Co.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type  == 'T') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Bo.png'); background-size: 100% 100%; transform: rotate(500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type == 'RT') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('textures/Co.png'); background-size: 100% 100%; left: ${left}px; transform: rotate(500grad); bottom: ${bottom}px"></div>`;
    } else if(type == 'block') {
        var html = `<div id="sq${left}${SEP}${bottom}" class="block" style="background-color: red; color: red; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type == 'cycle') {
        var html = `<div id="cy${left}${SEP}${bottom}" class="cycle" style="background: url('textures/cycle.png'); background-size: 100% 100%; color: red; left: ${left}px; bottom: ${bottom}px"></div>`;
    }
//    console.log(type);
    blocksIds[left + SEP + bottom] = type;
    field.append(html);
}
function createMap() {
    field.height(mapSize*(blockSize + blockSize / 3) - blockSize / 3).width(mapSize*(blockSize + blockSize / 3) - blockSize / 3);
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
            
            energy[x + SEP + y] = 0;
            
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

function addElement(x, y) {
    if(blocksIds[x + SEP + y] == 'LT') {
        if(energy[x + SEP + y] == 0) {
            create('cycle', x + 31.5, y + 31.5);
            create('block', x + 62, y + 32);
        } else if (energy[x + SEP + y] == 1) {
            create('block', x + 32, y + 2);
        }
         
    } else if(blocksIds[x + SEP + y] == 'T') {
        if(energy[x + SEP + y] == 0) {
            create('cycle', x + 31.5, y + 31.5);
            create('block', x + 2, y + 32);
        } else if (energy[x + SEP + y] == 1) {
            create('block', x + 62, y + 32);
        } else if (energy[x + SEP + y] == 2) {
             create('block', x + 32, y + 2);
         }
    } else if(blocksIds[x + SEP + y] == 'C') {
        if(energy[x + SEP + y] == 0) {
            create('cycle', x + 31.5, y + 31.5);
            create('block', x + 32, y + 62);
        } else if (energy[x + SEP + y] == 1) {
            create('block', x + 2, y + 32);
        } else if (energy[x + SEP + y] == 2) {
            create('block', x + 62, y + 32);
         } else if(energy[x + SEP + y] == 3) {
             create('block', x + 32, y + 2);
         }
    }  else if (blocksIds[x + SEP + y] == 'L') {
         if (energy[x + SEP + y] == 0) {
             create('cycle', x + 31.5, y + 31.5);
             create('block', x + 32, y + 62);
         } else if (energy[x + SEP + y] == 1) {
             create('block', x + 62, y + 32);
         } else if (energy[x + SEP + y] == 2) {
             create('block', x + 32, y + 2);
         }
    } else if (blocksIds[x + SEP + y] == 'R') {
          if (energy[x + SEP + y] == 0) {
              create('cycle', x + 31.5, y + 31.5);
              create('block', x + 32, y + 62);
          } else if (energy[x + SEP + y] == 1) {
              create('block', x + 2, y + 32);
          } else if (energy[x + SEP + y] == 2) {
              create('block', x + 32, y + 2);
          }
    } else if (blocksIds[x + SEP + y] == 'RT') {
           if (energy[x + SEP + y] == 0) {
               create('cycle', x + 31.5, y + 31.5);
               create('block', x + 2, y + 32);
           } else if (energy[x + SEP + y] == 1) {
               create('block', x + 32, y + 2);
           }
    } else if (blocksIds[x + SEP + y] == 'LB') {
            if (energy[x + SEP + y] == 0) {
                create('cycle', x + 31.5, y + 31.5);
                create('block', x + 32, y + 62);
            } else if (energy[x + SEP + y] == 1) {
                create('block', x + 62, y + 32);
            }
    } else if (blocksIds[x + SEP + y] == 'B') {
             if (energy[x + SEP + y] == 0) {
                 create('cycle', x + 31.5, y + 31.5);
                 create('block', x + 32, y + 62);
             } else if (energy[x + SEP + y] == 1) {
                 create('block', x + 2, y + 32);
             } else if (energy[x + SEP + y] == 2) {
                 create('block', x + 62, y + 32);
             }
    } else if (blocksIds[x + SEP + y] == 'RB') {
              if (energy[x + SEP + y] == 0) {
                  create('cycle', x + 31.5, y + 31.5);
                  create('block', x + 32, y + 62);
              } else if (energy[x + SEP + y] == 1) {
                  create('block', x + 2, y + 32);
          }
    }
    
    energy[x + SEP + y]++;
}



/*
$(this).attr('id', 'something')
*/