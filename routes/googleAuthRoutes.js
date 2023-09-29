const express = require('express');
const passport = require('passport');
const googleAuthController = require('../controllers/googleAuthController');

const router = express.Router();

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleAuthController.redirectGoogle
);

router.get('/profile', googleAuthController.getProfile);

module.exports = router;
