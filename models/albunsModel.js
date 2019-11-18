const mongoose = require('mongoose');
const music = require('./musicsModel');

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      maxLength: [100, 'An album title should have less than 100 characters']
    },
    photo: String,
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    releaseDate: { type: Date, default: Date.now },
    music: [{ type: mongoose.Schema.Types.ObjectId, ref: music }]
  },
  { timestamps: true }
);

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
