const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
    app.get('/', controllers.home.index);

    app.get('/register', controllers.user.registerGet);
    app.post('/register', controllers.user.registerPost);
    app.post('/logout', controllers.user.logout);
    app.get('/login', controllers.user.loginGet);
    app.post('/login', controllers.user.loginPost);

    app.get('/user/find', controllers.find.findUser);

    app.get('/thread/:username', controllers.thread.chatRoom.get);
    app.post('/thread/:username', controllers.thread.chatRoom.post);

    app.get('/user/:userId/block', controllers.block.block);
    app.get('/user/:userId/unblock',controllers.block.unblock)

    app.get('/message/:msgId/like',controllers.likes.like);
    app.get('/message/:msgId/dislike',controllers.likes.dislike);
    
    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found');
        res.end();
    });
};