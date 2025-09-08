/**
 * @file js/ui-message.js
 * @author Yujin Jeong
 * @version 1.0
 * @description This file contains the UImessage class that manages the messages for the user interface (used for HTML file).
 */

class UIMessage {
    
    static CLASSES = {
        GAME_TITLE     : "game-title",
        HEADER         : "game-header",
        NUM_INPUT_LABEL: "num-btn-label",
        START_BTN      : "start-btn",
        GAME_MSG       : "game-message"
    }

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
        gameTitle       = UIMessage.CLASSES.GAME_TITLE,
        header          = UIMessage.CLASSES.HEADER,
        numInputLabel   = UIMessage.CLASSES.NUM_INPUT_LABEL,
        startBtn        = UIMessage.CLASSES.START_BTN,
        gameMsg         = UIMessage.CLASSES.GAME_MSG
    ) {
        this.gameTitle      = document.getElementById(gameTitle);
        this.header         = document.getElementById(header);
        this.numInputLabel  = document.getElementById(numInputLabel);
        this.startBtn       = document.getElementById(startBtn);
        this.gameMsg        = document.getElementById(gameMsg);
        
        this.setTexts();
    }
    
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
            this.gameMsg.textContent = GAME_SETTINGS.EMPTY_STRING;
        }
    }

    /**
     * Display game messages "Excellent memory" or "Wrong order!" based on the provided index.
     * 
     * @param {string} gameMsgKey Key to determine which message to display
     */
    displayGameMessage(gameMsgKey) {
        this.gameMsg.textContent = GAME_MSG_FOR_USER[gameMsgKey];
    }
}