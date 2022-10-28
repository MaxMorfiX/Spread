class SceneController {
    
    constructor(){};
    
    startGame() {
        
        $('#gameContainer').show();
        
        let game = new Game();
        game.mapSize = 5;
        game.start();
    }
    
}

function fitToSize() {
    
    $('#gameSquare').height(window.innerHeight).width(window.innerHeight);
}