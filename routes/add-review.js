const express = require('express')
const { startCase } = require('lodash')
const router = express.Router()
const mongoose = require('mongoose');
const Review = mongoose.model('Review')

router.get('/', function (req, res, next) {
  const { profile } = req.user

  res.render('add-review', {
    title: 'add new review',
    user: req.user,
  })
})

router.post('/', function(req, res) {
  const { profile } = req.user

  var newReview = new Review({
    username: req.user.profile.login,
    review: req.body.review
	})

	newReview.save(function(err, review, count){
		res.redirect('/review');
	})
})

module.exports = router
