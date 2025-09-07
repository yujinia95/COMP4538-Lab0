/**
 * @file js/gameManagement.js
 * @author Yujin Jeong
 * @author Claude and ChatGPT
 * @version 1.0
 * @description This file contains the GameManagement class that manages the overall game state and flow.
 */

const GAME_BOARD_ID        = "game-board";
const INITIAL_NUM_BTN      = 0;
const INITIAL_NEXT_BTN_NUM = 1;
const START_BTN            = "start-btn";
const NUM_INPUT            = "num-btn-input";
const EVENT_KEYPRESS       = "keypress";
const EVENT_KEYPRESS_ENTER = "Enter";
const DECIMAL              = 10;
const PAUSE_INTERVAL_MS    = 1000;
const GAME_STATE = {
    INITIAL   : "init",
    SCRAMBLING: "scrambling",
    DISPLAYING: "displaying",
    PLAYING   : "playing",
    FINISHED  : "finished"
};
const GAME_MSG_KEYS = {
    EXCELLENT_MEMORY: "GAME_COMPLETE",
    WRONG_ORDER     : "GAME_FAILED",
    INVALID_INPUT   : "INVALID_INPUT"
}

class GameManagement{

    /**
     * Constructor for GameManagement class.
     */
    constructor() {
        this.uiMessage        = new UIMessage();
        this.gameBoard        = new GameBoard(GAME_BOARD_ID, this);
        this.gameState        = GAME_STATE.INITIAL;
        this.numberOfButtons  = INITIAL_NUM_BTN;
        this.nextButtonNumber = INITIAL_NEXT_BTN_NUM;

        this.startBtn = document.getElementById(START_BTN);
        this.numInput = document.getElementById(NUM_INPUT);

        this._initializeGame();
    }


    //Helper functions for GameManagement

    /**
     * Initialize the game by setting up event listeners for the start button and number input field(enabling press Enter).
     */
    _initializeGame() {

        this.startBtn.addEventListener(GAME_SETTINGS.EVENT_CLICK, () => {

            if (this.startBtn.disabled) {
                return;
            }

            this.startGamePlay();
        });

        //event: event object passed to the event listener
        this.numInput.addEventListener(EVENT_KEYPRESS, (event) => {
            if (event.key === EVENT_KEYPRESS_ENTER) {
                
                //'preventDefault()': prevent the browser's default action (reload or submit the page) to not break the game.
                event.preventDefault();

                if (this.startBtn.disabled) {
                    return;
                }

                this.startGamePlay();
            }
        });

        //This allow user to enable start button and input field when the page is loaded.
        this._setStartAndInputEnable(true);
    }
        
    /**
     * Start the button scrambling process with the amount of buttons specified by the user.
     */
    _startScrambleButtons() {
        this.gameState = GAME_STATE.SCRAMBLING;
        this.gameBoard.scrambleButtonsNTimes(this.numberOfButtons, () => this._startPlay());
    }

    /**
     * Start the gameplay by hiding all numbers on buttons and making them clickable.
     */
    _startPlay() {
        this.gameState = GAME_STATE.PLAYING;

        this.gameBoard.hideAllNumbersOnButtons();
        this.gameBoard.makeAllButtonsClickable();
    }

    /**
     * Enable or disable the start button and number input field. 
     * This helper function is for stopping user to start a new game 
     * while a game is in progress.
     * 
     * @param {*} enabled true to enable, false to disable
     */
    _setStartAndInputEnable(enabled) {

        //If enabled is true, "Go" button and input field are enabled, otherwise disabled.
        this.startBtn.disabled = !enabled;
        this.numInput.disabled = !enabled;
    }

    /**
     * Finish the game play and display message if player succeeded or not.
     * 
     * @param {boolean} nailedIt - Indicates if the player succeeded.
     */
    _finishGamePlay(nailedIt){
        this.gameState = GAME_STATE.FINISHED;

        this.gameBoard.makeAllButtonsUnclickable();
        this.gameBoard.displayAllNumbersOnButtons();

        this.uiMessage.displayGameMessage(nailedIt ? GAME_MSG_KEYS.EXCELLENT_MEMORY : GAME_MSG_KEYS.WRONG_ORDER);
    
        this._setStartAndInputEnable(true);
    }

    /**
     * Handle button click events and check the order of clicks.
     * 
     * @param {*} button user's clicked button
     */
    _handleButtonClickOrder(button) {

        //Ignore clicks if not in PLAYING state or button is not clickable.
        if (this.gameState !== GAME_STATE.PLAYING || !button.isClickable) {
            return;
        }

        //Check if the number on clicked button matches the expected next number.
        if (button.order === this.nextButtonNumber) {
            button.displayNumberOnButton();
            button.makeButtonUnclickable();
            this.nextButtonNumber++;

            //Check if all buttons have been clicked in the correct order.
            if (this.nextButtonNumber > this.numberOfButtons) {
                this._finishGamePlay(true);
            } 
        } else {
                //Wrong button clicked and game over :(
                this._finishGamePlay(false);  
        }
    }

    /**
     * Clear the game message display("Excellent memory" or "Wrong order!").
     */
    _clearGameMessage() {
        this.uiMessage.clearGameMessage();
    }


    /**
     * Start the game play by reset game components, creating buttons, displaying their numbers, and scrambling them.
     */
    startGamePlay() {
        const numbOfBtn = parseInt(this.numInput.value, DECIMAL);
        
        //Validate user input for number of buttons.
        if (!GameUtilFunctions.isValidNumberOfButtons(numbOfBtn)) {
            this.uiMessage.displayGameMessage(GAME_MSG_KEYS.INVALID_INPUT);
            this._setStartAndInputEnable(true);
            return;
        }

        //Reset game components in case.
        this._clearGameMessage();
        this.gameBoard.clearButtons();
        this.gameState        = GAME_STATE.DISPLAYING;
        this.numberOfButtons  = numbOfBtn;
        this.nextButtonNumber = INITIAL_NEXT_BTN_NUM;

        this._setStartAndInputEnable(false);

        this.gameBoard.createButtons(this.numberOfButtons);
        this.gameBoard.displayAllNumbersOnButtons();
        this.gameBoard.makeAllButtonsUnclickable();
        this.gameBoard.locateButtonsInRow();

        //This timeout pause(e.g. for 3 buttons, pause for 3 seconds) before starting to scramble buttons.
        setTimeout(() => this._startScrambleButtons(), this.numberOfButtons * PAUSE_INTERVAL_MS);
    }
}


//When page's HTML is finished loading, create an instance of GameManagement to start the game!!!!!!!!!!!
window.addEventListener("DOMContentLoaded",() => new GameManagement());