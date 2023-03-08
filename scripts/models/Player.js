const Mgr = require('./Mgr');
const Deck = require('./Deck');
const helpers = require('../helpers');
const loop = helpers.loop;
const socketList = require('./socketList');

const Player = (id) => {
    var self = Mgr.Entity(id);

    let super_pushCard = self.pushCard;
    self.pushCard = (card) => {
        super_pushCard(card);
        self.sortCardsInHand();
    };

    self.sortCardsInHand = () => {
        let ouros = self.sortSuit(self.cards, 0);
        let copas = self.sortSuit(self.cards, 1);
        let espadas = self.sortSuit(self.cards, 2);
        let bastos = self.sortSuit(self.cards, 3);
        self.cards = [...ouros, ...copas, ...espadas, ...bastos];
    };

    self.sortSuit = (cards, suit) => {
        let selectedCards = [];
        if (cards) {
            loop(cards, card => {
                if (card.sid === suit) {
                    selectedCards.push(card);
                }
            });
        }
    
        let letSort = true;
        while (letSort) {
            letSort = false;
    
            for (let i = 0; i < selectedCards.length - 1; i++) {
                let a = selectedCards[i].nid;
                let b = selectedCards[i + 1].nid;
                if (b < a) {
                    let getCard = selectedCards[i];
                    selectedCards.splice(i, 1, selectedCards[i + 1]);
                    selectedCards.splice(i + 1, 1, getCard);
                    letSort = true;
                }
            }
        }
    
        return selectedCards;
    }

    return self;
};

Player.connect = (socket) => {
    var self = Player(socket.id);
    socketList.push(socket);

    socket.emit('init', {
        selfPlayer: self,
        players: Player.getList(),
        deck: Mgr.deck
    });
};

Player.disconnect = (socket) => {
    loop(Mgr.players, (player, i) => {
        if (player.id === socket.id) {
            Mgr.players.splice(i, 1);
        }
    });
    loop(socketList, (item, i) => {
        if (item.id === socket.id) {
            socketList.splice(i, 1);
        }
    });
};

Player.createNPCs = () => {
    let NPCs = 4 - Mgr.players.length;
    for (let i = 0; i < NPCs; i++) {
        let name = 'cpu' + (i + 1);
        Player(name);
    }
};

Player.setTablePosition = () => {
    loop(Mgr.players, (player, i) => {
        player.tablePosition = i;
    });
};

Player.setRound = () => {
    let cincoDeOuros = Deck.getCard('4-0');
    let firstPlayer = Player.get(cincoDeOuros.owner);
    let player = firstPlayer.player;
    let iter = firstPlayer.i;
    
    let i = 0;
    while(i < Player.getLength()) {
        let player = Player.getList()[iter];
        player.round = i + 1;
        iter++;
        if (iter >= Player.getLength()) {
            iter = 0;
        }
        i++;
    }
};

Player.send = () => {
    let players = [];
    loop(Mgr.players, player => {
        players.push({
            id: player.id,
            tablePosition: player.tablePosition,
            cards: Deck.getCardIDs(player.cards)
        });
    });
    return players;
}

Player.getList = () => {
    return Mgr.players;
};

Player.get = (id) => {
    let selectedPlayer;
    let iter;
    loop(Player.getList(), (player, i) => {
        if (player.id === id) {
            selectedPlayer = player;
            iter = i;
            return;
        }
    })
    return {
        player: selectedPlayer,
        i: iter
    };
};

Player.getLength = () => {
    return Mgr.players.length;
};

module.exports = Player;
