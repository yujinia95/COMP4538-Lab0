/**
 * @file js/button.js
 * @author Yujin Jeong
 * @author Claude
 * @version 1.0
 * @description This file contains the Button class that holds the properties of buttons.
 */

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


        this.btnComponent = this.createButtonComponents();
    }

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

    /**
     * Make the button clickable.
     * Current css for 'disable-click-button', pointer events is none.
     */
    makeButtonClickable() {
        this.isClickable                = true;
        this.btnComponent.style.cursor  = 'pointer';
        this.btnComponent.classList.remove('disable-click-button');
    }

    /**
     * Make the button unclickable.
     * Current css for 'disable-click-button', pointer events is none.
     */
    makeButtonUnclickable() {
        this.isClickable                = false;
        this.btnComponent.classList.add('disable-click-button');
    }

    /**
     * Display the number on the button.
     */
    displayNumbOnButton() {
        this.btnComponent.textContent = this.order;
    }

    /**
     * Hide the number on the button.
     */
    hideNumbOnButton() {
        this.btnComponent.textContent = "";
    }



























}