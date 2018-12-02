const express = require('express')
const { startCase } = require('lodash')
const router = express.Router()
const mongoose = require('mongoose');
const Review = mongoose.model('Review')

router.get('/', function (req, res, next) {
  if (req.user != null) {
    const { profile } = req.user
  }

  Review.find( function(err, reviews, count) {
    res.render('review', {
      title: 'Reviews of Snippet',
      user: req.user,
      reviews: reviews
    })
  })
})


module.exports = router
