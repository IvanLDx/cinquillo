const Mgr = {
    players: [],
    deck: []
};

Mgr.Entity = (id) => {
    var self = {};
    self.id = id;
    self.cards = [];

    self.pushCard = (card) => {
        card.owner = self.id;
        self.cards.push(card);
    };

    Mgr.players.push(self)
    return self;
};

module.exports = Mgr;
