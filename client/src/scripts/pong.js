'use strict';

import Game from './Game.js';
const theField = document.getElementById("field");
const theGame = new Game(theField);

const getStarted = event => {
  if (event.target.value === 'Rejoindre') {
    theGame.socket.on('newConnection', (msg, sender) => theGame.informations(`[${sender}] ${msg}`) );
    theGame.socket.on('newDisconnection', (msg, sender) => theGame.informations(`[${sender}] ${msg}.`) );
    theGame.socket.emit('joinPrivate');
    event.target.value = 'Quitter';
    document.getElementById('start').disabled = false;
  }
  else if (event.target.value === 'Quitter') {
    theGame.socket.emit('bye bye');
    event.target.value = 'Rejoindre';
    document.getElementById('start').disabled = true;
    theGame.displayMessage('');
  }
}

const init = () => {

  document.getElementById('joinPrivate').addEventListener('click', getStarted);

  document.getElementById('start').addEventListener("click", () => theGame.wantToStart() );
  window.addEventListener('keydown', theGame.keyDownActionHandler1.bind(theGame));
  window.addEventListener('keyup', theGame.keyUpActionHandler.bind(theGame));
}

window.addEventListener("load",init);



