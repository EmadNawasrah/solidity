const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user
      User.findOne(email, user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // Match password
        User.comparePassword(password, user.password)
          .then(isMatch => {
            if (isMatch) {
              console.log(user)
              return done(null, user);
            } else {
              return done(null, false, { message: 'Password incorrect' });
            }
          })
          .catch(err => console.error(err));
      });
    })
  );

  passport.serializeUser(function(user, done) {
    try {
      

    console.log(user.id)
    done(null, user.id);
        } catch (error) {
     console.log(error) 
    }
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};  
