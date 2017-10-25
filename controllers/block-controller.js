module.exports = {
  block: (req, res) => {
    let userId = req.params.userId.slice(1, req.params.userId.length)
    if (!req.user.blockedUsers) {
      req.user.blockedUsers = []
    }
    req.user.blockedUsers.push(userId)
    req.user.save().then(() => res.redirect('/'))
  },
  unblock: (req, res) => {
    let userId = req.params.userId.slice(1, req.params.userId.length)

    let index = req.user.blockedUsers.indexOf(userId);
    req.user.blockedUsers.splice(index, 1);
    req.user.save().then(() => res.redirect('/'))
  }
}