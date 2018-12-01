const mongoose = require('mongoose');

// my schema goes here!
const postSchema = new mongoose.Schema({
  username: String,
  postTitle: String,
  postBody: String
});

const userSchema = new mongoose.Schema({
  username: String,
  bio: String
})
const reviewSchema = new mongoose.Schema({
  username: String,
  review: String
})

// "register" it so that mongoose knows about it
mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
mongoose.model('Review', reviewSchema);

mongoose.connect('mongodb://localhost/snippet-users');
