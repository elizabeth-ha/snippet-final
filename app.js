require( './db' );
require('dotenv').config();

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const { ExpressOIDC } = require('@okta/oidc-middleware')
const mongoose = require('mongoose');

const okta = require('./okta')
const indexRouter = require('./routes/index')
const dashboardRouter = require('./routes/dashboard')
const registrationRouter = require('./routes/register')
const resetPassword = require('./routes/reset-password')
const addSnippetRouter = require('./routes/add-snippet')
const editProfileRouter = require('./routes/edit-profile')
const aboutRouter = require('./routes/about')
const reviewRouter = require('./routes/review')
const addReviewRouter = require('./routes/add-review')

const app = express()

const oidc = new ExpressOIDC({
  issuer: `${process.env.ORG_URL}/oauth2/default`,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
  scope: 'openid profile',
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false,
}))

app.use(oidc.router)
app.use(okta.middleware)

app.use('/', indexRouter)
app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter)
app.use('/register', registrationRouter)
app.use('/reset-password', resetPassword)
app.use('/add-snippet', addSnippetRouter)
app.use('/edit-profile', editProfileRouter)
app.use('/about', aboutRouter)
app.use('/review', reviewRouter)
app.use('/add-review', addReviewRouter)
app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

module.exports = { app, oidc }
