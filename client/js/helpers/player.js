import * as helper from './index.js';
import {Deck} from './deck.js';

const loop = helper.loop;

const Player = (pack) => {
    let self = pack;

    self.intersects = (mouse, card) => {
        return (
            mouse.x > card.left && mouse.x < card.right
            && mouse.y > card.top && mouse.y < card.bottom
        );
    };

    Player.list.push(self);
    return self;
}

Player.list = [];

Player.update = (data) => {
    Player.list = [];
    loop(data.players, player => {
        if (player) {
            Player.create(player);
        }
    });
};

Player.create = player => Player(player);

Player.get = id => {
    for (let i = 0; i < Player.list.length; i++) {
        if (Player.list[i].id === id) {
            return Player.list[i];
        }
    }
};

Player.paintCards = () => {
    loop(Player.list, player => {
        Deck.paintCardsInHand(player);
    });
}

export { Player };