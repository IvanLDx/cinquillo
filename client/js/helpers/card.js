import {cv, ctx} from './mgr.js';
import * as helper from './index.js';

const Card = (card) => {
    let self = card;
    self.imgSource = [
        self.nid * Card.sw,
        self.sid * Card.sh,
        Card.sw,
        Card.sh
    ];

    self.setPosition = (i, player) => {
        let boardCenterX = (cv.width / 2);
        let boardCenterY = (cv.height / 2);
        let deckWidth = player.cards.length;
        switch (player.tablePosition) {
            case 0: setPos0(); break;
            case 1: setPos1(); break;
            case 2: setPos2(); break;
            case 3: setPos3(); break;
        }
        card.right = card.left + Card.dw;
        card.bottom = card.top + Card.dh;
        card.destination = [
            card.left,
            card.top,
            Card.dw,
            Card.dh
        ];

        function setPos0 () {
            deckWidth = deckWidth * (Card.dw / 0.83);
            card.left = (boardCenterX - (deckWidth / 2)) + i * Card.dw + (10 * i) + 10;
            card.top = cv.height - Card.dh * 1.2;
        }

        function setPos1 () {
            deckWidth = deckWidth * (Card.dw / 1.2);
            card.left = cv.width - Card.dh * 0.8;
            card.top = (boardCenterY - (deckWidth / 2)) + i * Card.dh - (i * Card.dw / 2);
        }

        function setPos2 () {
            deckWidth = deckWidth * (Card.dw / 1.3);
            card.left = (boardCenterX - (deckWidth / 2)) + i * Card.dw - (i * Card.dw / 4.6);
            card.top = 10;
        }

        function setPos3 () {
            deckWidth = deckWidth * (Card.dw / 1.2);
            card.left = 36;
            card.top = (boardCenterY - (deckWidth / 2)) + i * Card.dh - (i * Card.dw / 2);
        }
    };

    self.draw = (player) => {
        if (player.tablePosition === 1) {
            ctx.save();
            ctx.translate(card.left - (Card.dw / 2), card.top + Card.dh);
            ctx.rotate(Math.PI / 180 * -90);
            card.destination = [
                0, 0, Card.dw, Card.dh
            ];
        } else if (player.tablePosition === 3) {
            ctx.save();
            ctx.translate(card.left + 34, card.top + 10);
            ctx.rotate(Math.PI / 180 * 90);
            card.destination = [
                0, 0, Card.dw, Card.dh
            ];
        }
        if (player.tablePosition === 0) {
            ctx.drawImage(helper.img, ...card.imgSource, ...card.destination);
        } else {
            ctx.drawImage(helper.imgReverse, ...card.destination);
        }
        ctx.restore();
    };

    Card.list.push(card);
    return self;
};

Card.sw = 144;
Card.sh = 184;
Card.dh = 60;
Card.dw = Card.dh * Card.sw / Card.sh;

Card.list = [];

Card.get = id => {
    for (let i = 0; i < Card.list.length; i++) {
        if (Card.list[i].id === id) {
            return Card.list[i];
        }
    }
};

Card.create = (card) => Card(card);

export { Card };