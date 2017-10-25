const Message = require('mongoose').model('Message');

module.exports =  {
  like: (req, res) => {
    let mesId = req.params.msgId
    Message.findById(mesId).then(foundMessage => {
      foundMessage.isLiked = true;
      foundMessage.likedUser = req.user._id
      foundMessage.save().then(() => {
        res.redirect('/thread/' + req.user.username)
      })
    })
  },
  dislike: (req, res) => {
    let mesId = req.params.msgId
    Message.findById(mesId).then(foundMessage => {
      foundMessage.isLiked = false;
      foundMessage.likedUser = null;
      foundMessage.save().then(() => {
        res.redirect('/thread/' + req.user.username)
      })

    })
  }
}