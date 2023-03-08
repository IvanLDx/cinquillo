const server = require('./scripts/server');
server.start(__dirname);

const Deck = require('./scripts/models/Deck');
const Player = require('./scripts/models/Player');
const socketList = require('./scripts/models/socketList');
const helpers = require('./scripts/helpers');
const loop = helpers.loop;
const FPS = 20;
let setDistributeInterval;

Deck.create();

const io = require('socket.io')(server.self(), {});
io.sockets.on('connection', function (socket) {
    socket.id = Math.random() + '';
    
    socket.on('signIn', () => {
        Player.connect(socket);
    });
    
    socket.on('disconnect', () => {
        Player.disconnect(socket);
    });
    
    socket.on('startGame', () => {
        Player.createNPCs();
        Player.setRounds();
        let iter = 0;
        setDistributeInterval = setInterval(() => {
            iter = distributeInterval(iter);   
        }, 1000 / FPS);
    });
});

function distributeInterval (iter) {
    if (iter >= Deck.getLength()) {
        clearInterval(setDistributeInterval);
        return;
    }

    Deck.distribute(iter);
    iter++;

    let pack = helpers.getPack(Player, Deck);

    loop(socketList, socket => {
        socket.emit('update', pack);
    });

    return iter;
}
