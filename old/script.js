const SEP = '_';
const f_createMap = true;
const multiplierHitboxes = 32;
var field = $('#field');
var smallBlockSize = 18;
var mapSize = 3;
var gamespeed = 15;
var blockSize = 90;
var energy = {};
var batteries = {};
var flBl = {};
var flBlIsAlive = {};
var flBlCount = 0;
var hitboxes = {};
var x;
var y;
var squarespeed = 3;

start();

function get(id) {
    return document.getElementById(id);
}
function bottom(selector, size) {
    size = size || smallBlockSize;
    return field.height() - $(selector).offset().top - size;
}


function start() {
 //    mapSize = prompt("Name");
    startGame();
}

function startGame() {
//    mapSize = prompt('map size');
    fitToSizeEnd();
    createMap();
    smallBlockSizee = $('.block').height();
    cycle();
}

function cycle() {
    checkExplosions();
    moveBlocks();
    checkBlocksCollisions();
    setTimeout(cycle, gamespeed);
}

function checkExplosions() {
    for (var prop in energy) {
        if (energy[prop] < batteries[prop]['total']) {
            continue;
        }
        
        $(`#cy${prop}`).hide();
        energy[prop] -= batteries[prop]['total'];
        for (i = 1; i <= 4; i++) {
            if (!batteries[prop][i]) {
                continue;
            }
            
            flBlCount++;
            flBl[flBlCount] = i;
            flBlIsAlive[flBlCount] = true;
//                    console.log($(`#stBl${SEP + prop + SEP + i}`).offset().left)
            var stBlSelector = `#stBl${SEP + prop + SEP + i}`;
            create('flBl', $(stBlSelector).offset().left - 8, $(stBlSelector).bottom(), flBlCount);
        }
        $(`[id^='stBl${SEP}${prop}']`).hide();
    }
}
function moveBlocks() {
    for (i = 1; i <= flBlCount; i++) {
//        console.log(flBlIsAlive)
        if (!flBlIsAlive[i]) {
            continue;
        }
        
        var flBlSelector = '#flBl' + SEP + i;
        
        if (flBl[i] === 1) {
            get('flBl' + SEP + i).style.bottom = $(flBlSelector).bottom() + squarespeed + 'px';
            get('flBl' + SEP + i).style.bottom = bottom(flBlSelector) + squarespeed + 'px';
        } else if (flBl[i] === 2) {
            $(flBlSelector).offset({left: $(flBlSelector).offset().left - squarespeed});
        } else if (flBl[i] === 3) {
            $(flBlSelector).offset({left: $(flBlSelector).offset().left + squarespeed});
        } else if (flBl[i] === 4) {
            get('flBl' + SEP + i).style.bottom = $(flBlSelector).bottom() - squarespeed + 'px';
        }
    }
}
function checkBlocksCollisions() {
    for (var i = 1; i <= flBlCount; i++) {
        if (!flBlIsAlive[i]) {
            continue;
        }
        
        var left = $('#flBl' + SEP + i).offset().left;
        var bottom = field.height() - $('#flBl' + SEP + i).offset().top - smallBlockSize;
        var right = left + smallBlockSize;
        var top = bottom + smallBlockSize;

        for (var j = 0; j < mapSize; j++) {
            for (var k = 0; k < mapSize; k++) {

                x = Math.floor(k * (blockSize + blockSize / 3));
                y = field.height() - blockSize - Math.floor(j * (blockSize + blockSize / 3));

                var hitboxId = x + SEP + y;
                if (left >= hitboxes[hitboxId]['left']) {
                    if (right <= hitboxes[hitboxId]['right']) {
                        if (bottom >= hitboxes[hitboxId]['bottom']) {
                            if (top <= hitboxes[hitboxId]['top']) {
//                                    console.log(right + '    ' + hitboxes[hitboxId]['left'])
                                collision(hitboxId, i);
                            }
                        }
                    }
                }
            }
        }
    }
}

