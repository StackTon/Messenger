const User = require('mongoose').model('User');

module.exports = {
    index: (req, res) => {
        let currentUser = req.user;
        if (currentUser !== undefined) {
            User.findById(currentUser.id).populate('otherUsers').populate('blockedUsers').then(otherUsers => {
                for(let blockedUser of otherUsers.blockedUsers){
                    for (let i = 0; i < otherUsers.otherUsers.length; i++) {
                        if(otherUsers.otherUsers[i].username === blockedUser.username){
                            otherUsers.otherUsers[i].isBlocked = true;
                        } 
                    }
                }
                res.render('home/index', {otherUsers: otherUsers.otherUsers});
            })
        }
        else {
            res.render('home/index');
        }
    }
};