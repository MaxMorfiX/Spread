var field = $('#field')
var mapSize = 5;
var blockSize = 50;

startGame();

function start() {
    
}
function startGame() {
    createMap();
}
function create(type, left, bottom) {
    if (type === 'cornerLT') {
        var html = `<div id="${left}${bottom}" background: url('textures/cornerLT0') onclick='', class="mapBlock" style= left: ${left}px; bottom: ${bottom}px">`;
    }
    if (type === 'cornerRT') {
        var html = `<div id="${left}${bottom}" background: url('center0') onclick='', class="mapBlock" style= left: ${left}px; bottom: ${bottom}px"; transform: 'rotate(90grad)'>`;
    }
    console.log('LT')
    field.append(html);
}

function createMap() {
    console.log('hiiii');
      for (i = 0; i < mapSize; i++) {
          for (j = 0; j < mapSize; j++) {
              
              
              x = j * blockSize - blockSize / 3;
              y = i * blockSize - blockSize / 3;
              
              
              if(i == 0) {
                  if(j == 0) {
                    create('cornerLT', x, y);
                  } else {
                      if(j == mapSize) {
                          create('cornerRT', x, y);
                      } else {
                          create('top', x, y);
                      }
                  }
              } else {
                  if(i == mapSize - 1) {
                      if(j == 0) {
                          create('cornerLB', x, y);
                      } else {
                          if(j == mapSize) {
                              create('cornerRB', x, y);
                          } else {
                              create('bottom', x, y);
                          }
                      }
                  } else {
                      if(j == 1) {
                          create('left', x, y);
                      } else {
                          if(j == mapSize) {
                              create('right', x, y);
                          } else {
                              create('center', x, y)
                          }
                      }
                  }
              }
          }
      }
      $('.mapBlock').show();
  }