function collision(name, object_id) {
    var x = hitboxes[name]['left'] - multiplierHitboxes;
    var y = hitboxes[name]['bottom'] - multiplierHitboxes;
    console.log(object_id);
    flBlIsAlive[object_id] = false;
    $('#flBl' + SEP + object_id).remove();
    addElement(x, y);
}

function addElement(x, y) {
    var j = 1;
    var blId = x + SEP + y;
    energy[blId]++;
    
    if (energy[blId] === 1) {
        $(`#cy${x}${SEP}${y}`).show();
    }

    for (i = 1; i <= 4; i++) {
        if (!batteries[blId][i]) {
            continue;
        }
        
        if (j === energy[blId]) {
            $('#stBl' + SEP + blId + SEP + i).show();
//            console.log('add element  ' + i + '     ' + $('#stBl' + SEP + blId + SEP + i).lenght);
            return;
        }
        
        j++;
    }
}


function createMap() {
    field.height(mapSize*(blockSize + blockSize / 3) - blockSize / 3).width(mapSize*(blockSize + blockSize / 3) - blockSize / 3);
    for (j = 0; j < mapSize; j++) {
        for (i = 0; i < mapSize; i++) {
            
            var currBattery = {};
            
            x = Math.floor(i*(blockSize + blockSize / 3));
            y = field.height() - blockSize - Math.floor(j*(blockSize + blockSize / 3));
            
            var currBlock = {};
            addHitboxes();
            
            create('cycle', x + 31.5, y + 31.5);
            
            if (f_createMap) {
                if (j === 0) {
                    if (i === 0) {
                        create('LT', x, y);
                        create('block', x + 62, y + 32, 3);
                        create('block', x + 32, y + 2, 4);
                        currBattery = {1: false, 2: false, 3: true, 4: true, 'total': 2};
                    } else if (i === mapSize - 1) {
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
                } else if (j === mapSize - 1) {
                    if (i === 0) {
                        create('LB', x, y);
                        create('block', x + 32, y + 62, 1, 1);
                        create('block', x + 62, y + 32, 3, 3);
                        currBattery = {1: true, 2: false, 3: true, 4: false, 'total': 2};
                    } else if (i === mapSize - 1) {
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
                } else if (i === 0) {
                    create('L', x, y);
                    create('block', x + 32, y + 62, 1);
                    create('block', x + 62, y + 32, 3);
                    create('block', x + 32, y + 2, 4);
                    currBattery = {1: true, 2: false, 3: true, 4: true, 'total': 3};
                } else if (i === mapSize - 1) {
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
        function addHitboxes() {
            currBlock['left'] = x + multiplierHitboxes;
            currBlock['right'] = x + blockSize - multiplierHitboxes;
            currBlock['top'] = y + blockSize - multiplierHitboxes;
            currBlock['bottom'] = y + multiplierHitboxes;
            hitboxes[x + SEP + y] = currBlock;
        }
    }
//    console.log(hitboxes)
    $('.mapBlock').show();
}
function create(type, left, bottom, other) {
    if (type === 'LB') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Co.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type === 'B') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Bo.png'); background-size: 100% 100%; transform: rotate(1500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type  === 'RB') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Co.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type  === 'L') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Bo.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type  === 'C') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Ce.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type  === 'R') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Bo.png'); background-size: 100% 100%; transform: rotate(1000grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type  === 'LT') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Co.png'); background-size: 100% 100%; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type  === 'T') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Bo.png'); background-size: 100% 100%; transform: rotate(500grad); left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type === 'RT') {
        var html = `<div id="${left}${SEP}${bottom}" onclick="addElement(${left}, ${bottom});" class="mapBlock" style=" background: url('../textures/Co.png'); background-size: 100% 100%; left: ${left}px; transform: rotate(500grad); bottom: ${bottom}px"></div>`;
    } else if (type === 'cycle') {
        var html = `<div id="cy${left - 31.5}${SEP}${bottom - 31.5}" class="cycle" style="background: url('../textures/cycle.png'); background-size: 100% 100%; color: red; left: ${left}px; bottom: ${bottom}px; display: none;"></div>`;
    } else if (type === 'block') {
        var html = `<div id="stBl${SEP + x + SEP + y + SEP + other}" class="block" style="background-color: red; color: red; left: ${left}px; bottom: ${bottom}px"></div>`;
    } else if (type === 'flBl') {
        var html = `<div id="flBl${SEP}${other}" class="flBl" style="display: block; background-color: red; color: red; left: ${left}px; bottom: ${bottom}px"></div>`;
    }
//    console.log(type);
    field.append(html);
}



/*
$(this).attr('id', 'something')

    if(Ids[x + SEP + y] === 'LT') {
        if(energy[x + SEP + y] === 0) {
            create('cycle', x + 31.5, y + 31.5);
            create('block', x + 62, y + 32);
        } else if (energy[x + SEP + y] === 1) {
            create('block', x + 32, y + 2);
        }
         
    } else if(flBlIds[x + SEP + y] === 'T') {
        if(energy[x + SEP + y] === 0) {
            create('cycle', x + 31.5, y + 31.5);
            create('block', x + 2, y + 32);
        } else if (energy[x + SEP + y] === 1) {
            create('block', x + 62, y + 32);
        } else if (energy[x + SEP + y] === 2) {
             create('block', x + 32, y + 2);
         }
    } else if(flBlIds[x + SEP + y] === 'C') {
        if(energy[x + SEP + y] === 0) {
            create('cycle', x + 31.5, y + 31.5);
            create('block', x + 32, y + 62);
        } else if (energy[x + SEP + y] === 1) {
            create('block', x + 2, y + 32);
        } else if (energy[x + SEP + y] === 2) {
            create('block', x + 62, y + 32);
         } else if(energy[x + SEP + y] === 3) {
             create('block', x + 32, y + 2);
         }
    }  else if (flBlIds[x + SEP + y] === 'L') {
         if (energy[x + SEP + y] === 0) {
             create('cycle', x + 31.5, y + 31.5);
             create('block', x + 32, y + 62);
         } else if (energy[x + SEP + y] === 1) {
             create('block', x + 62, y + 32);
         } else if (energy[x + SEP + y] === 2) {
             create('block', x + 32, y + 2);
         }
    } else if (flBlIds[x + SEP + y] === 'R') {
          if (energy[x + SEP + y] === 0) {
              create('cycle', x + 31.5, y + 31.5);
              create('block', x + 32, y + 62);
          } else if (energy[x + SEP + y] === 1) {
              create('block', x + 2, y + 32);
          } else if (energy[x + SEP + y] === 2) {
              create('block', x + 32, y + 2);
          }
    } else if (flBlIds[x + SEP + y] === 'RT') {
           if (energy[x + SEP + y] === 0) {
               create('cycle', x + 31.5, y + 31.5);
               create('block', x + 2, y + 32);
           } else if (energy[x + SEP + y] === 1) {
               create('block', x + 32, y + 2);
           }
    } else if (flBlIds[x + SEP + y] === 'LB') {
            if (energy[x + SEP + y] === 0) {
                create('cycle', x + 31.5, y + 31.5);
                create('block', x + 32, y + 62);
            } else if (energy[x + SEP + y] === 1) {
                create('block', x + 62, y + 32);
            }
    } else if (flBlIds[x + SEP + y] === 'B') {
             if (energy[x + SEP + y] === 0) {
                 create('cycle', x + 31.5, y + 31.5);
                 create('block', x + 32, y + 62);
             } else if (energy[x + SEP + y] === 1) {
                 create('block', x + 2, y + 32);
             } else if (energy[x + SEP + y] === 2) {
                 create('block', x + 62, y + 32);
             }
    } else if (flBlIds[x + SEP + y] === 'RB') {
              if (energy[x + SEP + y] === 0) {
                  create('cycle', x + 31.5, y + 31.5);
                  create('block', x + 32, y + 62);
              } else if (energy[x + SEP + y] === 1) {
                  create('block', x + 2, y + 32);
          }
    }
*/
