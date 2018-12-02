const express = require('express')
const { startCase } = require('lodash')

const router = express.Router()
const mongoose = require('mongoose');
const Post = mongoose.model('Post')
const User = mongoose.model('User')

router.get('/', function (req, res, next) {
  const { profile } = req.user
  const descriptionList = Object.keys(profile).sort()
    .map(key => ({
      term: startCase(key),
      details: profile[key],
    }))
    .filter(({ details }) => details)

  doc = User.find({username: req.user.profile.login}).then(function(userDoc){
      return userDoc;
    }).then( userDoc => {
      console.log(userDoc)
      Post.find({username: req.user.profile.login}).then(function(posts){
      res.render('dashboard', {
        title: 'dashboard',
        descriptionList,
        user: req.user,
        user1: userDoc,
        posts: posts
      })
    })
  })
})

module.exports = router
