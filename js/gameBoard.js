/**
 * @file js/gameBoard.js
 * @author Yujin Jeong
 * @author Claude and ChatGPT
 * @version 1.0
 * @description This file contains the GameBoard class that holds and manages game buttons. 
 *              Also changes the size of the game board to make sure buttons fit within the game board.
 */

const TEMP_SIZE              = 0;
const FIRST_BTN              = 1;
const TOP_SECTION_ID         = "top-section";
const MIN_VALUE_FOR_MAX      = 0;
const ENTIRE_WIDTH_VW        = 100;
const BTN_WIDTH_EM           = 10;
const BTN_HEIGHT_EM          = 5;
const ROW_BTN_SPACING        = 10;
const ROW_BTN_MARGIN         = 20;
const RESIZE_WINDOW_EVENT    = "resize";
const INCLUSIVE_RANGE_OFFSET = 1;
const INTERVAL_2_SECONDS     = 2000;
const INITIAL_COUNT          = 0;

//! Move all hard coded strings to constants up here.
class GameBoard {
    constructor(gameBoardID, gameManagement, topSection = TOP_SECTION_ID) {
        this.gameBoard      = document.getElementById(gameBoardID);
        this.gameManagement = gameManagement;
        this.topSection     = document.getElementById(topSection);
        this.buttons        = [];

        //Initialize to a temporary size as 0
        this.windowHeight     = TEMP_SIZE;
        this.windowWidth      = TEMP_SIZE;
        this.topSectionHeight = TEMP_SIZE;
        this.gameBoardHeight  = TEMP_SIZE;
        this.gameBoardWidth   = TEMP_SIZE;

        //Read the initial sizes and set the game board size
        this._readWindowSize();
        this._readTopSectionSize();
        this._matchGameBoardSizeToWindow();
        this._handleWindowResize();
    }

    /**
     * GameBoard forward button click event to GameManagement.
     * 
     * @param {*} button game button that was clicked
     */
    onButtonClicked(button) {
        this.gameManagement._handleButtonClickOrder(button);
    }

    /**
     * Clear all buttons from the game board.
     */
    clearButtons() {
        this.buttons.forEach(button => button.removeButton());
        this.buttons = [];
    }

    /**
     * Create buttons on the game board.
     * 
     * @param {*} n number of buttons that user wants to play with
     */
    createButtons(n) {
        this.clearButtons();

        for (let i = FIRST_BTN; i <= n; i++) {

            const colour = GameUtilFunctions.getRandomColour();
            const button = new Button(colour, i, this);

            button.addBtnToGameBoard(this.gameBoard);
            this.buttons.push(button);
        }
    }


    //Helper functions

    /**
     * Read the current size of page's height and width.
     */
    _readWindowSize() {
        this.windowHeight = window.innerHeight;
        this.windowWidth  = window.innerWidth;
    }

    /**
     * Get the top section's height.
     * getBoundingClientRect(): returns the size of an element and its position relative to the viewport.
     *                          (top, right, bottom, left, width, height)
     */
    _readTopSectionSize() {
        const rectangle       = this.topSection.getBoundingClientRect();
        this.topSectionHeight = rectangle.height;
    }

    /**
     * Match the game board's size to the window's size.
     * 
     * Why Math.max() for game board height?
     *   To make sure the game board height is at least 0.
     *   If the window height is smaller than the top section height,
     *   a negative value will bring bugs :(
     */
    _matchGameBoardSizeToWindow() {
        this.gameBoardWidth  = this.windowWidth;
        this.gameBoardHeight = Math.max(MIN_VALUE_FOR_MAX, this.windowHeight - this.topSectionHeight);

        this.gameBoard.style.width  = `${this.gameBoardWidth}${GAME_SETTINGS.UNIT_PX}`;
        this.gameBoard.style.height = `${this.gameBoardHeight}${GAME_SETTINGS.UNIT_PX}`;
    }

    /**
     * Whenever the window size changes, update the game board size.
     */
    _handleWindowResize(){
        window.addEventListener(RESIZE_WINDOW_EVENT, () => {
            this._readWindowSize();
            this._readTopSectionSize();
            this._matchGameBoardSizeToWindow();
        });
    }

    //Resize the window and game board.
    _resizeWindowAndBoard(){
        this._readWindowSize();
        this._readTopSectionSize();
        this._matchGameBoardSizeToWindow();
    }

    //Convert button size from em to px. Why this.gameBoard? to ensure button scale correctly if gameBoard's font size changes. 
    _getButtonSizeInPx() {
        const btnWidthPx  = GameUtilFunctions.convertEmToPx(this.gameBoard, BTN_WIDTH_EM);
        const btnHeightPx = GameUtilFunctions.convertEmToPx(this.gameBoard, BTN_HEIGHT_EM);
        return {btnWidthPx, btnHeightPx};
    }

