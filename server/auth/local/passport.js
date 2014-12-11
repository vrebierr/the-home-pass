var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

exports.setup = function (User, config) {
    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, function(email, password, done) {
        User.findOne({
            email: email.toLowerCase()
        }, function(err, user) {
            if (err) return done(err);

            if (!user) {
                return done(null, false, {message: 'Cette adresse mail n\'est pas inscrite.', type: 'email'});
            }
            if (!user.authenticate(password)) {
                return done(null, false, {message: 'Ce mot de passe n\'est pas correct', type: 'password'});
            }
            return done(null, user);
        });
    }));
};
