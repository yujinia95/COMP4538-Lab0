/**
 * @file js/button.js
 * @author Yujin Jeong
 * @author Claude
 * @version 1.0
 * @description This file contains the Button class that holds the properties of buttons.
 */

const EVENT_CLICK           = "click";
const BUTTON_ELEMENT        = "button";
const BUTTON_CLASS          = "game-button disable-click-button";
const BUTTON_DISABLED_CLASS = "disable-click-button";
class Button {

    /**
     * Constructor for Button class.
     * 
     * @param {*} colour    Colour of the button
     * @param {*} order     Order of the button
     * @param {*} gameBoard Game board where the button is placed
     */
    constructor(colour, order, gameBoard) {
        this.colour       = colour;
        this.order        = order;
        this.gameBoard    = gameBoard;
        this.isClickable  = false;

        //Create button html element with components when Button object is created.
        this.btnComponent = this.createButtonComponents();
        this.btnComponent.addEventListener(GAME_SETTINGS.EVENT_CLICK, () => this.handleClick());
    }

    /**
     * Create a button with components(Colour, order, size, position).
     */
    createButtonComponents() {
        const button                 = document.createElement(BUTTON_ELEMENT);

        button.style.backgroundColor = this.colour;
        button.textContent           = this.order;
        button.className             = BUTTON_CLASS;

        return button;
    }

    /**
     * Make the button clickable.
     * Current css for 'disable-click-button', pointer events is none.
     */
    makeButtonClickable() {
        this.isClickable = true;
        this.btnComponent.classList.remove(BUTTON_DISABLED_CLASS);
    }

    /**
     * Make the button unclickable.
     * Current css for 'disable-click-button', pointer events is none.
     */
    makeButtonUnclickable() {
        this.isClickable = false;
        this.btnComponent.classList.add(BUTTON_DISABLED_CLASS);
    }

    /**
     * Display the number on the button.
     */
    displayNumberOnButton() {
        this.btnComponent.textContent = this.order;
    }

    /**
     * Hide the number on the button.
     */
    hideNumberOnButton() {
        this.btnComponent.textContent = GAME_SETTINGS.EMPTY_STRING;
    }

    /**
     * Remove the button from the game board.
     */
    removeButton() {
        this.btnComponent.remove();
    }

    /**
     * Set the location of the button on the game board.
     * 
     * @param {*} top to the top position
     * @param {*} left to the left position
     */
    setLocation(top, left) {
        this.btnComponent.style.top  = top + GAME_SETTINGS.UNIT_PX;
        this.btnComponent.style.left = left + GAME_SETTINGS.UNIT_PX;
    }

    /**
     * Add the button to the game board.
     * @param {*} gameBoard game board where the button is placed
     */
    addBtnToGameBoard(gameBoard) {
        gameBoard.appendChild(this.btnComponent);
    }

    /**
     * Handle the button's click event. Triggered only if the button is clickable.
     * @returns 
     */
    handleClick() {
        if (!this.isClickable) {
                return;
        }
        this.gameBoard.onButtonClicked(this);
    }
}