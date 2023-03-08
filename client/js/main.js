import * as helper from './helpers/index.js';
import {Player} from './helpers/player.js';
import {Deck} from './helpers/Deck.js';
import {cv, ctx} from './helpers/mgr.js';

const socket = io();
const dalle = document.querySelector('.dalle');
const loop = helper.loop;
let deck = null;
let selfID, selfPlayer;

cv.width = cv.clientWidth;
cv.height = cv.clientHeight;

socket.emit('signIn', { username: 'huuuye' });

socket.on('init', function (data) {
    Deck.create(data.deck);
    deck = Deck.cards;
    selfID = data.selfPlayer.id;
    
    loop(data.players, player => {
        Player.create(player);
    });
    selfPlayer = Player.get(selfID);
});

socket.on('update', function (data) {
    Player.update(data);
    Deck.update(data);
    paint();
});

function paint() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    Player.paintCards();
}

dalle.onclick = () => {
    socket.emit('startGame', {});
};