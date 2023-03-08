const Mgr = require('./Mgr');
const helpers = require('../helpers');
const loop = helpers.loop;

const Deck = (number, suit) => {
    let self = {
        id: number + '-' + suit,
        nid: number,
        sid: suit,
        number: Deck.numbers[number],
        suit: Deck.suits[suit],
        owner: 'deck'
    }

    self.getCardID = () => {
        return self.id;
    };

    Mgr.deck.push(self);
    return self;
};

Deck.create = () => {
    let deckSize = Deck.numbers.length * Deck.suits.length;
    for (let i = 0, suit = 0; i < deckSize; i++) {
        let numbersLength = Deck.numbers.length;
        let number = i % numbersLength;
        Deck(number, suit)
        if (number + 1 === numbersLength) suit++;
    }
};

Deck.shuffle = () => {
    let shuffles = 100;
    for (let i = 0; i < shuffles; i++) {
        Mgr.deck.sort(() =>  0.5 - Math.random())
    }
}

let shuffle = true;
Deck.distribute = (i) => {
    if (shuffle) {
        Deck.shuffle();
        shuffle = false;
    }

    let playerIter = i % Mgr.players.length;
    let player = Mgr.players[playerIter];
    let card = Mgr.deck[i];
    player.pushCard(card);
};

Deck.getCardIDs = (cards) => {
    let cardIDs = [];
    loop(cards, card => {
        cardIDs.push(card.id);
    });
    return cardIDs;
}

Deck.getCard = (id) => {
    let cincoDeOuros;
    loop(Deck.getList(), card => {
        if (card.id === id) {
            cincoDeOuros = card;
            return;
        }
    });
    return cincoDeOuros;
};

Deck.numbers = ['As', '2', '3', '4', '5', '6', '7', 'Sota', 'Cabalo', 'Rei'];
Deck.suits = ['Ouros', 'Copas', 'Espadas', 'Bastos'];

Deck.getList = () => {
    return Mgr.deck;
}

Deck.getLength = () => {
    return Mgr.deck.length;
}

module.exports = Deck;