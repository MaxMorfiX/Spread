const SEP = '_';
var field = $('#field');
var smallBlockSize = 18;
var mapSize = 3;
var blockSize = 90;
var energy = {};
var batteries = {};
var flBl = {};
var flBlCount = 0;
var x;
var y;
var smallBlockNum;
var squarespeed = 1.8;

start();

function start() {
//    mapSize = prompt("Name");
    startGame();
}

function startGame() {
    createMap();
    smallBlockSizee = $('.block').height()
    cycle();
}


function cycle() {
    checkExplosions();
    moveBlocks();
    setTimeout(cycle, 10);
}

function moveBlocks() {
    for(i = 1; i <= flBlCount; i++) {
        if(flBl[i] == 1) {
            get('flBl' + SEP + i).style.bottom = bottom('flBl' + SEP + i, smallBlockSize) + squarespeed + 'px';
        } else if(flBl[i] == 2) {
            $('#flBl' + SEP + i).offset({left: $('#flBl' + SEP + i).offset().left - squarespeed});
        } else if(flBl[i] == 3) {
            $('#flBl' + SEP + i).offset({left: $('#flBl' + SEP + i).offset().left + squarespeed});
        } else if(flBl[i] == 4) {
            get('flBl' + SEP + i).style.bottom = bottom('flBl' + SEP + i, smallBlockSize) - squarespeed + 'px';
        }
    }
}

function get(id) {
    return document.getElementById(id);
}
function bottom(id, size) {
    return field.height() - $('#' + id).offset().top - size;
}

function checkExplosions() {
    for(prop in energy) {
        if(energy[prop] == batteries[prop]['total']) {
            energy[prop] = 0;
            for(i = 1; i <= 4; i++) {
                if(batteries[prop][i]) {
                    flBlCount++;
                    flBl[flBlCount] = i;
//                    console.log($(`#stBl${SEP + prop + SEP + i}`).offset().left)
                    create('flBl', $(`#stBl${SEP + prop + SEP + i}`).offset().left - 8, bottom(`stBl${SEP + prop + SEP + i}`, smallBlockSize), flBlCount);
                }
            }
            $(`[id^='stBl${SEP}${prop}']`).hide();
        }
    }
}

function addElement(x, y) {
    var j = 1;
    energy[x + SEP + y]++;
    for(i = 1; i <= 4; i++) {
        if(batteries[x + SEP + y][i]) {
            if(j == energy[x + SEP + y]) {
                $('#stBl' + SEP + x + SEP + y + SEP + i).show();
//                console.log('add element  ' + i + '     ' + $('#stBl' + SEP + x + SEP + y + SEP + i).lenght);
                break;
            } else {
                j++;
            }
        }
    }
}




function createMap() {
    field.height(mapSize*(blockSize + blockSize / 3) - blockSize / 3).width(mapSize*(blockSize + blockSize / 3) - blockSize / 3);
    for (j = 0; j < mapSize; j++) {
        for (i = 0; i < mapSize; i++) {
            
            smallBlockNum = 1;
            var currBattery = {};
            
            x = Math.floor(i*(blockSize + blockSize / 3));
            y = field.height() - blockSize - Math.floor(j*(blockSize + blockSize / 3));
            
            
            if(j == 0) {
                if (i == 0) {
                    create('LT', x, y);
                    create('block', x + 62, y + 32, 3);
                    create('block', x + 32, y + 2, 4);
                    currBattery = {1: false, 2: false, 3: true, 4: true, 'total': 2};
                } else if (i == mapSize - 1) {
                    create('RT', x, y);
                    create('block', x + 2, y + 32, 2);
                    create('block', x + 32, y + 2, 4);
                    currBattery = {1: false, 2: true, 3: false, 4: true, 'total': 2};
                } else {
                    create('T', x, y);
                    create('block', x + 2, y + 32, 2);
                    create('block', x + 62, y + 32, 3);
                    create('block', x + 32, y + 2, 4);
                    currBattery = {1: false, 2: true, 3: true, 4: true, 'total': 3};
                }
            } else if(j == mapSize - 1) {
                if (i == 0) {
                    create('LB', x, y);
                    create('block', x + 32, y + 62, 1, 1);
                    create('block', x + 62, y + 32, 3, 3);
                    currBattery = {1: true, 2: false, 3: true, 4: false, 'total': 2};
                } else if (i == mapSize - 1) {
                    create('RB', x, y);
                    create('block', x + 32, y + 62, 1);
                    create('block', x + 2, y + 32, 2);
                    currBattery = {1: true, 2: true, 3: false, 4: false, 'total': 2};
                } else {
                    create('B', x, y);
                    create('block', x + 32, y + 62, 1);
                    create('block', x + 2, y + 32, 2);
                    create('block', x + 62, y + 32, 3);
                    currBattery = {1: true, 2: true, 3: true, 4: false, 'total': 3};
                }
            } else if (i == 0) {
                create('L', x, y);
                create('block', x + 32, y + 62, 1);
                create('block', x + 62, y + 32, 3);
                create('block', x + 32, y + 2, 4);
                currBattery = {1: true, 2: false, 3: true, 4: true, 'total': 3};
            } else if (i == mapSize - 1) {
                create('R', x, y);
                create('block', x + 32, y + 62, 1);
                create('block', x + 2, y + 32, 2);
                create('block', x + 32, y + 2, 4);
                currBattery = {1: true, 2: true, 3: false, 4: true, 'total': 3};
            } else {
                create('C', x, y);
                create('block', x + 32, y + 62, 1);
                create('block', x + 2, y + 32, 2);
                create('block', x + 62, y + 32, 3);
                create('block', x + 32, y + 2, 4);
                currBattery = {1: true, 2: true, 3: true, 4: true, 'total': 4};
            }
            energy[x + SEP + y] = 0;
            batteries[x + SEP + y] = currBattery;
        }
    }
  $('.mapBlock').show();
}
function create(type, left, bottom, other) {
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
    } else if(type == 'cycle') {
        var html = `<div id="cy${left}${SEP}${bottom}" class="cycle" style="background: url('textures/cycle.png'); background-size: 100% 100%; color: red; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type == 'block') {
        var html = `<div id="stBl${SEP + x + SEP + y + SEP + other}" class="block" style="background-color: red; color: red; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if(type == 'flBl') {
        var html = `<div id="flBl${SEP}${other}" class="block" style="display: block; background-color: red; color: red; left: ${left}px; bottom: ${bottom}px"></div>`;
    }
