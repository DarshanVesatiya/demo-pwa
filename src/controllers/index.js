// Import useCases
const useCases=require('../use-cases');

// Import Actions
const makeGreetAction=require('./greet-welcome');

// Make Actions
const greetAction = makeGreetAction({ greetWelcomeToApp:useCases.greetWelcomeToApp })

// Create Controller Object
const controller = Object.freeze({
  greetAction
});

// Export Controller
module.exports=controller;
