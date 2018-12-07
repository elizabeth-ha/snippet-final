const express = require('express')
const { startCase } = require('lodash')
const router = express.Router()

router.get('/', function (req, res, next) {
  if (req.user != null) {
    const { profile } = req.user
  }

  res.render('about', {title:'about snippet!'})
})

module.exports = router
