const helpers = {};

helpers.loop = (array, evt) => {
    for (let i = 0; i < array.length; i++) {
        evt(array[i], i, array.length);
    }
};

helpers.getPack = (Player, Deck) => {
    return {
        players: Player.send(),
        deck: Deck.getList()
    };
};

module.exports = helpers;