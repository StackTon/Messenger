const mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
  content: { type: mongoose.Schema.Types.String, required: true, maxlength: 1000 },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  thread: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Thread' },
  dateCreated: { type: mongoose.Schema.Types.Date, default: Date.now() },
  isLiked: {type: mongoose.Schema.Types.Boolean},
  likedUser: {type: mongoose.Schema.Types.ObjectId}
});

module.exports = mongoose.model('Message', messageSchema);