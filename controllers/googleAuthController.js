const User = require('../models/User');

const redirectGoogle = (req, res) => {
  res.redirect('/profile');
};

const getProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.json(req.user);
};

const authenticateCallback = async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });

  if (!user) {
    user = await User.create({
      googleId: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value
    });
  }

  return done(null, user);
};

module.exports = {
  redirectGoogle,
  getProfile,
  authenticateCallback
};
