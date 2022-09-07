class SceneController {
    
    constructor(){};
    
    startGame() {
        
        $('#gameContainer').show();
        
        let game = new Game();
        game.mapSize = 3;
        game.start();
    }
    
}

function fitToSize() {
    
    $('#gameSquare').height(window.innerHeight).width(window.innerHeight);
}