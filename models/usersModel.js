const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const usersSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: {
    type: String,
    unique: true,
    validate: [validator.isEmail, 'Please provide a valide email'],
    lowercase: true,
    trim: true
  },
  photo: String,
  password: {
    type: String,
    minLength: [8, 'Password should have a least 8 characters'],
    select: false,
    required: true,
    trim: true
  },
  confirmPass: {
    type: String,
    minLength: [8, 'Password should have a least 8 characters'],
    validate: function(el) {
      return el === this.password;
    },
    message: `Passwords doesn't match`,
    required: true,
    trim: true
  },
  role: {
    type: String,
    default: 'user',
    enum: {
      values: ['admin', 'artist', 'producer', 'user'],
      message: 'Role is not valid'
    }
  },
  passwordChangedAt: Date
  // albuns: { type: mongoose.Schema.Type.ObjectId, ref: 'Album' }
});

usersSchema.pre('save', async function(next) {
  // Verifies if not exist a password then go to other middleware
  if (!this.isModified('password')) return next();

  // Hashing password
  this.password = await bcrypt.hash(this.password, 12);

  // Deleting confirm password of db
  this.confirmPass = undefined;
  next();
});

usersSchema.methods.correctPassword = async function(cp, up) {
  return await bcrypt.compare(cp, up);
};

usersSchema.methods.checkIfThePasswordHasBeenChanged = function(JWTTimestamp) {
  if (this.passwordChangedAt) {
    // Passing time as milliseconds
    const changedPasswordTime = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    // If this condition it's true it means that the password has been changed
    return JWTTimestamp < changedPasswordTime;
  }

  // If it is false it means that the password has not been changed
  return false;
};

const User = mongoose.model('User', usersSchema);

module.exports = User;
