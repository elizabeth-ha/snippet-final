const express = require('express')
const { startCase } = require('lodash')
const router = express.Router()
const mongoose = require('mongoose');
const Post = mongoose.model('Post')

router.get('/', function (req, res, next) {
  const { profile } = req.user
  const descriptionList = Object.keys(profile).sort()
    .map(key => ({
      term: startCase(key),
      details: profile[key],
    }))
    .filter(({ details }) => details)

  res.render('add-snippet', {
    title: 'add new snippet',
    descriptionList,
    user: req.user,
  })
})

router.post('/', function(req, res) {
  const { profile } = req.user

  var newPost = new Post({
    username: req.user.profile.login,
    postTitle: req.body.postTitle,
    postBody: req.body.postBody
	})

	newPost.save(function(err, post, count){
		res.redirect('/dashboard');
	})
})

module.exports = router
