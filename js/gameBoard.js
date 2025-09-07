/**
 * @file js/gameBoard.js
 * @author Yujin Jeong
 * @author Claude
 * @version 1.0
 * @description This file contains the GameBoard class that holds and manages game buttons. 
 *              Also changes the size of the game board to make sure buttons fit within the game board.
 */
class GameBoard {
    constructor(gameBoardID, gameManagement) {
        this.gameBoardID    = document.getElementById(gameBoardID);
        this.gameManagement = gameManagement;
        this.buttons        = [];
    }


}