//    console.log(type);
    field.append(html);
}



/*
$(this).attr('id', 'something')

    if(Ids[x + SEP + y] == 'LT') {
        if(energy[x + SEP + y] == 0) {
            create('cycle', x + 31.5, y + 31.5);
            create('block', x + 62, y + 32);
        } else if (energy[x + SEP + y] == 1) {
            create('block', x + 32, y + 2);
        }
         
    } else if(flBlIds[x + SEP + y] == 'T') {
        if(energy[x + SEP + y] == 0) {
            create('cycle', x + 31.5, y + 31.5);
            create('block', x + 2, y + 32);
        } else if (energy[x + SEP + y] == 1) {
            create('block', x + 62, y + 32);
        } else if (energy[x + SEP + y] == 2) {
             create('block', x + 32, y + 2);
         }
    } else if(flBlIds[x + SEP + y] == 'C') {
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
    }  else if (flBlIds[x + SEP + y] == 'L') {
         if (energy[x + SEP + y] == 0) {
             create('cycle', x + 31.5, y + 31.5);
             create('block', x + 32, y + 62);
         } else if (energy[x + SEP + y] == 1) {
             create('block', x + 62, y + 32);
         } else if (energy[x + SEP + y] == 2) {
             create('block', x + 32, y + 2);
         }
    } else if (flBlIds[x + SEP + y] == 'R') {
          if (energy[x + SEP + y] == 0) {
              create('cycle', x + 31.5, y + 31.5);
              create('block', x + 32, y + 62);
          } else if (energy[x + SEP + y] == 1) {
              create('block', x + 2, y + 32);
          } else if (energy[x + SEP + y] == 2) {
              create('block', x + 32, y + 2);
          }
    } else if (flBlIds[x + SEP + y] == 'RT') {
           if (energy[x + SEP + y] == 0) {
               create('cycle', x + 31.5, y + 31.5);
               create('block', x + 2, y + 32);
           } else if (energy[x + SEP + y] == 1) {
               create('block', x + 32, y + 2);
           }
    } else if (flBlIds[x + SEP + y] == 'LB') {
            if (energy[x + SEP + y] == 0) {
                create('cycle', x + 31.5, y + 31.5);
                create('block', x + 32, y + 62);
            } else if (energy[x + SEP + y] == 1) {
                create('block', x + 62, y + 32);
            }
    } else if (flBlIds[x + SEP + y] == 'B') {
             if (energy[x + SEP + y] == 0) {
                 create('cycle', x + 31.5, y + 31.5);
                 create('block', x + 32, y + 62);
             } else if (energy[x + SEP + y] == 1) {
                 create('block', x + 2, y + 32);
             } else if (energy[x + SEP + y] == 2) {
                 create('block', x + 62, y + 32);
             }
    } else if (flBlIds[x + SEP + y] == 'RB') {
              if (energy[x + SEP + y] == 0) {
                  create('cycle', x + 31.5, y + 31.5);
                  create('block', x + 32, y + 62);
              } else if (energy[x + SEP + y] == 1) {
                  create('block', x + 2, y + 32);
          }
    }
*/
