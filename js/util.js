/**
 * @file js/util.js
 * @author Yujin Jeong
 * @author Claude
 * @version 1.0
 * @description This file contains utility functions and constants for the game.
 */

const GAME_SETTINGS = {
    BUTTON_COLOUR: ["#66C5CC", "#F6CF71", "#F89C74", "#DCB0F2" ,"#B3B3B3", "#9EB9F3", "#FE88B1"],
    MIN_BUTTON: 3,
    MAX_BUTTON: 7
}

/**
 * A collection of utility functions for the game.
 */
const GameUtilFunctions = {

    /**
     * Get a random colour from the array of button colours.
     * 
     * @returns a random colour from the array of button colours
     */
    getRandomColour: () => {
        const randomIndex = Math.floor(Math.random() * GAME_SETTINGS.BUTTON_COLOUR.length);
        return GAME_SETTINGS.BUTTON_COLOUR[randomIndex];
    },

    /**
     * Convert em to px.
     * Default ratio: 1em = 16px
     * getComputedStyle(): gets CSS values being applied to the element.
     * why fontSize? : font size is the only property that scales with em.
     * 
     * @param {*} em Value in em to be converted to px
     * @returns      Value in px
     */
    convertEmToPx: (element, em) => {
        return em * parseFloat(getComputedStyle(element).fontSize);
    }


    //Possibly Random number generator
}