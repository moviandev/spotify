const mongoose = require('mongoose');

const musicsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [40, 'Music title must have just 40 characters']
    },
    albumName: String,
    albumID: {
      type: String,
      ref: 'Album'
    }
  },
  { timestamps: true }
);

const Music = mongoose.model('Music', musicsSchema);

module.exports = Music;
