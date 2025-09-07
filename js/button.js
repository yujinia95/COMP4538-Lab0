/**
 * @file js/button.js
 * @author Yujin Jeong
 * @author Claude
 * @version 1.0
 * @description This file contains the Button class that holds the properties of buttons.
 */

//! Move all hard coded strings to constants up here.
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
        this.btnComponent.addEventListener("click", () => this.handleClick());
    }

    //! Move hard coded strings to constants up here.
    /**
     * Create a button with components(Colour, order, size, position).
     */
    createButtonComponents() {
        const button                 = document.createElement("button");

        button.style.backgroundColor = this.colour;
        button.textContent           = this.order;
        button.className             = "game-button disable-click-button";

        return button;
    }

    //! Move hard coded strings to constants up here.
    /**
     * Make the button clickable.
     * Current css for 'disable-click-button', pointer events is none.
     */
    makeButtonClickable() {
        this.isClickable = true;
        this.btnComponent.classList.remove('disable-click-button');
    }

    //! Move hard coded strings to constants up here.
    /**
     * Make the button unclickable.
     * Current css for 'disable-click-button', pointer events is none.
     */
    makeButtonUnclickable() {
        this.isClickable = false;
        this.btnComponent.classList.add('disable-click-button');
    }

    /**
     * Display the number on the button.
     */
    displayNumbOnButton() {
        this.btnComponent.textContent = this.order;
    }

    //! Move hard coded strings to constants up here.
    /**
     * Hide the number on the button.
     */
    hideNumbOnButton() {
        this.btnComponent.textContent = "";
    }

    /**
     * Remove the button from the game board.
     */
    removeButton() {
        this.btnComponent.remove();
    }

    //! Move hard coded strings to constants up here.
    /**
     * Set the location of the button on the game board.
     * 
     * @param {*} top to the top position
     * @param {*} left to the left position
     */
    setLocation(top, left) {
        this.btnComponent.style.top  = top + "px";
        this.btnComponent.style.left = left + "px";
    }

    //! Magic number
    /**
     * Getter for the location of the button on the game board
     * 
     * @returns the current location of the button on the game board
     */
    getLocation(){
        return {
            top : parseInt(this.btnComponent.style.top) || 0,
            left: parseInt(this.btnComponent.style.left) || 0
        }
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