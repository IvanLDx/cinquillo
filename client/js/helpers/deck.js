import * as helper from './index.js';
import {Card} from './Card.js';
const loop = helper.loop;

const Deck = (pack) => {
    let self = pack;
    loop(pack, card => {
        Card.create(card);
    });

    Deck.cards = Card.list;
    return self;
}

Deck.paintCardsInHand = (player) => {
    loop(player.cards, (cardID, i) => {
        let card = Card.get(cardID);
        card.setPosition(i, player);
        card.draw(player);
    });
}

Deck.update = (data) => {
    Deck.list = [];
    loop(data.deck, card => {
        Card.create(card);
    });
};

Deck.create = deck => Deck(deck);

export { Deck };