    /**
     * Locate buttons in a row. 
     */
    locateButtonsInRow() {
        
        //Resize the window and game board in case user changed.
        this._resizeWindowAndBoard();

        //Convert button size from em to px.
        const {btnWidthPx, btnHeightPx} = this._getButtonSizeInPx();

        //Define css layout for buttons.
        const spacing         = ROW_BTN_SPACING;
        const marginLeft      = ROW_BTN_MARGIN;
        const marginTop       = ROW_BTN_MARGIN;
        const rightEdgeGuard  = ROW_BTN_MARGIN;

        //Set button's starting position
        let leftPosition = marginLeft;
        let topPosition  = marginTop;

        //Place each button on the game board.
        this.buttons.forEach((button) => {

            //Check if the button exceeds the game board's width.
            if (leftPosition + btnWidthPx > this.gameBoardWidth - rightEdgeGuard) {
                
                //If it exceeds, move to the next row by resetting left position and increasing top position.
                leftPosition = marginLeft;
                topPosition += btnHeightPx + spacing;
            }

            button.setLocation(topPosition, leftPosition);
            leftPosition += btnWidthPx + spacing;
        });
    }


    /**
     * Generate random position for a button.
     * 
     * @returns x and y coordinates for the button
     */
    generateRandombuttonPosition() {

        //Resize the window and game board in case user changed.
        this._resizeWindowAndBoard();

        //Convert button size from em to px.
        const {btnWidthPx, btnHeightPx} = this._getButtonSizeInPx();
        
        //Calculate the max left and top position to ensure button fits within the game board
        //0 in Math.max() make sure it doesn't go negative.
        //'minTopPosition' in Math.max() make sure button doesn't go above the top section.
        const maxLeftPosition = Math.max(MIN_VALUE_FOR_MAX, this.windowWidth - btnWidthPx);
        const minTopPosition  = this.topSectionHeight;
        const maxTopPosition  = Math.max(minTopPosition, this.windowHeight - btnHeightPx);
        
        //Generate random positions within the range.
        //'maxLeftPosition','minTopPosition','maxTopPosition' are pre-trimmed(button size) safe boudaries.
        //'+1' in Math.random() * (max - min + 1) + min helps to reach the max value.
        //'+ minTopPosition' to ensure button doesn't go above the top section
        const randomLeft = Math.floor(Math.random() * (maxLeftPosition));
        const randomTop  = Math.floor(Math.random() * (maxTopPosition - minTopPosition + INCLUSIVE_RANGE_OFFSET)) + minTopPosition;

        //Why return 'top : randomTop - this.topSectionHeight'?
        //      Buttons are inside the game board, so need to adjust the top 
        //      position relative to the game board.
        return {
            left: randomLeft,
            top : randomTop - this.topSectionHeight
        }
    }

    /**
     * Scramble buttons' positions once.
     */
    scrambleButtonsOnce() {
        this.buttons.forEach(button => {
            const newPosition = this.generateRandombuttonPosition();
            button.setLocation(newPosition.top, newPosition.left);
        });
    }

    /**
     * Scramble buttons' positions multiple times based on n.
     * onDone?: callback function to call when done scrambling.
     * 
     * @param {*} n number of times to scramble or number of buttons
     * @param {*} onDone callback function to call when done
     */
    scrambleButtonsNTimes(n, onDone) {
        let count = INITIAL_COUNT;

        /**
         * Scarmble buttons once and set a timeout to call itself again after 2 seconds.
         * Why inner helper function 'scrambleStep'?
         *      To use 'setTimeout' to create a delay between each scramble.
         * @returns void 
         */
        const scrambleStep = () => {

            //Check if we have scrambled n times.
            if (count >= n) {

                //If 'onDone'(call back function) is provided, call it.
                //If 'onDone' is 'null' or 'undefined', do nothing.
                onDone && onDone();
                return;
            }

            this.scrambleButtonsOnce();
            count++;
            setTimeout(scrambleStep, INTERVAL_2_SECONDS);
        };

        scrambleStep();
    }


    //Helper functions for GameManagement
    
    /**
     * Display all numbers on the buttons.
     */
    displayAllNumbersOnButtons() {
        this.buttons.forEach(button => button.displayNumberOnButton());
    }
    
    /**
     * Hide all numbers on the buttons.
     */
    hideAllNumbersOnButtons() {
        this.buttons.forEach(button => button.hideNumberOnButton());
    }

    /**
     * Make all buttons clickable.
     */
    makeAllButtonsClickable() {
        this.buttons.forEach(button => button.makeButtonClickable());
    }

    /**
     * Make all buttons unclickable.
     */
    makeAllButtonsUnclickable() {
        this.buttons.forEach(button => button.makeButtonUnclickable());
    }
}