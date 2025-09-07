/**
 * @file js/ui-message.js
 * @author Yujin Jeong
 * @version 1.0
 * @description This file contains the UImessage class that manages the messages for the user interface (used for HTML file).
 */
class UIMessage {

    /**
     * Constructor for UIMessage class.
     * 
     * @param {*} gameTitle Name of the game for head
     * @param {*} header Name of the game for h1
     * @param {*} numInputLabel Label for number input button
     * @param {*} startBtn Game start button
     * @param {*} gameMsg Game message display
     */
    constructor(
        gameTitle       = "game-title",
        header          = "game-header",
        numInputLabel   = "num-btn-label",
        startBtn        = "start-btn",
        gameMsg         = "game-message"
    ) {
        this.gameTitle      = document.getElementById(gameTitle);
        this.header         = document.getElementById(header);
        this.numInputLabel  = document.getElementById(numInputLabel);
        this.startBtn       = document.getElementById(startBtn);
        this.gameMsg        = document.getElementById(gameMsg);
        
        //! Make sure I know why I need this.setTests(); here
        this.setTexts();
    }
    
    //! Make sure I know what setTexts() does
    setTexts() {
        this.gameTitle.textContent      = GAME_MSG_FOR_USER.GAME_TITLE;
        this.header.textContent         = GAME_MSG_FOR_USER.GAME_HEADER;
        this.numInputLabel.textContent  = GAME_MSG_FOR_USER.BTN_NUM_LABEL;
        this.startBtn.textContent       = GAME_MSG_FOR_USER.START_BTN;
    }

    /**
     * Clear the game message display.
     */
    clearGameMessage() {
        if (this.gameMsg) {
            this.gameMsg.textContent = "";
        }
    }

    /**
     * Display game messages "Excellent memory" or "Wrong order!" based on the provided index.
     * 
     * @param {*} gameMsgIndices Index to determine which message to display
     */
    displayGameMessage(gameMsgIndices) {
        this.gameMsg.textContent = GAME_MSG_FOR_USER[gameMsgIndices];
    }
}


//! Make sure I move this to game manager.
window.addEventListener("DOMContentLoaded", () => new UIMessage());