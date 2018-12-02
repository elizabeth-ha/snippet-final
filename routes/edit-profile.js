const express = require('express')
const { startCase } = require('lodash')
const router = express.Router()
const mongoose = require('mongoose');
const User = mongoose.model('User')

router.get('/', function (req, res, next) {
  const { profile } = req.user
  const descriptionList = Object.keys(profile).sort()
    .map(key => ({
      term: startCase(key),
      details: profile[key],
    }))
    .filter(({ details }) => details)

  res.render('edit-profile', {
    title: 'edit profile',
    user: req.user,
  })
})

router.post('/', function(req, res) {
  const { profile } = req.user
  User.find({ username:req.user.profile.login }).remove( );

  var newUser = new User({
    username: req.user.profile.login,
    bio: req.body.bio
	})

	newUser.save(function(err, user, count){
		res.redirect('/dashboard');
	})
})

module.exports = router
