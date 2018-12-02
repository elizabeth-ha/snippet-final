const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const Post = mongoose.model('Post')
/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user != null) {
    const { profile } = req.user
  }

  Post.find( function(err, posts, count) {
    res.render('index', {
      title: 'Welcome to snippet',
      user: req.user,
      posts: posts
    })
  })
})

module.exports = router
