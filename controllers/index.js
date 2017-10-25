const home = require('./home-controller');
const user = require('./user-controller');
const find = require('./find-controller');
const thread = require('./thread-controller');
const block = require('./block-controller');
const likes = require('./likes-controller');

module.exports = {
    home,
    user,
    find,
    thread,
    block,
    likes
};