const User = require('mongoose').model('User');
const Thread = require('mongoose').model('Thread');

module.exports = {
  findUser: (req, res) => {
    let currentUser = req.user.username;
    let otherUser = req.query.username;
    console.log(otherUser);
    if (currentUser === otherUser) {
      return res.redirect('/?error=Cannot chat with yourself!')
    }
    User.findOne({username: otherUser}).then(user => {
      if (!user) {
        return res.redirect('/?error=User does not exist')
      }

      Thread.findOne({ users: { $all: [currentUser, otherUser] } }).then(existingThread => {
          if (!existingThread) {
            Thread.create({ users: [currentUser, otherUser] }).then(thread => {
                user.otherUsers.push(req.user._id)
                req.user.otherUsers.push(user._id)
                Promise.all([user.save(), req.user.save()])
              })
          }

          res.redirect(`/thread/${user.username}`)
        })
    })

  }
}