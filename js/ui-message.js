/**
 * @file js/ui-message.js
 * @author Jeong Lab
 * @version 1.0
 * @description This file contains the UIMessage class that manages the user interface messages for the game.
 */
class UIMessage {
    constructor(
        gameTitle       = "game-title",
        header          = "game-header",
        numInputLabel   = "num-btn-label",
        startBtn        = "start-btn"
    ) {
        this.gameTitle      = document.getElementById(gameTitle);
        this.header         = document.getElementById(header);
        this.numInputLabel  = document.getElementById(numInputLabel);
        this.startBtn       = document.getElementById(startBtn);
        
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
}

//! Make sure I know what this does
window.addEventListener("DOMContentLoaded", () => new UIMessage());