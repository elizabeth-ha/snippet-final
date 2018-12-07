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

// is the environment variable, NODE_ENV, set to PRODUCTION?
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/snippet-users';
}
// mongoose.connect('mongodb://localhost/snippet-users');
mongoose.connect(dbconf);
