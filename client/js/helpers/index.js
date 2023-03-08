export let img = new Image();
img.src = './client/img/deck.png';
export let imgReverse = new Image();
imgReverse.src = './client/img/cardReverse.png';

export const loop = (iterator, evt) => {
    for (let i = 0; i < iterator.length; i++) {
        evt(iterator[i], i, iterator.length);
    }
}
