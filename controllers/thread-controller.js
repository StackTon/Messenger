const Thread = require('mongoose').model('Thread');
const Message = require('mongoose').model('Message');
const User = require('mongoose').model('User');
const { isLink, isImage } = require('../util/utils');

module.exports = {
  chatRoom: {
    get: (req, res) => {
      let currentUser = req.user.username
      let otherUser = req.params.username
      let user = req.user;

      Thread.findOne({
        users: { $all: [currentUser, otherUser] }
      }).then(currentThread => {
        if (!currentThread) {
          return res.redirect('/?error=Thread no longer exists')
        }
        let data = { currentThread } // context to send to pug view
        Message.find({ thread: currentThread._id })
          .sort({ dateCreated: 1 })
          .populate('user')
          .then(messages => {
            data.messages = messages
            let allMessages = [];
            for (let i = 0; i < data.messages.length; i++) {
              allMessages.push({
                message: data.messages[i].content,
                position: data.messages[i].user._id.equals(user._id) ? 'right' : 'left',
                isLeft:  data.messages[i].user._id.toString() !== user._id.toString(),
                id: data.messages[i]._id,
                action: messages[i].isLiked ? 'dislike' : 'like'
              })
            }
            for (let msg of allMessages) {
              if (isLink(msg.message)) {
                msg.isLink = true
              }
              if (isImage(msg.message)) {
                msg.isImage = true
              }
            }
            User.findOne({ username: otherUser }).then(secondUser => {
              if (!secondUser) {
                return res.redirect('/?error=User no longer exists')
              }
              if (!secondUser.blockedUsers) {
                secondUser.blockedUsers = []
                secondUser.save()
              } else {
                if (secondUser.blockedUsers.indexOf(req.user._id) !== -1) {
                  allMessages.blocked = true
                }
              }
              res.render('thread/chat-room', { messages: allMessages, otherUser, msg:messages})
            })           
          })
      })
    },
    post: (req, res) => {
      let currentUser = req.user.username
      let otherUser = req.params.username
      Thread.findOne({ users: { $all: [currentUser, otherUser] } }).then(currentThread => {

        let messageData = {
          thread: currentThread._id,
          user: req.user._id,
          content: req.body.content
        }
        Message.create(messageData).then(m => {
          res.redirect(`/thread/${otherUser}`)
        }).catch(err => {
          res.redirect(
            `/thread/${otherUser}?error=${err.errors.content.message}`
          )
        })
      })
    }
  }

}